"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  Calculator,
  LayoutDashboard,
  FileSpreadsheet,
  Settings,
  LogOut,
  User,
  ShieldCheck,
  Menu,
  X,
  Store,
  Users,
} from "lucide-react";
import { createClient } from "@/lib/supabase/client";

// --- Public Navbar & Mobile Drawer ---
export function PublicHeader() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const links = [
    { href: "/calculator", label: "Solar Sizer" },
    { href: "/marketplace", label: "Marketplace" },
    { href: "/installers", label: "Verified Installers" },
  ];

  return (
    <header className="border-border bg-background/95 sticky top-0 z-50 w-full border-b backdrop-blur-xs">
      <div className="container mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-primary text-xl font-bold tracking-tight">
            Gridless <span className="text-secondary-foreground">Africa</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden space-x-6 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "hover:text-primary text-sm font-medium transition-colors",
                pathname === link.href ? "text-primary font-semibold" : "text-muted-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop actions */}
        <div className="hidden items-center space-x-3 md:flex">
          <Link href="/login" className={buttonVariants({ variant: "ghost", size: "sm" })}>
            Sign In
          </Link>
          <Link href="/calculator" className={buttonVariants({ size: "sm" })}>
            Get Quotes
          </Link>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="text-muted-foreground hover:bg-muted rounded-lg p-2 md:hidden"
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-border bg-card animate-in slide-in-from-top border-b p-4 duration-150 md:hidden">
          <nav className="flex flex-col space-y-4">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "hover:text-primary text-sm font-medium transition-colors",
                  pathname === link.href ? "text-primary font-semibold" : "text-muted-foreground",
                )}
              >
                {link.label}
              </Link>
            ))}
            <hr className="border-border" />
            <Link
              href="/login"
              onClick={() => setMobileMenuOpen(false)}
              className={buttonVariants({ variant: "outline", className: "w-full" })}
            >
              Sign In
            </Link>
            <Link
              href="/calculator"
              onClick={() => setMobileMenuOpen(false)}
              className={buttonVariants({ className: "w-full" })}
            >
              Get Quotes
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

// --- Authenticated Sidebar Navigation (Desktop) ---
interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export function Sidebar({ role }: { role: "customer" | "installer" | "admin" }) {
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClient();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const navItems: Record<typeof role, NavItem[]> = {
    customer: [
      { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/calculator", label: "Solar Sizer", icon: Calculator },
      { href: "/dashboard/quotes", label: "My Quotes", icon: FileSpreadsheet },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
    installer: [
      { href: "/installer-dashboard", label: "Dashboard", icon: LayoutDashboard },
      { href: "/installer/leads", label: "Geofenced Leads", icon: Calculator },
      { href: "/installer/quotes", label: "Submitted Bids", icon: FileSpreadsheet },
      { href: "/installer/profile", label: "KYC & Profile", icon: User },
    ],
    admin: [
      { href: "/admin/kyc", label: "KYC Verification", icon: ShieldCheck },
      { href: "/admin/users", label: "User Accounts", icon: Users },
      { href: "/admin/marketplace", label: "Marketplace", icon: Store },
    ],
  };

  const items = navItems[role] || [];

  return (
    <aside className="border-border bg-card hidden w-64 flex-col border-r md:flex print:hidden">
      <div className="border-border flex h-16 items-center border-b px-6">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-primary text-xl font-bold tracking-tight">
            Gridless <span className="text-secondary-foreground capitalize">{role}</span>
          </span>
        </Link>
      </div>

      <nav className="flex-1 space-y-1 p-4">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center space-x-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-all duration-100",
                isActive
                  ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              <Icon className="size-5 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="border-border border-t p-4">
        <button
          onClick={handleLogout}
          className="text-destructive hover:bg-destructive/10 flex w-full items-center space-x-3 rounded-lg px-4 py-2.5 text-sm font-medium transition-colors"
        >
          <LogOut className="size-5 shrink-0" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

// --- Authenticated Mobile Bottom Navigation Tab Bar ---
export function MobileTabBar({ role }: { role: "customer" | "installer" | "admin" }) {
  const pathname = usePathname();

  const tabItems: Record<typeof role, NavItem[]> = {
    customer: [
      { href: "/dashboard", label: "Home", icon: LayoutDashboard },
      { href: "/calculator", label: "Sizer", icon: Calculator },
      { href: "/dashboard/quotes", label: "Bids", icon: FileSpreadsheet },
      { href: "/dashboard/settings", label: "Settings", icon: Settings },
    ],
    installer: [
      { href: "/installer-dashboard", label: "Home", icon: LayoutDashboard },
      { href: "/installer/leads", label: "Leads", icon: Calculator },
      { href: "/installer/quotes", label: "Bids", icon: FileSpreadsheet },
      { href: "/installer/profile", label: "KYC", icon: User },
    ],
    admin: [
      { href: "/admin/kyc", label: "KYC", icon: ShieldCheck },
      { href: "/admin/users", label: "Users", icon: Users },
      { href: "/admin/marketplace", label: "Store", icon: Store },
    ],
  };

  const items = tabItems[role] || [];

  return (
    <nav className="border-border bg-card pb-safe fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-around border-t px-2 shadow-lg md:hidden print:hidden">
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = pathname === item.href;
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex h-full flex-1 flex-col items-center justify-center space-y-1 text-center transition-colors",
              isActive
                ? "text-primary font-semibold"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            <Icon className="size-5 shrink-0" />
            <span className="text-[10px] tracking-wide">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
