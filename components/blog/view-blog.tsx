import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { fetchBlogById } from "@/lib/data";
import { Blog } from "@/lib/definitions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LikeButton } from "@/components/like-button";

export default async function BlogView({ blogId }: { blogId: string }) {
  const blog: Blog = await fetchBlogById(blogId);
  const created_at = new Date(blog.created_at).toDateString();
  const updated_at = new Date(blog.updated_at).toDateString();
  return (
    <main className="flex justify-center items-center w-full">
      <div className="px-4 py-2 flex flex-col md:flex-row w-full border shadow-sm shadow-black/20 gap-8 mb-4 rounded-2xl">
        <div className="flex justify-center">
          <Image
            src={blog.image_url}
            width={700}
            height={700}
            className="rounded-2xl"
            alt={`${blog.title} image`}
          />
        </div>
        <div className="flex-1 flex flex-col justify-between gap-4 py-2">
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <Button size={"lg"} variant={"outline"} asChild className="mb-2">
                <Link href={"/"}>
                  <ArrowLeft size={20} className="text-red-300" />
                  Back
                </Link>
              </Button>
              <LikeButton likes={1.5} />
            </div>
            <h1 className="text-2xl font-bold">{blog.title}</h1>
            <p className="italic text-xs text-accent-foreground">
              {created_at}
            </p>
          </div>
          <div className="overflow-y-auto scroll-smooth scrollbar-none h-74 border border-blue-500/20 rounded-md px-2 py-2 shadow-xs shadow-black/10">
            <p className="text-sm font-semibold text-wrap">{blog.content}</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="italic text-xs text-accent-foreground">
              {updated_at}
            </p>
            <div className="flex gap-2 items-center">
              <p className="text-sm font-semibold">Created By:</p>
              <Badge variant={"default"}>{blog.author_name}</Badge>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
