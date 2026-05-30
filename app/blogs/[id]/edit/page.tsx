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
  const blog = (await fetchBlogById(id)) ?? {};

  if (!blog) {
    return (
      <div className="flex flex-col items-center w-full justify-center min-h-dvh">
        <p className="text-muted-foreground mt-3 text-xl">
          No Blog Found with id: {id}
        </p>
      </div>
    );
  }

  return <EditBlogForm blog={blog} />;
}
