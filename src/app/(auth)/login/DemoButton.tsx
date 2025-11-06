"use client";
import { useState, useTransition } from "react";
import { demoLogin } from "./demo-action";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";

export default function DemoButton() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string>();

  async function handleDemoLogin() {
    setError(undefined);
    startTransition(async () => {
      try {
        const result = await demoLogin();
        if (result && result.error) {
          setError(result.error);
        }
      } catch (err) {
        console.error("Demo login error:", err);
        setError("Failed to login. Please try again.");
      }
    });
  }

  return (
    <div className="space-y-2">
      {error && <p className="text-center text-sm text-destructive">{error}</p>}
      <LoadingButton
        loading={isPending}
        onClick={handleDemoLogin}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold"
      >
        🚀 Try Demo (Skip Auth)
      </LoadingButton>
    </div>
  );
}

