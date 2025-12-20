"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLogin } from "@/data/queries/services/auth/call-hooks";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const router = useRouter();
  const {
    mutate,
    isPending: isLoading,
    error,
    isError,
    isSuccess,
  } = useLogin();

  const [email, setEmail] = useState<string>("emilys");
  const [password, setPassword] = useState<string>("emilyspass");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      username: email,
      password,
    };

    mutate(payload);
  };

  useEffect(() => {
    isSuccess && router.push("/dashboard");
  }, [isSuccess, router]);

  return (
    <form className={cn("flex flex-col gap-6")} onSubmit={handleSubmit}>
      {isError && (
        <div className="p-4 bg-red-300 text-red-500 font-semibold rounded-lg text-center">
          {error.message}
        </div>
      )}
      <FieldGroup>
        <div className="flex flex-col items-center gap-1 text-center">
          <h1 className="text-2xl font-bold">Login to your account</h1>
          <p className="text-muted-foreground text-sm text-balance">
            Enter your email below to login to your account
          </p>
        </div>
        <Field>
          <FieldLabel htmlFor="email">Email</FieldLabel>
          <Input
            id="email"
            type="text"
            placeholder="m@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>
        <Field>
          <div className="flex items-center justify-between mb-0">
            <FieldLabel htmlFor="password">Password</FieldLabel>
            <Button
              type="button"
              variant="link"
              size="sm"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? "hide" : "show"}
            </Button>
          </div>
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>
        <Field>
          <FieldDescription className="text-center">
            <Link href="/register" className="underline underline-offset-4">
              Forgot your password?
            </Link>
          </FieldDescription>
        </Field>
        <Field>
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </Field>
        <Field>
          <FieldDescription className="text-center">
            Don&apos;t have an account?{" "}
            <Link href="/register" className="underline underline-offset-4">
              Sign up
            </Link>
          </FieldDescription>
        </Field>
      </FieldGroup>
    </form>
  );
}
