"use client";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { Blog } from "@/lib/definitions";
import { useState } from "react";

type BlogCardProps = {
  blog: Blog;
};
export default function BlogCard({ blog }: BlogCardProps) {
  const [isLiked, setIsLiked] = useState(false);
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
            <div className="flex gap-1 items-center mt-2">
              <svg
                onClick={() => setIsLiked((prev) => !prev)}
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill={isLiked ? "#ff4757" : "#fff"}
                stroke="#ff4757"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"></path>
              </svg>
              <p className="text-sm text-yellow-500">1.5k</p>
            </div>
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
