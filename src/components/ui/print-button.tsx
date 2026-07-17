"use client";

import React from "react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Printer } from "lucide-react";

export default function PrintButton() {
  return (
    <button
      onClick={() => window.print()}
      className={cn(buttonVariants({ size: "sm" }), "cursor-pointer gap-2 print:hidden")}
    >
      <Printer className="size-4" /> Trigger Browser Print
    </button>
  );
}
