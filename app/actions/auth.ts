"use server";
import * as z from "zod";
import bcrypt from "bcrypt";
import postgres from "postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createSession, deleteSession } from "@/app/lib/session";
// import { User } from "@/lib/definitions";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

const SignUpFormSchema = z.object({
  name: z.string().min(2, { error: "Name must be at least 2 characters" }),
  email: z.email({ error: "Invalid email address" }),
  password: z
    .string()
    .min(8, { error: "Password must be at least 8 characters" })
    .regex(/[a-zA-Z]/, { error: "Password must contain at least one letter." })
    .regex(/[0-9]/, { error: "Password must contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Password must contain at least one special character.",
    })
    .trim(),
});

const SignInFormSchema = z.object({
  email: z.email({ error: "Invalid email address" }),
  password: z.string().min(1, { error: "Password is required" }).trim(),
});

export type AuthFormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };

      message?: string | null;
    }
  | undefined;
export type SignInFormState =
  | {
      errors?: {
        email?: string[];
        password?: string[];
      };

      message?: string | null;
    }
  | undefined;

export async function signUpAction(
  prevState: AuthFormState,
  formData: FormData,
) {
  const validatedFields = SignUpFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields. Unable to sign up",
    };
  }

  const { name, email, password } = validatedFields.data;
  const existingUser = await sql`
  SELECT * FROM users
  WHERE email = ${email}
  `;
  if (existingUser.length > 0) {
    return { message: "User with the email address already exists" };
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  let data;
  try {
    data = await sql`
        INSERT INTO users (name, email, password, role) 
        VALUES (${name}, ${email}, ${hashedPassword}, 'user')
        RETURNING id, name, email, role
      `;
  } catch (error) {
    console.error("Error during sign up:", error);
    return {
      message: "An error occurred while signing up. Please try again.",
    };
  }
  const newUser = data[0];
  await createSession(newUser.id, newUser.role);
  revalidatePath("/");
  redirect("/");
}

export async function signInAction(
  initialState: SignInFormState,
  formData: FormData,
) {
  const validatedFields = SignInFormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Missing Fields, Unable to sign in",
    };
  }

  const { email, password } = validatedFields.data;
  let data;
  try {
    data = await sql`
    SELECT * FROM users
    WHERE email = ${email}
    `;
  } catch (error) {
    console.error("Error fetching user via email during sign in: ", error);
  }
  if (!data) {
    console.error("Email is invalid");
    return { message: "Invalid Credentials" };
  }

  const user = data[0];

  const verifiedPassword = await bcrypt.compare(
    password,
    String(user?.password),
  );

  if (!verifiedPassword) {
    console.error("Password is invalid");
    return { message: "Invalid Credentials" };
  }

  await createSession(user.id, user.role);

  revalidatePath("/");
  redirect("/");
}

export async function logout() {
  await deleteSession();
  redirect("/");
}
