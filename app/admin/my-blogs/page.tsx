import { BlogActionButtons } from "@/components/blog/blog-action-buttons";
import BlogCard from "@/components/home/blog-card";
import { fetchUserBlogs } from "@/lib/data";

export default async function MyBlogs() {
  const blogs = await fetchUserBlogs("87a68ae1-71a7-4f73-be99-3bddb73d7267");

  return (
    <div className="flex flex-col items-center w-full justify-center gap-5">
      <p className="mr-auto text-xl font-bold">My Blogs</p>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-4 w-full">
        {blogs.map((blog) => {
          return (
            <BlogCard
              blog={blog}
              key={blog.id}
              showLikeButton={false}
              showStatus={true}
            >
              <BlogActionButtons blogId={blog.id} />
            </BlogCard>
          );
        })}
      </div>
    </div>
  );
}
