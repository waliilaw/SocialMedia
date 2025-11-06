"use client";
import { useTransition } from "react";
import { demoLogin } from "./demo-action";
import { Button } from "@/components/ui/button";
import LoadingButton from "@/components/LoadingButton";

export default function DemoButton() {
  const [isPending, startTransition] = useTransition();

  async function handleDemoLogin() {
    startTransition(async () => {
      await demoLogin();
    });
  }

  return (
    <LoadingButton
      loading={isPending}
      onClick={handleDemoLogin}
      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold"
    >
      🚀 Try Demo (Skip Auth)
    </LoadingButton>
  );
}

