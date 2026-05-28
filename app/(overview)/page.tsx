import { Metadata } from "next";
import Header from "@/components/home/header";
import BlogsList from "@/components/home/blogs-list";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="rounded-2xl h-full shadow-lg shadow-black/20 mb-4">
      <Header title={"New Blog Idea?"} />
      <BlogsList />
    </div>
  );
}
