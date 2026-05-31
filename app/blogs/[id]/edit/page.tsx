import { getUser } from "@/app/lib/dal";
import { EditBlogForm } from "@/components/blog/edit-blog-form";
import {
  fetchBlogById,
  fetchLikesForBlog,
  fetchUserInitialLike,
} from "@/lib/data";
import { User } from "@/lib/definitions";
import { marked } from "marked";
export const metadata = {
  title: "Edit Blog",
};

export default async function EditBlogPage(
  props: Promise<{
    params: {
      id: string;
    };
  }>,
) {
  const paramsProps = await props;
  const { id } = await paramsProps?.params;
  const blog = await fetchBlogById(id);
  const user = (await getUser()) as User;
  const content = await marked(blog.content);
  const likesResult = await fetchLikesForBlog(blog.id);
  const userLike = await fetchUserInitialLike(blog.id, user?.id);

  if (!blog) {
    return (
      <div className="flex flex-col items-center w-full justify-center min-h-dvh">
        <p className="text-muted-foreground mt-3 text-xl">
          No Blog Found with id: {id}
        </p>
      </div>
    );
  }

  return (
    <EditBlogForm
      blog={blog}
      user={user}
      likesResult={likesResult}
      content={content}
      userLike={userLike}
    />
  );
}
