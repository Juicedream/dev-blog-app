import { getUser } from "@/app/lib/dal";
import BlogView from "@/components/blog/view-blog";

export const metadata = {
  title: "View Blog",
};

export default async function ViewBlog(
  props: Promise<{
    params: {
      id: string;
    };
  }>,
) {
  const paramsProps = await props;
  const { id } = await paramsProps?.params;
  const user = await getUser();

  return <BlogView blogId={id} userId={user?.id} />;
}
