import { Blog } from "@/lib/definitions";
import { fetchBlogById } from "@/lib/data";
import BlogCardView from "./blog-card-view";

export default async function BlogView({
  blogId,
  userId,
}: {
  blogId: string;
  userId: string;
}) {
  const blog: Blog = (await fetchBlogById(blogId)) ?? {};
  if (!blog) {
    return (
      <div className="flex flex-col items-center w-full justify-center min-h-dvh">
        <p className="text-muted-foreground mt-3 text-xl">
          No Blog for this id: {blogId}
        </p>
      </div>
    );
  }
  const allowActions = blog.user_id === userId;

  return (
    <BlogCardView allowActions={allowActions} blog={blog} preview={false} />
  );
}
