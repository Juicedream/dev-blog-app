import { geistMono } from "@/app/layout";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center ">
      {/* little badge */}

      <div className="border shadow-lg shadow-black/30 rounded-xl rounded-l-none py-4 px-4 flex flex-col w-74 relative">
        <div
          className={`bg-primary h-7 shadow-sm shadow-black/30 w-20 rotate-270 text-center text-slate-200 font-bold absolute left-[-18.6%] top-[6.8%] rounded-md rounded-b-none`}
        >
          SignIn
        </div>
        <form className="w-full">
          <FieldGroup>
            <Field>
              {/* <FieldLabel
                className={`${geistMono.className} text-lg font-bold`}
              >
                Sign Up
              </FieldLabel> */}
              <FieldDescription className={`${geistMono.className}`}>
                Welcome Back! 👋
              </FieldDescription>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="devblog@example.com"
                name="email"
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="************"
                name="password"
              />
            </Field>
            <Field>
              <FieldDescription className="flex items-center text-center">
                <p>Don&apos;t have an account?</p>
                <Button asChild variant={"link"}>
                  <Link href={"/sign-up"}>Sign Up</Link>
                </Button>
              </FieldDescription>
            </Field>
            <Field orientation="vertical">
              {/* <Button type="reset" variant="outline">
                Reset
              </Button> */}
              <Button type="submit">Sign In</Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
