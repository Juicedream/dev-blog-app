"use client";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenIcon, Trash2Icon } from "lucide-react";
import { useActionState } from "react";
import { deleteBlogByIdAction } from "@/lib/action";

export function BlogActionButtons({ blogId }: { blogId: string }) {
  const deleteBlogByID = deleteBlogByIdAction.bind(null, blogId);
  const init: { errors: object; message: string | null } = {
    errors: {},
    message: null,
  };
  const [state, formAction, pending] = useActionState(deleteBlogByID, init);
  return (
    <div className="flex gap-2 items-center">
      <p className="sr-only">Edit this blog</p>
      <Button asChild variant={"outline"} size={"icon-sm"}>
        <Link href={`/blogs/${blogId}/edit`}>
          <PenIcon />
        </Link>
      </Button>
      <form action={formAction}>
        <p className="sr-only">Delete this blog</p>
        <Button disabled={pending} variant={"destructive"} size="icon-sm">
          <Trash2Icon />
        </Button>
      </form>
    </div>
  );
}
