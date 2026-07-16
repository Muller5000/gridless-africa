import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function InstallerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted/20 flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="border-border bg-card hidden w-64 border-r md:block">
        <div className="border-border flex h-16 items-center border-b px-6">
          <Link href="/installer-dashboard" className="flex items-center space-x-2">
            <span className="text-primary text-lg font-bold tracking-tight">
              Gridless <span className="text-secondary-foreground">Installer</span>
            </span>
          </Link>
        </div>
        <nav className="space-y-1 p-4">
          <Link
            href="/installer-dashboard"
            className="bg-muted text-foreground hover:bg-muted flex items-center rounded-lg px-4 py-2.5 text-sm font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/installer/leads"
            className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center rounded-lg px-4 py-2.5 text-sm font-medium"
          >
            Geofenced Leads
          </Link>
          <Link
            href="/installer/quotes"
            className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center rounded-lg px-4 py-2.5 text-sm font-medium"
          >
            Submitted Bids
          </Link>
          <Link
            href="/installer/jobs"
            className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center rounded-lg px-4 py-2.5 text-sm font-medium"
          >
            Active Jobs
          </Link>
          <Link
            href="/installer/profile"
            className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center rounded-lg px-4 py-2.5 text-sm font-medium"
          >
            KYC & Profile
          </Link>
        </nav>
      </aside>

      {/* Main Container */}
      <div className="flex flex-1 flex-col">
        {/* Top Header */}
        <header className="border-border bg-card flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center space-x-3">
            <span className="text-muted-foreground text-sm font-semibold">
              Installer Command Panel
            </span>
            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2 py-0.5 text-xs font-semibold text-amber-500">
              KYC Pending Verification
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <Link href="/" className={buttonVariants({ variant: "outline", size: "sm" })}>
              Public Site
            </Link>
            <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
              Logout
            </Link>
          </div>
        </header>

        {/* Content View */}
        <main className="flex-1 p-6 md:p-8">{children}</main>
      </div>
    </div>
  );
}
