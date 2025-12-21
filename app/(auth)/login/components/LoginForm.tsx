"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLogin } from "@/data/queries/services/auth/call-hooks";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";

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
    mutate({ username: email, password });
  };

  useEffect(() => {
    isSuccess && router.push("/dashboard"); // Or /account depending on flow
  }, [isSuccess, router]);

  return (
    <form onSubmit={handleSubmit} className="grid gap-4">
      {isError && (
        <div className="p-3 text-sm bg-destructive/10 text-destructive rounded-md text-center font-medium">
          {error?.message || "Something went wrong. Please try again."}
        </div>
      )}

      <div className="grid gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          placeholder="name@example.com"
          type="text"
          autoCapitalize="none"
          autoComplete="email"
          autoCorrect="off"
          disabled={isLoading}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11"
          required
        />
      </div>
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="password">Password</Label>
          <Link
            href="#"
            className="ml-auto inline-block text-sm underline-offset-4 hover:underline text-muted-foreground"
          >
            Forgot your password?
          </Link>
        </div>
        <div className="relative">
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            disabled={isLoading}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 pr-10"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground"
          >
            {showPassword ? (
              <EyeOff className="w-4 h-4" />
            ) : (
              <Eye className="w-4 h-4" />
            )}
          </button>
        </div>
      </div>

      <Button disabled={isLoading} className="h-11 mt-2">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Sign In with Email
      </Button>
    </form>
  );
}
