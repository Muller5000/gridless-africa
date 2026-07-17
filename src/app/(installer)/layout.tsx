import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar, MobileTabBar } from "@/components/navigation";

export default async function InstallerLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="bg-muted/20 flex min-h-screen pb-16 md:pb-0">
      <Sidebar role="installer" />

      <div className="flex flex-1 flex-col">
        {/* Top Header */}
        <header className="border-border bg-card flex h-16 items-center justify-between border-b px-6">
          <div className="flex items-center space-x-3">
            <span className="text-muted-foreground text-sm font-semibold">
              Installer Command Panel
            </span>
            <span className="inline-flex items-center rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-semibold text-amber-500">
              KYC Verification Required
            </span>
          </div>
        </header>

        {/* Content View */}
        <main className="animate-in fade-in flex-1 p-6 duration-200 md:p-8">{children}</main>
      </div>

      <MobileTabBar role="installer" />
    </div>
  );
}
