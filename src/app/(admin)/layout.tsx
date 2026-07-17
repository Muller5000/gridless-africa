import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Sidebar, MobileTabBar } from "@/components/navigation";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="bg-muted/20 flex min-h-screen pb-16 md:pb-0">
      <Sidebar role="admin" />

      <div className="flex flex-1 flex-col">
        {/* Top Header */}
        <header className="border-border bg-card flex h-16 items-center justify-between border-b px-6">
          <span className="text-muted-foreground text-sm font-semibold">Admin Command Console</span>
        </header>

        {/* Content View */}
        <main className="animate-in fade-in flex-1 p-6 duration-200 md:p-8">{children}</main>
      </div>

      <MobileTabBar role="admin" />
    </div>
  );
}
