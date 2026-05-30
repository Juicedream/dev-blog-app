import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { LikeButton } from "@/components/like-button";

import { Blog } from "@/lib/definitions";

type BlogCardProps = {
  blog: Blog;
  children: React.ReactNode;
  showLikeButton?: boolean;
  showStatus?: boolean;
};
export default function BlogCard({
  blog,
  showLikeButton = true,
  children,
  showStatus = false,
}: BlogCardProps) {
  const blogDescription =
    blog.content.length > 60 ? blog.content.slice(0, 60) + "..." : blog.content;
  const blogTitle =
    blog.title.length > 40 ? blog.title.slice(0, 40) + "..." : blog.title;
  return (
    <main className="w-full rounded-xl h-23">
      <div className="flex items-center justify-between px-2 py-2 hover:bg-slate-100/50 rounded-xl border-2 border-slate-100">
        {/* image and header with description */}
        <div className="flex gap-3">
          <Image
            src={blog.image_url}
            width={100}
            height={100}
            className="rounded-lg"
            alt={`${blog.title} image`}
          />
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold">{blogTitle}</h3>
            <span className="font-medium text-muted-foreground text-sm">
              {blogDescription}
            </span>
            {showLikeButton && <LikeButton likes={1.5} />}
            {showStatus &&
              (blog.status === "draft" ? (
                <Badge className="bg-blue-400">Draft</Badge>
              ) : (
                <Badge className="bg-green-400">Published</Badge>
              ))}
          </div>
        </div>
        {/* View */}
        <div className="flex flex-col justify-around items-start gap-4">
          {children}
        </div>
      </div>
    </main>
  );
}

// "#ff4757"
