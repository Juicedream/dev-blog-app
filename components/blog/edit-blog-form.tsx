"use client";
import { useState, useActionState } from "react";
import { toast } from "sonner";

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
import { Blog, BlogStatus, User } from "@/lib/definitions";
import BlogCardView from "./blog-card-view";
import type { BlogState } from "@/lib/action";
import { updateBlogAction } from "@/lib/action";
import { Loader2Icon } from "lucide-react";

export function EditBlogForm({
  blog,
  content,
  user,
  userLike,
  likesResult,
}: {
  blog: Blog;
  content: string;
  user: User;
  userLike: Record<string, unknown>[];
  likesResult: number;
}) {
  const [title, setTitle] = useState(blog.title || "");
  const [blogContent, setBlogContent] = useState(content || "");
  const [imageUrl, setImageUrl] = useState(blog.image_url || "");
  const [status, setStatus] = useState<BlogStatus>(blog.status as BlogStatus);
  const fullBlog = {
    id: blog.id,
    user_id: blog.user_id,
    title,
    content: blogContent,
    image_url: imageUrl,
    status,
    created_at: "March 1, 2000",
    updated_at: "May 6, 2000",
    author_name: "You",
  } as Blog;
  const initialState: BlogState = { errors: {}, message: null };
  const updateBlog = updateBlogAction.bind(null, {
    userId: fullBlog.user_id,
    blogId: fullBlog.id,
  });
  const [state, formAction, isPending] = useActionState(
    updateBlog,
    initialState,
  );
  function showToast() {
    if (state.message) {
      toast.error(state.message);
    } else {
      toast.success("Blog updated successfully");
    }
  }
  return (
    <div className="w-full">
      <form action={formAction} className="w-full flex justify-between gap-12">
        <div className="w-3/4">
          <FieldGroup>
            <FieldSet>
              <FieldLegend>Edit Blog</FieldLegend>
              <FieldDescription>Edit your ideas not a problem</FieldDescription>
            </FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title</FieldLabel>
                <Input
                  id="title"
                  placeholder="Enter blog title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  name="title"
                />
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="image_url">Image Url</FieldLabel>
                <Input
                  id="image_url"
                  placeholder="Paste your blog image url"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  name="image_url"
                />
              </Field>
            </FieldGroup>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="status">Status</FieldLabel>
                <Select
                  value={status}
                  onValueChange={(val: BlogStatus) => setStatus(val)}
                >
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
                <Input type="hidden" name="status" value={status} />
              </Field>
            </FieldGroup>

            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="content">
                  Blog Content{" "}
                  <p className="text-sm text-red-400">
                    * Content must be in Markdown Format *
                  </p>
                </FieldLabel>
                <Textarea
                  name="content"
                  id="content"
                  placeholder="Write out your ideas"
                  className="resize-none overflow-y-auto scrollbar-none h-120"
                  value={blogContent}
                  onChange={(e) => setBlogContent(e.target.value)}
                />
              </Field>
            </FieldGroup>
          </FieldGroup>
        </div>
        <div className="w-4/4">
          {/* Error message */}
          <div className="mb-4 flex flex-col gap-2">
            {state?.errors?.title &&
              state.errors.title.map((error) => (
                <p
                  key={error}
                  className="text-red-500 text-sm hover:bg-red-200 w-fit"
                >
                  {error}
                </p>
              ))}
            {state?.errors?.content &&
              state.errors.content.map((error) => (
                <p
                  key={error}
                  className="text-red-500 text-sm hover:bg-red-200 w-fit"
                >
                  {error}
                </p>
              ))}
            {state?.errors?.image_url &&
              state.errors.image_url.map((error) => (
                <p
                  key={error}
                  className="text-red-500 text-sm hover:bg-red-200 w-fit"
                >
                  {error}
                </p>
              ))}
            {state?.errors?.status &&
              state.errors.status.map((error) => (
                <p
                  key={error}
                  className="text-red-500 text-sm hover:bg-red-200"
                >
                  {error}
                </p>
              ))}
          </div>
          <BlogCardView
            blog={fullBlog}
            preview={true}
            showLikeButton={false}
            showBackBtn={false}
            likesResult={likesResult}
            user={user}
            content={blogContent}
            userLike={userLike}
          />
          <Button
            onClick={showToast}
            disabled={isPending}
            type="submit"
            className="mr-2"
          >
            {isPending ? <Loader2Icon className="animate-spin" /> : "Save"}
          </Button>
          <Button asChild variant={"destructive"} type="button">
            <Link href="/">Cancel</Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
