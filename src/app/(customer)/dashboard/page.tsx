import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function CustomerDashboardPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Customer Dashboard</h1>
        <Link href="/calculator" className={buttonVariants()}>
          New Sizing Request
        </Link>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="border-border bg-card rounded-xl border p-6 shadow-xs">
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Active Projects
          </span>
          <p className="text-foreground mt-1 text-2xl font-bold">0</p>
        </div>
        <div className="border-border bg-card rounded-xl border p-6 shadow-xs">
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Pending Quotes
          </span>
          <p className="text-foreground mt-1 text-2xl font-bold">0</p>
        </div>
        <div className="border-border bg-card rounded-xl border p-6 shadow-xs">
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Funds in Escrow
          </span>
          <p className="text-foreground mt-1 text-2xl font-bold">₦0.00</p>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="border-border bg-card text-muted-foreground space-y-4 rounded-xl border p-8 text-center text-sm">
        <p>You do not have any active solar installation requests.</p>
        <Link href="/calculator" className={buttonVariants({ variant: "outline" })}>
          Start Sizing Appliance Load
        </Link>
      </div>
    </div>
  );
}
