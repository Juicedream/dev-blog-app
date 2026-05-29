import { EditBlogForm } from "@/components/blog/edit-blog-form";
import { fetchBlogById } from "@/lib/data";
export const metadata = {
  title: "Edit Blog",
};

export default async function EditBlogPage(
  props: Promise<{
    params: {
      id: string;
    };
  }>,
) {
  const paramsProps = await props;
  const { id } = await paramsProps?.params;
  const blog = await fetchBlogById(id);

  return <EditBlogForm blog={blog} />;
}
