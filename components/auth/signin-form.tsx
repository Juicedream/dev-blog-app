"use client";
import { useState, useActionState, useEffect } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { geistMono } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { SignInFormState } from "@/app/actions/auth";
import { signInAction } from "@/app/actions/auth";
import { Loader2Icon } from "lucide-react";

export default function SignInForm() {
  const [savedState, setSavedState] = useState({
    email: "",
    password: "",
  });

  const initialState: SignInFormState = { errors: {}, message: null };
  const [state, formAction, pending] = useActionState(
    signInAction,
    initialState,
  );

  useEffect(() => {
    if (state?.errors?.email) {
      toast.error(state.errors.email);
    }
    if (state?.errors?.password) {
      toast.error(state.errors.password);
    }
    if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);
  return (
    <div className="flex flex-col w-full h-screen items-center justify-center ">
      {/* little badge */}

      <div className="border shadow-lg shadow-black/30 rounded-xl rounded-l-none py-4 px-4 flex flex-col w-74 relative">
        <div
          className={`bg-primary h-7 shadow-sm shadow-black/30 w-20 rotate-270 text-center text-slate-200 font-bold absolute left-[-18.6%] top-[6.8%] rounded-md rounded-b-none`}
        >
          SignIn
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
            </Field>
            <Field>
              <div className="flex items-center text-center">
                <p className="text-sm text-muted-foreground">
                  Don&apos;t have an account?
                </p>
                <Button asChild variant={"link"}>
                  <Link href={"/sign-up"}>Sign Up</Link>
                </Button>
              </div>
            </Field>
            <Field orientation="vertical">
              {/* <Button type="reset" variant="outline">
                Reset
              </Button> */}
              <Button disabled={pending} type="submit">
                {pending ? <Loader2Icon className="animate-spin" /> : "Sign In"}
              </Button>
            </Field>
          </FieldGroup>
        </form>
      </div>
    </div>
  );
}
