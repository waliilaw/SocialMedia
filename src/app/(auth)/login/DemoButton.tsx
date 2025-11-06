"use client";
import { useActionState } from "react";
import { demoLogin } from "./demo-action";
import LoadingButton from "@/components/LoadingButton";

export default function DemoButton() {
  const [state, formAction, isPending] = useActionState(demoLogin, null);

  return (
    <div className="space-y-2">
      {state?.error && (
        <p className="text-center text-sm text-destructive">{state.error}</p>
      )}
      <form action={formAction}>
        <LoadingButton
          loading={isPending}
          type="submit"
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold"
        >
          🚀 Try Demo (Skip Auth)
        </LoadingButton>
      </form>
    </div>
  );
}

