"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { buttonVariants } from "@/components/ui/button";
import { LogOut, Loader2 } from "lucide-react";
import { useUserStore } from "@/stores/user-store";
import { cn } from "@/lib/utils";

export default function SignOutButton() {
  const router = useRouter();
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const clearUser = useUserStore((state) => state.clearUser);

  const handleSignOut = async () => {
    setLoading(true);
    await supabase.auth.signOut();
    clearUser();
    router.push("/login");
    router.refresh();
  };

  return (
    <button
      onClick={handleSignOut}
      disabled={loading}
      className={cn(buttonVariants({ variant: "destructive" }), "cursor-pointer")}
    >
      {loading ? <Loader2 className="mr-2 size-4 animate-spin" /> : <LogOut className="mr-2 size-4" />}
      Sign Out
    </button>
  );
}
