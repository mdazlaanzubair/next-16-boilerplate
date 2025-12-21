"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { Loader2 } from "lucide-react";

export function OtpForm() {
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // 3 minutes = 180 seconds

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // UI-only simulation
    console.log("OTP Submitted:", value);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  const handleResend = () => {
    console.log("Resend code clicked");
    setTimeLeft(180); // Reset timer
    // trigger resend logic here
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-6">
      <div className="flex justify-center">
        <InputOTP
          maxLength={6}
          value={value}
          onChange={(value) => setValue(value)}
        >
          <InputOTPGroup className="mx-2">
            <InputOTPSlot index={0} />
          </InputOTPGroup>
          <InputOTPGroup className="mx-2">
            <InputOTPSlot index={1} />
          </InputOTPGroup>
          <InputOTPGroup className="mx-2">
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPGroup className="mx-2">
            <InputOTPSlot index={3} />
          </InputOTPGroup>
          <InputOTPGroup className="mx-2">
            <InputOTPSlot index={4} />
          </InputOTPGroup>
          <InputOTPGroup className="mx-2">
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <Button disabled={value.length < 6 || isLoading} className="h-11">
        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Verify Account
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        Didn&apos;t receive a code?{" "}
        {timeLeft > 0 ? (
          <span className="text-muted-foreground/50 cursor-not-allowed">
            Resend in {formatTime(timeLeft)}
          </span>
        ) : (
          <Button
            type="button"
            variant="link"
            size="xs"
            className="hover:text-primary"
            onClick={handleResend}
          >
            Resend code
          </Button>
        )}
      </div>
    </form>
  );
}
