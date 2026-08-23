"use client";

import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Shield, Star } from "lucide-react";
import { FlipCard } from "@/components/ui/flip-card";

export function InstallerShowcase() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {/* Installer Card 1 */}
      <FlipCard
        className="h-[350px] w-full"
        front={
          <div className="bg-card border-border group relative flex flex-col gap-4 overflow-hidden rounded-xl border p-6 shadow-sm transition-all hover:shadow-md">
            <div className="absolute top-0 right-0 p-3">
              <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-bold text-emerald-600">
                <Shield className="size-3" /> Verified
              </div>
            </div>
            <div>
              <h4 className="text-foreground group-hover:text-primary text-lg font-bold transition-colors">
                SunTech Energy Ltd
              </h4>
              <p className="text-muted-foreground text-xs">Lagos State • 8 Yrs Exp</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="fill-secondary text-secondary size-4" />
              <Star className="fill-secondary text-secondary size-4" />
              <Star className="fill-secondary text-secondary size-4" />
              <Star className="fill-secondary text-secondary size-4" />
              <Star className="fill-secondary text-secondary size-4" />
              <span className="text-foreground ml-1 text-xs font-semibold">5.0 (24 Reviews)</span>
            </div>
            <p className="text-muted-foreground border-border mt-2 border-t pt-4 text-xs italic">
              &quot;Outstanding installation. The escrow payment gave me complete peace of
              mind.&quot;
            </p>
          </div>
        }
        back={
          <div className="bg-card border-border flex h-full flex-col justify-between rounded-xl border p-6">
            <h4 className="text-foreground text-lg font-bold">SunTech Energy Ltd</h4>
            <p className="text-muted-foreground text-sm">
              Specializing in residential solar installations with 8 years experience.
            </p>
            <Link
              href="/installers/suntech"
              className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              View Profile
            </Link>
          </div>
        }
      />
      {/* Installer Card 2 */}
      <FlipCard
        className="h-[350px] w-full"
        front={
          <div className="bg-card border-border group relative flex flex-col gap-4 overflow-hidden rounded-xl border p-6 shadow-sm transition-all hover:shadow-md">
            <div className="absolute top-0 right-0 p-3">
              <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-bold text-emerald-600">
                <Shield className="size-3" /> Verified
              </div>
            </div>
            <div>
              <h4 className="text-foreground group-hover:text-primary text-lg font-bold transition-colors">
                EcoPower Solutions
              </h4>
              <p className="text-muted-foreground text-xs">Oyo State • 5 Yrs Exp</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="fill-secondary text-secondary size-4" />
              <Star className="fill-secondary text-secondary size-4" />
              <Star className="fill-secondary text-secondary size-4" />
              <Star className="fill-secondary text-secondary size-4" />
              <Star className="fill-muted text-muted size-4" />
              <span className="text-foreground ml-1 text-xs font-semibold">4.5 (18 Reviews)</span>
            </div>
            <p className="text-muted-foreground border-border mt-2 border-t pt-4 text-xs italic">
              &quot;Very professional engineering team. Showed up on time and cleaned up
              afterwards.&quot;
            </p>
          </div>
        }
        back={
          <div className="bg-card border-border flex h-full flex-col justify-between rounded-xl border p-6">
            <h4 className="text-foreground text-lg font-bold">EcoPower Solutions</h4>
            <p className="text-muted-foreground text-sm">
              Focused on cost‑effective commercial projects across Oyo.
            </p>
            <Link
              href="/installers/ecopower"
              className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              View Profile
            </Link>
          </div>
        }
      />
      {/* Installer Card 3 */}
      <FlipCard
        className="h-[350px] w-full"
        front={
          <div className="bg-card border-border group relative flex flex-col gap-4 overflow-hidden rounded-xl border p-6 shadow-sm transition-all hover:shadow-md">
            <div className="absolute top-0 right-3 p-3">
              <div className="flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-1 text-xs font-bold text-emerald-600">
                <Shield className="size-3" /> Verified
              </div>
            </div>
            <div>
              <h4 className="text-foreground group-hover:text-primary text-lg font-bold transition-colors">
                Lumina Solar NG
              </h4>
              <p className="text-muted-foreground text-xs">Lagos State • 12 Yrs Exp</p>
            </div>
            <div className="flex items-center gap-1">
              <Star className="fill-secondary text-secondary size-4" />
              <Star className="fill-secondary text-secondary size-4" />
              <Star className="fill-secondary text-secondary size-4" />
              <Star className="fill-secondary text-secondary size-4" />
              <Star className="fill-secondary text-secondary size-4" />
              <span className="text-foreground ml-1 text-xs font-semibold">4.9 (42 Reviews)</span>
            </div>
            <p className="text-muted-foreground border-border mt-2 border-t pt-4 text-xs italic">
              &quot;Top tier equipment. The Gridless Africa process made comparing their quote so
              easy.&quot;
            </p>
          </div>
        }
        back={
          <div className="bg-card border-border flex h-full flex-col justify-between rounded-xl border p-6">
            <h4 className="text-foreground text-lg font-bold">Lumina Solar NG</h4>
            <p className="text-muted-foreground text-sm">
              Leading provider of high‑efficiency panels and storage solutions.
            </p>
            <Link
              href="/installers/lumina"
              className={buttonVariants({ variant: "secondary", size: "sm" })}
            >
              View Profile
            </Link>
          </div>
        }
      />
    </div>
  );
}
