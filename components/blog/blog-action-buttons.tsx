import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PenIcon, Trash2Icon } from "lucide-react";

export function BlogActionButtons({ blogId }: { blogId: string }) {
  return (
    <div className="flex gap-2 items-center">
      <p className="sr-only">Edit this blog</p>
      <Button asChild variant={"outline"} size={"icon-sm"}>
        <Link href={`/blogs/${blogId}/edit`}>
          <PenIcon />
        </Link>
      </Button>
      <p className="sr-only">Delete this blog</p>
      <Button variant={"destructive"} size="icon-sm">
        <Trash2Icon />
      </Button>
    </div>
  );
}
