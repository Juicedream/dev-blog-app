import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function fetchUsers() {
  const data = await sql`
    SELECT * FROM users
  `;
  return data;
}

export async function GET() {
  try {
    return Response.json(await fetchUsers());
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
