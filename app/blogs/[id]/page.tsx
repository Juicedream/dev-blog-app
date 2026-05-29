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

  return <BlogView blogId={id} />;
}
