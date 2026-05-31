import Link from "next/link";
import { PlusIcon } from "lucide-react";
import { BlogActionButtons } from "@/components/blog/blog-action-buttons";
import BlogCard from "@/components/home/blog-card";
import { Button } from "@/components/ui/button";
import { fetchUserBlogs } from "@/lib/data";
import { getUser } from "@/app/lib/dal";

export default async function MyAdminBlogs() {
  const user = await getUser();
  const blogs = (await fetchUserBlogs(user?.id)) ?? [];
  if (blogs.length < 1) {
    return (
      <div className="flex flex-col items-center justify-center my-4 w-full">
        <p className="text-muted-foreground text-xl">No Blogs Found</p>
        <Button asChild variant={"secondary"}>
          <Link href={"/blogs/create"} className="flex gap-2 items-center">
            <PlusIcon />
            Create Blog
          </Link>
        </Button>
      </div>
    );
  }

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
