import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Card } from "@/components/ui/card";
import SignOutButton from "./sign-out-button";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-foreground text-2xl font-extrabold tracking-tight md:text-3xl">Profile Settings</h1>
        <p className="text-muted-foreground text-sm">Manage your account settings and preferences.</p>
      </div>

      <Card className="border-border bg-card max-w-2xl border p-6 shadow-sm">
        <div className="space-y-6">
          <div>
            <h3 className="text-foreground text-lg font-medium">Account Information</h3>
            <div className="mt-4 space-y-4">
              <div className="flex flex-col space-y-1">
                <span className="text-muted-foreground text-sm font-medium">Full Name</span>
                <span className="text-foreground">{user.user_metadata?.full_name || "N/A"}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-muted-foreground text-sm font-medium">Email Address</span>
                <span className="text-foreground">{user.email}</span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-muted-foreground text-sm font-medium">Role</span>
                <span className="text-foreground capitalize">{user.user_metadata?.role || "Customer"}</span>
              </div>
            </div>
          </div>

          <div className="border-border pt-6 border-t">
            <h3 className="text-foreground text-lg font-medium text-destructive mb-4">Danger Zone</h3>
            <SignOutButton />
          </div>
        </div>
      </Card>
    </div>
  );
}
