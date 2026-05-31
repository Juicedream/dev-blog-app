import { extractSimilarItemsFromArrayObj } from "@/utils/helpers";

export type User = {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  password?: string;
  avatar?: string;
  followers?: Follow[];
  following?: Follow[];
  created_at: Date;
  updated_at: Date;
};

export type UserRole = {
  role: "admin" | "user";
};

export type Blog = {
  id: string;
  user_id: string;
  likes?: Like[];
  title: string;
  content: string;
  image_url: string;
  author_name?: string;
  author_avatar?: string;
  status: BlogStatus;
  created_at: string;
  updated_at: string;
};

export type Like = {
  user_id: string;
  blog_id: string;
};

export type Follow = {
  user_id: string;
};

export type BlogStatus = "draft" | "published";

export type SessionPayload = {
  userId: string;
  role: UserRole;
  expiresAt: Date;
};

export const defaultLinks = [
  { label: "Sign In", href: "/sign-in" },
  { label: "Sign Up", href: "/sign-up" },
];
export const adminRoleLinks = [
  { label: "Profile", href: "/admin/profile" },
  { label: "Devs", href: "/admin/devs" },
  { label: "My Blogs", href: "/admin/my-blogs" },
];

export const userRoleLinks = [
  { label: "Profile", href: "/user/profile" },
  { label: "My Blogs", href: "/user/my-blogs" },
];

export const protectedLinks = [
  ...extractSimilarItemsFromArrayObj("href", adminRoleLinks),
  ...extractSimilarItemsFromArrayObj("href", userRoleLinks),
  "/blogs",
  "/blogs/create",
  "/blogs/:id",
  "/blogs/:id/edit",
];

// console.log({ protectedLinks });
