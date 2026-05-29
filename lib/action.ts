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

const CreateBlog = BlogSchema.omit({
  id: true,
  created_at: true,
  updated_at: true,
});

const UpdateBlog = BlogSchema.omit({
  created_at: true,
  updated_at: true,
});
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
