"use client";
import { useActionState } from "react";
import { toast } from "sonner";
import { BlogState, createBlogAction } from "@/lib/action";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Loader2Icon } from "lucide-react";

export function CreateBlogForm() {
  const initialState: BlogState = { errors: {}, message: null };
  const createBlog = createBlogAction.bind(
    null,
    "87a68ae1-71a7-4f73-be99-3bddb73d7267",
  );
  const [state, formAction, isPending] = useActionState(
    createBlog,
    initialState,
  );
  function showToast() {
    if (state.message) {
      toast.error(state.message);
    } else {
      toast.success("Blog created successfully");
    }
  }
  return (
    <div className="w-full max-w-md">
      <form action={formAction}>
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Create Blog</FieldLegend>
            <FieldDescription>Share your idea with the world</FieldDescription>
          </FieldSet>
          {state?.message && (
            <div aria-live="polite" className="rounded-md mt-2">
              <p className="text-sm text-red-500" key={state.message}>
                {state.message}
              </p>
            </div>
          )}

          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="title">Title</FieldLabel>
              <Input name="title" id="title" placeholder="Enter blog title" />
            </Field>
            {state?.errors?.title && (
              <div aria-live="polite" className="px-4 rounded-md mt-2">
                {state.errors.title?.map((error) => {
                  return (
                    <p className="text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  );
                })}
              </div>
            )}
          </FieldGroup>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="image_url">Image Url</FieldLabel>
              <Input
                name="image_url"
                id="image_url"
                placeholder="Paste your blog image url"
              />
            </Field>
            {state?.errors?.image_url && (
              <div aria-live="polite" className="px-4 rounded-md mt-2">
                {state.errors.image_url?.map((error) => {
                  return (
                    <p className="text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  );
                })}
              </div>
            )}
          </FieldGroup>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <Select defaultValue="" name="status">
                <SelectTrigger id="status">
                  <SelectValue placeholder="Draft" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            {state?.errors?.status && (
              <div aria-live="polite" className="px-4 rounded-md mt-2">
                {state.errors.status?.map((error) => {
                  return (
                    <p className="text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  );
                })}
              </div>
            )}
          </FieldGroup>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="content">Blog Content</FieldLabel>
              <Textarea
                id="content"
                placeholder="Write out your ideas"
                className="resize-none overflow-y-auto scrollbar-none h-120"
                name="content"
              />
            </Field>
            {state?.errors?.content && (
              <div aria-live="polite" className="px-4 rounded-md mt-2">
                {state.errors.content?.map((error) => {
                  return (
                    <p className="text-sm text-red-500" key={error}>
                      {error}
                    </p>
                  );
                })}
              </div>
            )}
          </FieldGroup>
          <FieldGroup>
            <Field orientation={"horizontal"}>
              <Button disabled={isPending} onClick={showToast}>
                {isPending ? <Loader2Icon className="animate-spin" /> : "Post"}
              </Button>
              <Button asChild variant={"destructive"} type="button">
                <Link href="/">Cancel</Link>
              </Button>
            </Field>
          </FieldGroup>
        </FieldGroup>
      </form>
    </div>
  );
}
