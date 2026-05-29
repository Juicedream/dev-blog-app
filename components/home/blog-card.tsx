import Image from "next/image";
import Link from "next/link";
// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LikeButton } from "@/components/like-button";

import { Blog } from "@/lib/definitions";

type BlogCardProps = {
  blog: Blog;
};
export default function BlogCard({ blog }: BlogCardProps) {
  const blogDescription =
    blog.content.length > 60 ? blog.content.slice(0, 60) + "..." : blog.content;
  const blogTitle =
    blog.title.length > 40 ? blog.title.slice(0, 40) + "..." : blog.title;
  return (
    <main className="w-full rounded-xl h-23">
      <div className="flex items-center justify-between px-4 py-2">
        {/* image and header with description */}
        <div className="flex gap-3">
          <Image
            src={blog.image_url}
            width={100}
            height={100}
            className="rounded-lg"
            alt={`${blog.title} image`}
          />
          <div className="gap-2">
            <h3 className="font-semibold">{blogTitle}</h3>
            <span className="font-medium text-muted-foreground text-sm">
              {blogDescription}
            </span>
            <LikeButton likes={1.5} />
          </div>
        </div>
        {/* View */}
        <div className="flex flex-col justify-around items-start gap-4">
          <Button asChild size="sm" className="mb-2" variant={"link"}>
            <Link href={`/blogs/${blog.id}`}>View</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}

// "#ff4757"
