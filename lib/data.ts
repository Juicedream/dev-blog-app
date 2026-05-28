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

export async function allPublishedBlogs() {
  const blogs = await sql<Blog[]>`
  SELECT * FROM blogs
  WHERE status = 'published' 
  ORDER BY created_at DESC
  `;
  return blogs;
}
