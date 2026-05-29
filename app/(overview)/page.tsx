import { Metadata } from "next";
import Header from "@/components/home/header";
import BlogsList from "@/components/home/blogs-list";

export const metadata: Metadata = {
  title: "Home",
};

export default function Home() {
  return (
    <div className="rounded-t-2xl rounded-b-sm flex flex-col gap-2 shadow-lg shadow-black/20 mb-8 border pb-1">
      <Header title={"All Blogs"} />
      <BlogsList />
    </div>
  );
}
