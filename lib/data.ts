import postgres from "postgres";
import { User, Blog } from "@/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, {
  ssl: "require",
  prepare: false,
});

export async function usersToFollow(userId: string) {
  if (!userId) return null;

  try {
    const follows = await fetchUserFollows(userId);

    // Build list of ids to exclude: people I follow + myself
    const excludeIds = [userId, ...follows.map((f) => f.follower_id as string)];

    const data = await sql<User[]>`
  SELECT id, role, name, email, avatar, created_at
  FROM users
   WHERE id NOT IN ${sql(excludeIds)}
  ORDER BY created_at DESC
  LIMIT 5
`;
    return data;
  } catch (error) {
    console.error("Error fetching users to follow: ", error);
    return [];
  }
}
export async function fetchAllDevs(userId: string) {
  let data: User[] = [];
  try {
    data = await sql<User[]>`
  SELECT  id, role, name, email, avatar, created_at
  FROM users
  WHERE id != ${userId}
  ORDER BY created_at DESC
  LIMIT 5
  `;
  } catch (error) {
    console.error("Error fetching all devs: ", error);
    return data;
  }

  return data;
}

export async function allPublishedBlogs() {
  let blogs: Blog[] = [];
  try {
    blogs = await sql<Blog[]>`
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
  } catch (error) {
    console.error("Error fetching all published blogs: ", error);
    return blogs;
  }

  return blogs;
}

export async function fetchBlogById(blogId: string) {
  let blog: Blog[] = [];
  try {
    blog = await sql<Blog[]>`
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
  } catch (error) {
    console.error("Error fetching blogs by id: ", error);
    return blog[0];
  }
  return blog[0];
}

export async function fetchUserBlogs(userId: string) {
  let blogs: Blog[] = [];
  try {
    blogs = await sql<Blog[]>`
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
  } catch (error) {
    console.error("Error fetching user blogs by user id: ", error);
    return blogs;
  }

  return blogs;
}

export async function fetchLikesForBlog(blogId: string) {
  const likes = await sql`
    SELECT COUNT(user_id)
    FROM likes
    WHERE blog_id = ${blogId}
  `;
  return Number(likes[0]?.count);
}

export async function fetchUserInitialLike(blogId: string, userId: string) {
  const userLike = await sql`
    SELECT id FROM likes WHERE blog_id = ${blogId} AND user_id = ${userId}
  `;
  return userLike;
}

export async function fetchUserFollows(userId: string) {
  const data = await sql`
    SELECT follower_id FROM follows
    WHERE following_id = ${userId}
  `;

  return data;
}
export async function fetchUserFollowers(userId: string) {
  const data = await sql`
    SELECT following_id FROM follows
    WHERE follower_id = ${userId}
  `;

  return data;
}
