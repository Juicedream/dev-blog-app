import { CreateBlogForm } from "@/components/blog/create-blog-form";
import { getUser } from "@/app/lib/dal";

export const metadata = {
  title: "Create Blog",
};

export default async function CreateBlog() {
  const user = (await getUser()) ?? null;

  return <CreateBlogForm userId={user?.id ?? null} />;
}
