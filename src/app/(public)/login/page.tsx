import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function LoginPage() {
  return (
    <div className="container mx-auto max-w-sm px-4 py-20 md:py-32">
      <div className="border-border bg-card space-y-6 rounded-xl border p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-foreground text-2xl font-bold tracking-tight">Sign In</h1>
          <p className="text-muted-foreground text-sm">
            Access your Gridless Africa account portal.
          </p>
        </div>

        <div className="border-border text-muted-foreground rounded-lg border border-dashed p-8 text-center text-sm">
          [Authentication Form Interface Placeholder]
        </div>

        <div className="flex flex-col gap-2">
          <Link href="/dashboard" className={buttonVariants({ className: "w-full" })}>
            Sign In as Customer
          </Link>
          <Link
            href="/installer-dashboard"
            className={buttonVariants({ variant: "outline", className: "w-full" })}
          >
            Sign In as Installer
          </Link>
          <Link
            href="/admin/kyc"
            className={buttonVariants({ variant: "ghost", className: "w-full" })}
          >
            Sign In as Admin
          </Link>
        </div>
      </div>
    </div>
  );
}
