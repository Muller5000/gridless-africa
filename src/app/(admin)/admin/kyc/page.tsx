import React from "react";

export default function AdminKycPage() {
  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">KYC Verification Dashboard</h1>
      </div>

      {/* Stats Summary Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <div className="border-border bg-card rounded-xl border p-6 shadow-xs">
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Pending Reviews
          </span>
          <p className="text-foreground mt-1 text-2xl font-bold">0</p>
        </div>
        <div className="border-border bg-card rounded-xl border p-6 shadow-xs">
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Verified Installers
          </span>
          <p className="text-foreground mt-1 text-2xl font-bold">0</p>
        </div>
        <div className="border-border bg-card rounded-xl border p-6 shadow-xs">
          <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
            Suspended Accounts
          </span>
          <p className="text-foreground mt-1 text-2xl font-bold">0</p>
        </div>
      </div>

      {/* Main Body Grid */}
      <div className="border-border bg-card text-muted-foreground space-y-4 rounded-xl border p-8 text-center text-sm">
        <p>No installer KYC document uploads are currently awaiting review.</p>
      </div>
    </div>
  );
}
