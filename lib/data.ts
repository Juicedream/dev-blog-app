import postgres from "postgres";
import { User, Blog } from "@/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function usersToFollow() {
  const data = await sql<User[]>`
  SELECT  id, role, name, email, avatar, created_at
  FROM users
  ORDER BY created_at DESC
  LIMIT 5
  `;
  return data;
}
export async function fetchAllDevs() {
  const data = await sql<User[]>`
  SELECT  id, role, name, email, avatar, created_at
  FROM users
  ORDER BY created_at DESC
  LIMIT 5
  `;
  return data;
}

export async function allPublishedBlogs() {
  const blogs = await sql<Blog[]>`
  SELECT 
      blogs.id,
      blogs.title,
      blogs.content,
      blogs.image_url,
      blogs.status,
      blogs.created_at,
      blogs.updated_at,
      users.id AS user_id,
      users.name AS author_name,
      users.avatar AS author_avatar
  FROM blogs
  INNER JOIN users ON blogs.user_id = users.id
  WHERE blogs.status = 'published' 
  ORDER BY blogs.updated_at DESC
  LIMIT 10
  `;
  return blogs;
}

export async function fetchBlogById(blogId: string) {
  const blog = await sql<Blog[]>`
  SELECT 
      blogs.id,
      blogs.title,
      blogs.content,
      blogs.image_url,
      blogs.status,
      blogs.created_at,
      blogs.updated_at,
      users.id AS user_id,
      users.name AS author_name,
      users.avatar AS author_avatar
  FROM blogs
  INNER JOIN users ON blogs.user_id = users.id
  WHERE blogs.id = ${blogId}
  LIMIT 1
  `;
  return blog[0];
}

export async function fetchUserBlogs(userId: string) {
  const blogs = await sql<Blog[]>`
  SELECT 
      blogs.id,
      blogs.title,
      blogs.content,
      blogs.image_url,
      blogs.status,
      blogs.created_at,
      blogs.updated_at
  FROM blogs
  WHERE blogs.user_id = ${userId}
  ORDER BY blogs.created_at DESC
  LIMIT 5
  `;
  return blogs;
}
