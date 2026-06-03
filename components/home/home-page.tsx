"use client";
import Header from "@/components/home/header";
import BlogsList from "@/components/home/blogs-list";
import { useState } from "react";
import { Blog, User } from "@/lib/definitions";

export type BlogsWithLikes = {
  blog: Blog;
  likesResult: number;
  userLike: string[];
};

export default function HomePage({
  blogsWithLikes,
  user,
}: {
  blogsWithLikes: BlogsWithLikes[];
  user: User;
}) {
  const [query, setQuery] = useState("");
  return (
    <div className="rounded-t-2xl rounded-b-sm flex flex-col gap-2 shadow-lg shadow-black/20 mb-8 border pb-1">
      <Header query={query} setQuery={setQuery} title={"All Blogs"} />
      <BlogsList blogsWithLikes={blogsWithLikes} query={query} user={user} />
    </div>
  );
}
