import { Blog, User } from "@/lib/definitions";
import {
  fetchBlogById,
  fetchLikesForBlog,
  fetchUserInitialLike,
} from "@/lib/data";
import BlogCardView from "./blog-card-view";
import { getUser } from "@/app/lib/dal";
import { marked } from "marked";

export default async function BlogView({
  blogId,
  userId,
}: {
  blogId: string;
  userId: string;
}) {
  const blog: Blog = await fetchBlogById(blogId);
  const user = (await getUser()) as User;
  const content = await marked(blog.content);
  const likesResult = await fetchLikesForBlog(blog.id);
  const userLike =
    (blog && user && (await fetchUserInitialLike(blog.id, user?.id))) || [];
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
    <BlogCardView
      allowActions={allowActions}
      blog={blog}
      preview={false}
      user={user}
      likesResult={likesResult}
      content={content}
      userLike={userLike}
    />
  );
}
