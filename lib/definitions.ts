export type User = {
  id: string;
  role: UserRole;
  name: string;
  email: string;
  password: string;
  avatar?: string;
  followers?: Follow[];
  following?: Follow[];
  createdAt: Date;
  updatedAt: Date;
};

export type UserRole = {
  role: "admin" | "user";
};

export type Blog = {
  id: string;
  userId: string;
  likes: Like[];
  title: string;
  content: string;
  imageUrl: string;
  status: BlogStatus;
  createdAt: string;
  updatedAt: string;
};

export type Like = {
  userId: string;
};

export type Follow = {
  followUserId: string;
};

export type BlogStatus = {
  status: "draft" | "published";
};
