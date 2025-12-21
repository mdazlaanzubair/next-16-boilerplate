import { OtpForm } from "./components/OtpForm";
import Link from "next/link";

export default function VerifyOtpPage() {
  return (
    <div className={"w-full grid gap-6"}>
      <div className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          Verify your identity
        </h1>
        <p className="text-sm text-muted-foreground">
          Enter the 6-digit code sent to your email
        </p>
      </div>

      <OtpForm />

      <div className="text-center text-sm text-muted-foreground">
        Back to{" "}
        <Link
          href="/login"
          className="underline underline-offset-4 hover:text-primary"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
