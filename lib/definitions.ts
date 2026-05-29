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

export type BlogStatus = {
  status: "draft" | "published";
};
