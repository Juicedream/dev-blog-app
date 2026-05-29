import { Blog } from "@/lib/definitions";
import { fetchBlogById } from "@/lib/data";
import BlogCardView from "./blog-card-view";

export default async function BlogView({ blogId }: { blogId: string }) {
  const blog: Blog = await fetchBlogById(blogId);

  return <BlogCardView allowActions={true} blog={blog} preview={false} />;
}
