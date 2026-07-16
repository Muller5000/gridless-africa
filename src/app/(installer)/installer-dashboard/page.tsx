import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function InstallerDashboardPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Installer Dashboard</h1>
        <Link href="/installer/profile" className={buttonVariants()}>
          Complete KYC Setup
        </Link>
      </div>

      {/* Warning Alert */}
      <div className="rounded-lg border border-amber-500/20 bg-amber-500/5 p-4 text-sm text-amber-500">
        <span className="font-bold">KYC Action Required:</span> Please upload your CAC business
        registration documents and certifications to activate lead bidding.
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-4">
        <div className="border-border bg-card rounded-xl border p-6 shadow-xs">
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Geofenced Leads
          </span>
          <p className="text-foreground mt-1 text-2xl font-bold">0</p>
        </div>
        <div className="border-border bg-card rounded-xl border p-6 shadow-xs">
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            My Active Bids
          </span>
          <p className="text-foreground mt-1 text-2xl font-bold">0</p>
        </div>
        <div className="border-border bg-card rounded-xl border p-6 shadow-xs">
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Completed Jobs
          </span>
          <p className="text-foreground mt-1 text-2xl font-bold">0</p>
        </div>
        <div className="border-border bg-card rounded-xl border p-6 shadow-xs">
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Escrow Payouts
          </span>
          <p className="text-foreground mt-1 text-2xl font-bold">₦0.00</p>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="border-border bg-card text-muted-foreground space-y-4 rounded-xl border p-8 text-center text-sm">
        <p>No customer leads are currently active in Oyo or Lagos matching your profile.</p>
        <Link href="/installer/leads" className={buttonVariants({ variant: "outline" })}>
          Browse Leads Directory
        </Link>
      </div>
    </div>
  );
}
