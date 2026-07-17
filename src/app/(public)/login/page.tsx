import React from "react";
import AuthForm from "@/features/auth/auth-form";

export default function LoginPage() {
  return (
    <div className="animate-in fade-in container mx-auto max-w-md px-4 py-16 duration-200 md:py-24">
      <div className="border-border bg-card space-y-6 rounded-xl border p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-foreground text-3xl font-extrabold tracking-tight">Welcome</h1>
          <p className="text-muted-foreground text-sm">Access the Gridless Africa secure portal.</p>
        </div>

        <AuthForm />
      </div>
    </div>
  );
}
