import React from "react";
import LeadsList from "@/features/quotes/leads-list";
import { Card } from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";

export default function InstallerDashboardPage() {
  return (
    <div className="max-w-5xl space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-extrabold tracking-tight">
            Installer Control Center
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Browse regional customer leads, manage active bids, and monitor escrow payouts.
          </p>
        </div>
      </div>

      {/* KYC Alert Message */}
      <div className="flex items-start space-x-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-amber-500" />
        <div className="space-y-1">
          <h4 className="text-foreground text-sm font-bold">
            Action Required: Business Vetting Pending
          </h4>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Please upload your Corporate Affairs Commission (CAC) registration files and engineering
            certificates under Profile & KYC. You cannot submit active bids until credentials are
            approved by platform administrators.
          </p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card className="border-border bg-card space-y-2 border p-6 shadow-xs">
          <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
            My Active Bids
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-foreground text-3xl font-black">0</span>
            <span className="text-muted-foreground text-xs">Submitted</span>
          </div>
        </Card>

        <Card className="border-border bg-card space-y-2 border p-6 shadow-xs">
          <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
            Active Projects
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-foreground text-3xl font-black">0</span>
            <span className="text-muted-foreground text-xs">In progress</span>
          </div>
        </Card>

        <Card className="border-border bg-card space-y-2 border p-6 shadow-xs">
          <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
            Escrow Payouts
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-primary text-3xl font-black">₦0.00</span>
            <span className="text-muted-foreground text-xs">Cleared</span>
          </div>
        </Card>
      </div>

      {/* Leads List component section */}
      <div className="pt-4">
        <LeadsList />
      </div>
    </div>
  );
}
