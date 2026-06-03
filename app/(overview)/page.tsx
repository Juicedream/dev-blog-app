import { Metadata } from "next";
import HomePage, { BlogsWithLikes } from "@/components/home/home-page";
import {
  allPublishedBlogs,
  fetchLikesForBlog,
  fetchUserInitialLike,
} from "@/lib/data";
import { Blog, User } from "@/lib/definitions";
import { getUser } from "@/app/lib/dal";

export const metadata: Metadata = {
  title: "Home",
};

export default async function Page() {
  const blogs: Blog[] = (await allPublishedBlogs()) ?? [];
  const user = await getUser();
  const blogsWithLikes = await Promise.all(
    blogs.map(async (blog) => ({
      blog,
      likesResult: await fetchLikesForBlog(blog.id),
      userLike:
        (blog && user && (await fetchUserInitialLike(blog.id, user?.id))) ?? [],
    })),
  );

  return (
    <HomePage
      blogsWithLikes={blogsWithLikes as unknown as BlogsWithLikes[]}
      user={user as User}
    />
  );
}
