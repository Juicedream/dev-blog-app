/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import BlogCard from "@/components/home/blog-card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "@/lib/definitions";
import { BlogsWithLikes } from "@/components/home/home-page";
import { useMemo } from "react";

export default function BlogsList({
  query,
  blogsWithLikes,
  user,
}: {
  query: string;
  blogsWithLikes: BlogsWithLikes[];
  user: User;
}) {
  const showBlogs = useMemo(() => {
    return fetchBlogsByQuery(query);
  }, [query]);
  if (blogsWithLikes.length < 1) {
    return (
      <div className="flex items-center justify-center my-4">
        <p className="text-muted-foreground text-xl">No Blogs Found</p>
      </div>
    );
  }
  function fetchBlogsByQuery(query: string) {
    if (!query) return blogsWithLikes;
    const data = blogsWithLikes.filter((item) =>
      item.blog.title.toLowerCase().includes(query.toLowerCase().trim()),
    );
    return data;
  }

  return (
    <div className="w-full flex flex-col gap-10 py-2 px-3 h-200 scroll-smooth overflow-auto overflow-y-scroll scrollbar-none scrollbar-thumb-blue-300 scrollbar-track-blue-500">
      {showBlogs.map(({ blog, userLike, likesResult }) => {
        return (
          <div key={blog.id}>
            <BlogCard
              blog={blog}
              likesResult={likesResult}
              userLike={userLike as unknown as string[]}
              user={user}
            >
              <Button asChild size="sm" className="mb-2" variant={"link"}>
                <Link href={`/blogs/${blog.id}`}>View</Link>
              </Button>
            </BlogCard>
          </div>
        );
      })}
      {showBlogs.length < 1 && (
        <p className="text-sm text-muted-foreground text-center">
          No blog found with term: {query}
        </p>
      )}
    </div>
  );
}
