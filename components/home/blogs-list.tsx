import { allPublishedBlogs } from "@/lib/data";
import BlogCard from "@/components/home/blog-card";
import { SelectSeparator } from "../ui/select";

export default async function BlogsList() {
  const blogs = await allPublishedBlogs();
  if (blogs.length < 1) {
    return (
      <div className="flex items-center justify-center mt-4">
        <p className="text-muted-foreground text-xl">No Blogs Found</p>
      </div>
    );
  }
  return (
    <div className="w-full flex flex-col gap-4 py-2 px-3 h-200 scroll-smooth overflow-auto overflow-y-scroll scrollbar-none scrollbar-thumb-blue-300 scrollbar-track-blue-500">
      {blogs.map((blog) => (
        <div key={blog.id}>
          <BlogCard blog={blog} />
          <SelectSeparator />
        </div>
      ))}
    </div>
  );
}
