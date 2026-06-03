/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  AlertTriangleIcon,
  LoaderCircle,
  PenIcon,
  Trash2Icon,
} from "lucide-react";
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
      <Dialog>
        <DialogTrigger asChild>
          <Button disabled={pending} variant={"destructive"} size="icon-sm">
            <p className="sr-only">Delete this blog</p>
            <Trash2Icon />
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md">
          <DialogHeader className="text-center">
            <DialogTitle className="flex gap-2 items-center justify-center">
              <AlertTriangleIcon className="text-red-500" /> Are you sure you
              want to delete this?
            </DialogTitle>
            <DialogDescription>
              This is an irreversible action
            </DialogDescription>
          </DialogHeader>
          <form action={formAction} className="flex justify-center">
            <Button disabled={pending} variant={"destructive"}>
              {pending ? (
                <LoaderCircle className="animate-spin" />
              ) : (
                "Yes, Delete"
              )}
            </Button>
          </form>
          <DialogFooter className="sm:justify-center">
            <DialogClose asChild>
              <Button variant={"outline"} type="button">
                No, Cancel
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
