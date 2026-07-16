import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted/20 flex min-h-screen">
      {/* Sidebar Navigation */}
      <aside className="border-border bg-card hidden w-64 border-r md:block">
        <div className="border-border flex h-16 items-center border-b px-6">
          <Link href="/dashboard" className="flex items-center space-x-2">
            <span className="text-primary text-lg font-bold tracking-tight">
              Gridless <span className="text-secondary-foreground">Customer</span>
            </span>
          </Link>
        </div>
        <nav className="space-y-1 p-4">
          <Link
            href="/dashboard"
            className="bg-muted text-foreground hover:bg-muted flex items-center rounded-lg px-4 py-2.5 text-sm font-medium"
          >
            Dashboard
          </Link>
          <Link
            href="/dashboard/quotes"
            className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center rounded-lg px-4 py-2.5 text-sm font-medium"
          >
            My Quotes
          </Link>
          <Link
            href="/dashboard/projects"
            className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center rounded-lg px-4 py-2.5 text-sm font-medium"
          >
            Active Projects
          </Link>
          <Link
            href="/dashboard/settings"
            className="text-muted-foreground hover:bg-muted hover:text-foreground flex items-center rounded-lg px-4 py-2.5 text-sm font-medium"
          >
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Container */}
      <div className="flex flex-1 flex-col">
        {/* Top Header */}
        <header className="border-border bg-card flex h-16 items-center justify-between border-b px-6">
          <span className="text-muted-foreground text-sm font-semibold">
            Welcome back, Customer
          </span>
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
