import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, EarthIcon, PenBoxIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { LikeButton } from "@/components/like-button";
import { BlogActionButtons } from "@/components/blog/blog-action-buttons";
import { Blog, User } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { BlogContent } from "@/components/blog/blog-content";

export default function BlogCardView({
  blog,
  user,
  content,
  likesResult,
  userLike,
  allowActions = false,
  preview,
  showLikeButton = true,
  showBackBtn = true,
}: {
  blog: Blog;
  user: User;
  content: string;
  likesResult: number;
  userLike: Record<string, unknown>[];
  allowActions?: boolean;
  preview?: boolean;
  showLikeButton?: boolean;
  showBackBtn?: boolean;
}) {
  const created_at = new Date(blog.created_at).toDateString();
  const updated_at = new Date(blog.updated_at).toDateString();
  return (
    <main
      className={cn("flex justify-center items-center w-full", {
        "flex-col": preview === true,
      })}
    >
      <div
        className={`px-4 py-2 w-full border shadow-sm shadow-black/20 gap-8 mb-4 rounded-2xl
          ${preview === true ? "" : "flex flex-col md:flex-row "}
        `}
      >
        {preview && (
          <div className="mb-2 flex items-center justify-center">
            {blog.status === "draft" ? (
              <>
                <PenBoxIcon className="text-blue-300 mr-2" />
                <Badge
                  variant={"secondary"}
                  className="bg-blue-300 shadow-sm shadow-black/40"
                >
                  Draft
                </Badge>
              </>
            ) : (
              <>
                <EarthIcon className="text-green-500 mr-2" />
                <Badge className="bg-green-500 shadow-sm shadow-black/40">
                  Published
                </Badge>
              </>
            )}
          </div>
        )}
        <div className="flex justify-center">
          <Image
            src={blog.image_url}
            width={700}
            height={700}
            className="rounded-2xl"
            alt={`${blog.title} image`}
          />
        </div>
        <div className="flex-1 flex flex-col justify-between gap-4 py-2">
          <div className="space-y-1">
            {showBackBtn && (
              <div className="flex justify-between items-center">
                <Button
                  size={"lg"}
                  variant={"outline"}
                  asChild
                  className="mb-2"
                >
                  <Link href={"/"}>
                    <ArrowLeft size={20} className="text-red-300" />
                    Back
                  </Link>
                </Button>
                {showLikeButton && (
                  <LikeButton
                    blogId={blog.id}
                    userId={user?.id}
                    initialLikes={likesResult}
                    initialLiked={userLike.length > 0}
                  />
                )}
              </div>
            )}
            <h1 className="text-2xl font-bold">{blog.title}</h1>
            <div className="flex justify-between items-center">
              <p className="italic text-xs text-accent-foreground">
                Created on: {created_at}
              </p>
              {allowActions && <BlogActionButtons blogId={blog.id} />}
            </div>
          </div>
          <BlogContent content={content} />
          <div className="flex justify-between items-center">
            <p className="italic text-xs text-accent-foreground">
              Updated on: {updated_at}
            </p>
            <div className="flex gap-2 items-center">
              <p className="text-sm font-semibold">Created By:</p>
              <Badge variant={"default"}>
                {allowActions ? "You" : blog.author_name}
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
