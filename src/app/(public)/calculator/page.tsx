import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function SolarCalculatorPage() {
  return (
    <div className="container mx-auto max-w-xl px-4 py-16 md:py-24">
      <div className="border-border bg-card space-y-6 rounded-xl border p-8 shadow-sm">
        <div className="space-y-2 text-center">
          <h1 className="text-foreground text-2xl font-bold tracking-tight">
            Solar Savings Calculator
          </h1>
          <p className="text-muted-foreground text-sm">
            Estimate your required load, recommended hardware sizing, and estimated ROI.
          </p>
        </div>

        <div className="border-border text-muted-foreground rounded-lg border border-dashed p-12 text-center text-sm">
          [Solar Calculator Form Placeholder]
        </div>

        <div className="flex justify-end space-x-3">
          <Link href="/" className={buttonVariants({ variant: "ghost" })}>
            Back
          </Link>
          <Link href="/login?redirectTo=/dashboard" className={buttonVariants()}>
            Get Verified Quotes
          </Link>
        </div>
      </div>
    </div>
  );
}
