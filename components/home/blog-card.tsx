import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Blog } from "@/lib/definitions";

type BlogCardProps = {
  blog: Blog;
};
export default function BlogCard({ blog }: BlogCardProps) {
  const blogDescription =
    blog.content.length > 60 ? blog.content.slice(0, 60) + "..." : blog.content;
  const blogTitle =
    blog.title.length > 20 ? blog.title.slice(0, 20) + "..." : blog.title;
  return (
    <Card className="relative mx-auto w-full pt-0">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <Image
        width={200}
        height={200}
        src={blog.image_url}
        alt={blog.title}
        className="relative z-20 aspect-video w-full object-cover brightness-60 color dark:brightness-40"
      />
      <CardHeader>
        <CardAction>
          <Badge variant={"secondary"}>{blog.id}</Badge>
        </CardAction>
        <CardTitle>{blogTitle}</CardTitle>
        <CardDescription className="py-3">
          {blogDescription}
          {/* <Image
            width={200}
            height={200}
            src={blog.image_url}
            alt={blog.title}
            className="relative z-20 aspect-video w-full object-cover brightness-60 color dark:brightness-40"
          /> */}
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button asChild className="w-full">
          <Link href={`/blogs/${blog.id}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
