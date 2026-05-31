"use client";
import Link from "next/link";
import { useActionState, useState, useEffect } from "react";
import { toast } from "sonner";
import { geistMono } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { AuthFormState } from "@/app/actions/auth";
import { signUpAction } from "@/app/actions/auth";
import { Loader2Icon } from "lucide-react";

export default function SignUpForm() {
  const [savedState, setSavedState] = useState({
    name: "",
    email: "",
    password: "",
  });
  const initialState: AuthFormState = { errors: {}, message: null };
  const [state, formAction, pending] = useActionState(
    signUpAction,
    initialState,
  );

  useEffect(() => {
    if (state?.message) {
      toast.error(state.message);
    }
    if (state?.errors?.password) {
      toast.error(state.errors.password[0]);
    }
    if (state?.errors?.name) {
      toast.error(state.errors.name[0]);
    }
    if (state?.errors?.email) {
      toast.error(state.errors.email[0]);
    }
  }, [state]);

  return (
    <div className="flex flex-col w-full h-screen items-center justify-center ">
      {/* little badge */}
      <div className="border shadow-lg shadow-black/30 rounded-xl rounded-l-none py-4 px-4 flex flex-col w-74 relative">
        <div
          className={`bg-primary h-7 shadow-sm shadow-black/30 w-20 rotate-270 text-center text-slate-200 font-bold absolute left-[-18.6%] top-[5.1%] rounded-md rounded-b-none`}
        >
          Signup
        </div>
        <form className="w-full" action={formAction}>
          <FieldGroup>
            <Field>
              {/* <FieldLabel
                className={`${geistMono.className} text-lg font-bold`}
              >
                Sign Up
              </FieldLabel> */}
              <FieldDescription className={`${geistMono.className}`}>
                Create a new account for your blog ideas
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="name">Name</FieldLabel>
              <Input
                id="name"
                placeholder="Dev Blog"
                name="name"
                value={savedState.name}
                onChange={(e) =>
                  setSavedState({
                    ...savedState,
                    name: e.target.value,
                  })
                }
              />
              {/* {state?.errors?.name && (
                <p className="text-red-500">{state?.errors.name[0]}</p>
              )} */}
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="devblog@example.com"
                name="email"
                value={savedState.email}
                onChange={(e) =>
                  setSavedState({
                    ...savedState,
                    email: e.target.value,
                  })
                }
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Password</FieldLabel>
              <Input
                id="password"
                type="password"
                placeholder="************"
                name="password"
                value={savedState.password}
                onChange={(e) =>
                  setSavedState({
                    ...savedState,
                    password: e.target.value,
                  })
                }
              />
              {/* {state?.errors?.password &&
                state?.errors.password.map((error) => (
                  <p key={error} className="text-red-500">
                    {error}
                  </p>
                ))} */}
            </Field>
            <Field>
              <div className="flex items-center text-center">
                <p className="text-sm text-muted-foreground">
                  Already have an account?
                </p>
                <Button asChild variant={"link"}>
                  <Link href={"/sign-in"}>Sign In</Link>
                </Button>
              </div>
            </Field>
            <Field orientation="vertical">
              {/* <Button type="reset" variant="outline">
                Reset
              </Button> */}
              <Button disabled={pending} type="submit">
                {pending ? <Loader2Icon className="animate-spin" /> : "Sign Up"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
