/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";
import postgres from "postgres";
import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const BlogSchema = z.object({
  id: z.string(),
  user_id: z.string({
    message: "User Id is required",
  }),
  title: z.string().min(6, { message: "Blog Title is required" }),
  content: z.string().min(6, { message: "Blog Content is required" }),
  image_url: z.string().min(6, { message: "Blog Image Url is required" }),
  status: z.enum(["draft", "published"], {
    message: "Blog Status must be draft or published",
  }),
  created_at: z.date(),
  updated_at: z.date(),
});

const UserSchema = z.object({
  id: z.string(),
  avatar: z.string().min(12, { error: "Avatar Image is required" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" })
    .regex(/[a-zA-Z]/, { error: "Password must contain at least one letter." })
    .regex(/[0-9]/, { error: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Password must contain at least one special character.",
    })
    .trim(),
  role: z.enum(["admin", "user"]),
});

const CreateBlog = BlogSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

const UpdateBlog = BlogSchema.omit({
  created_at: true,
  updated_at: true,
});

const UpdateAvatarImage = UserSchema.omit({ id: true, password: true });

export type BlogState = {
  errors?: {
    user_id?: string[];
    title?: string[];
    content?: string[];
    status?: string[];
    image_url?: string[];
  };
  message?: string | null;
};

export async function createBlogAction(
  id: string,
  prevState: BlogState | undefined,
  formData: FormData,
) {
  const validatedFields = CreateBlog.safeParse({
    user_id: id,
    title: formData.get("title"),
    status: formData.get("status"),
    content: formData.get("content"),
    image_url: formData.get("image_url"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Unable to create blog",
    };
  }

  const { user_id, title, status, content, image_url } = validatedFields.data;
  if (!user_id) {
    return { message: "Invalid user id" };
  }

  try {
    await sql`
      INSERT INTO blogs (user_id, title, status, content, image_url)
      VALUES (${user_id}, ${title}, ${status}, ${content}, ${image_url}) ;
    `;
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to Create Blog" };
  }

  revalidatePath("/");
  redirect("/");
}

export async function updateBlogAction(
  { userId, blogId }: { userId: string; blogId: string },
  prevState: BlogState | undefined,
  formData: FormData,
) {
  const validatedFields = UpdateBlog.safeParse({
    id: blogId,
    user_id: userId,
    title: formData.get("title"),
    status: formData.get("status"),
    content: formData.get("content"),
    image_url: formData.get("image_url"),
  });
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Unable to update blog",
    };
  }

  const { user_id, title, status, content, image_url, id } =
    validatedFields.data;

  try {
    await sql`
      UPDATE blogs
      SET user_id = ${user_id}, title = ${title}, status = ${status}, content = ${content}, image_url = ${image_url}, updated_at = NOW()
      WHERE id = ${id}
    `;
  } catch (error) {
    console.error(error);
    return { message: "Database Error: Failed to Update Blog" };
  }

  revalidatePath("/");
  redirect("/");
}

export async function deleteBlogByIdAction(
  blogId: string,
  prevState: { message: string | null; errors: object } | undefined,
  _: FormData,
) {
  if (!blogId) return;
  try {
    await sql`
      DELETE FROM blogs
      WHERE id = ${blogId}
    `;
  } catch (error) {
    console.error("Database Error. Unable to delete blog ", error);
    return { message: "Database Error: Failed to delete blog", errors: {} };
  }
  revalidatePath("/");
  redirect("/");
}

export async function toggleLikeAction(
  { blogId, userId }: { blogId: string; userId: string },
  prevState: { liked: boolean; likes: number },
  _formData: FormData,
) {
  try {
    const existing = await sql`
      SELECT id FROM likes
      WHERE blog_id = ${blogId} AND user_id = ${userId}
    `;
    if (existing.length > 0) {
      // Unlike the blog
      await sql`
      DELETE FROM likes
      WHERE blog_id = ${blogId} AND user_id = ${userId}
      `;
    } else {
      // like the blog
      await sql`
      INSERT INTO likes (blog_id, user_id)
      VALUES (${blogId}, ${userId})
      `;
    }
    const result = await sql`
      SELECT COUNT(*) as count FROM likes WHERE blog_id = ${blogId}
    `;
    revalidatePath("/");
    return {
      liked: existing.length === 0,
      likes: Number(result[0].count),
    };
  } catch (error) {
    console.error("Error toggling like: ", error);
    return prevState;
  }
}
export async function toggleFollowAction(
  { userId, followUserId }: { userId: string; followUserId: string },
  prevState: { following: boolean },
  _formData: FormData,
) {
  try {
    const alreadyFollowing = await sql`
      SELECT id FROM follows 
      WHERE follower_id = ${followUserId} AND following_id = ${userId}
    `;
    console.log({ alreadyFollowing });

    let status: boolean;
    if (alreadyFollowing.length > 0) {
      // unfollow
      await sql`
        DELETE FROM follows
        WHERE follower_id = ${followUserId} AND following_id = ${userId}
      `;
      status = false;
    } else {
      // Follow
      await sql`
      INSERT INTO follows (follower_id, following_id)
      VALUES (${followUserId}, ${userId})
      `;
      status = true;
    }

    revalidatePath("/");
    return { following: status };
  } catch (error) {
    console.error("Error following user: ", error);
    return prevState;
  }
}

export async function updateProfilePicAction(
  userId: string,
  prevState: { error: object; message: string | null } | undefined,
  formData: FormData,
) {
  if (!userId) return { error: {}, message: "No user id is provided" };
  const validatedFields = UpdateAvatarImage.safeParse({
    avatar: formData.get("avatar"),
    role: formData.get("role"),
  });
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      message: "Unable to update profile image",
    };
  }
  const { avatar, role } = validatedFields.data;
  if (!avatar.startsWith("https://images.unsplash.com/photo"))
    return {
      error: {},
      message:
        "Error: Invalid Image Url provied, Supports only images.unsplash.com/photo",
    };

  try {
    await sql`
      UPDATE users
      SET avatar = ${avatar}
      WHERE id = ${userId}
      `;
  } catch (error) {
    console.error("Unable to update the image in the db: ", error);
    return {
      error: {},
      message: "Database Failed to Update image url, try again",
    };
  }

  const path = `/${role}/profile`;

  revalidatePath(path);
  revalidatePath("/");
}

export async function removeProfileAction(
  userId: string,
  prevState: { error: object; message: string | null } | undefined,
  formData: FormData,
) {
  if (!userId) return { error: {}, message: "No user id is provided" };
  const validatedFields = UpdateAvatarImage.safeParse({
    avatar: formData.get("avatar"),
    role: formData.get("role"),
  });
  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
      message: "Unable to remove profile image",
    };
  }
  const { role } = validatedFields.data;

  try {
    await sql`
      UPDATE users
      SET avatar = null
      WHERE id = ${userId}
      `;
  } catch (error) {
    console.error("Unable to remove the image from the db: ", error);
    return {
      error: {},
      message: "Database Failed to remove image url, try again",
    };
  }

  const path = `/${role}/profile`;

  revalidatePath(path);
  revalidatePath("/");
}
