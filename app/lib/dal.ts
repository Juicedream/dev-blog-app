import "server-only";
import { cookies } from "next/headers";
import { decrypt } from "@/app/lib/session";
import { cache } from "react";
// import { redirect } from "next/navigation";
import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export const verifySession = cache(async () => {
  const cookie = (await cookies()).get("session")?.value;
  const session = await decrypt(cookie);

  if (!session || !session?.userId) {
    return null;
  }
  return {
    isAuth: true,
    userId: session.userId as string,
    role: session.role as string,
  };
});

export const getUser = cache(async () => {
  const session = await verifySession();
  if (!session) return null;

  const { userId } = session;

  try {
    const data = await sql`
       SELECT id, name, email, role, avatar, created_at FROM users
       WHERE id = ${userId}
       LIMIT 1
       `;
    const user = data[0] ?? null;
    return user;
  } catch (error) {
    console.error("Failed to get User in the dal.ts file: ", error);
    return null;
  }
});
