"use client";

import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { Shield, Star, MapPin } from "lucide-react";
import { FlipCard } from "@/components/ui/flip-card";

export function InstallerShowcase() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      {/* Installer Card 1 */}
      <FlipCard
        className="h-[380px] w-full"
        front={
          <div className="group relative flex h-full flex-col gap-5 overflow-hidden p-8">
            <div className="absolute top-0 right-0 p-4">
              <div className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
                <Shield className="size-3" /> CAC Verified
              </div>
            </div>

            <div className="mt-2 flex items-center gap-4">
              <div className="bg-primary/10 text-primary flex size-12 items-center justify-center rounded-2xl text-xl font-bold">
                AR
              </div>
              <div>
                <h4 className="text-foreground group-hover:text-primary text-xl font-extrabold transition-colors">
                  Arnergy Solar
                </h4>
                <p className="text-muted-foreground flex items-center gap-1 text-sm font-medium">
                  <MapPin className="size-3.5" /> Lagos State
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <Star className="fill-accent text-accent size-4" />
                <Star className="fill-accent text-accent size-4" />
                <Star className="fill-accent text-accent size-4" />
                <Star className="fill-accent text-accent size-4" />
                <Star className="fill-accent text-accent size-4" />
                <span className="text-foreground ml-2 text-sm font-bold">4.9</span>
              </div>
              <p className="text-muted-foreground text-xs font-medium">
                Based on 128 verified reviews
              </p>
            </div>

            <div className="border-border/50 mt-auto border-t pt-5">
              <p className="text-foreground/80 text-sm leading-relaxed italic">
                &quot;They finished our 5kVA setup in a single day. No more waking up to turn on the
                Mikano at 2AM.&quot;
              </p>
              <p className="text-muted-foreground mt-2 text-xs font-bold">— Chinedu O.</p>
            </div>
          </div>
        }
        back={
          <div className="flex h-full flex-col justify-between p-8">
            <div>
              <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-2xl text-xl font-bold">
                AR
              </div>
              <h4 className="text-foreground mb-2 text-2xl font-extrabold">Arnergy Solar</h4>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="bg-muted/50 text-foreground border-border/50 rounded-md border px-2 py-1 text-xs font-medium">
                  Tier 1 Panels
                </span>
                <span className="bg-muted/50 text-foreground border-border/50 rounded-md border px-2 py-1 text-xs font-medium">
                  Lithium Setup
                </span>
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Leading provider of reliable solar solutions across Lagos. Specializes in
                residential deployments with smart monitoring.
              </p>
            </div>
            <Link
              href="/installers/arnergy"
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className: "w-full font-bold shadow-md",
              })}
            >
              View Full Profile
            </Link>
          </div>
        }
      />

      {/* Installer Card 2 */}
      <FlipCard
        className="h-[380px] w-full"
        front={
          <div className="group relative flex h-full flex-col gap-5 overflow-hidden p-8">
            <div className="absolute top-0 right-0 p-4">
              <div className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
                <Shield className="size-3" /> CAC Verified
              </div>
            </div>

            <div className="mt-2 flex items-center gap-4">
              <div className="bg-secondary/20 text-secondary-foreground flex size-12 items-center justify-center rounded-2xl text-xl font-bold">
                DS
              </div>
              <div>
                <h4 className="text-foreground group-hover:text-primary text-xl font-extrabold transition-colors">
                  Daystar Power
                </h4>
                <p className="text-muted-foreground flex items-center gap-1 text-sm font-medium">
                  <MapPin className="size-3.5" /> Oyo & Lagos
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <Star className="fill-accent text-accent size-4" />
                <Star className="fill-accent text-accent size-4" />
                <Star className="fill-accent text-accent size-4" />
                <Star className="fill-accent text-accent size-4" />
                <Star className="fill-accent/30 text-accent/30 size-4" />
                <span className="text-foreground ml-2 text-sm font-bold">4.6</span>
              </div>
              <p className="text-muted-foreground text-xs font-medium">
                Based on 84 verified reviews
              </p>
            </div>

            <div className="border-border/50 mt-auto border-t pt-5">
              <p className="text-foreground/80 text-sm leading-relaxed italic">
                &quot;Very professional engineering team. Showed up on time and cleaned up
                everything completely afterwards.&quot;
              </p>
              <p className="text-muted-foreground mt-2 text-xs font-bold">— Bukola A.</p>
            </div>
          </div>
        }
        back={
          <div className="flex h-full flex-col justify-between p-8">
            <div>
              <div className="bg-secondary/20 text-secondary-foreground mb-4 flex size-12 items-center justify-center rounded-2xl text-xl font-bold">
                DS
              </div>
              <h4 className="text-foreground mb-2 text-2xl font-extrabold">Daystar Power</h4>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="bg-muted/50 text-foreground border-border/50 rounded-md border px-2 py-1 text-xs font-medium">
                  SME Focus
                </span>
                <span className="bg-muted/50 text-foreground border-border/50 rounded-md border px-2 py-1 text-xs font-medium">
                  O&M Included
                </span>
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Focused on cost-effective commercial and large-scale residential projects across Oyo
                and Lagos states.
              </p>
            </div>
            <Link
              href="/installers/daystar"
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className: "w-full font-bold shadow-md",
              })}
            >
              View Full Profile
            </Link>
          </div>
        }
      />

      {/* Installer Card 3 */}
      <FlipCard
        className="h-[380px] w-full"
        front={
          <div className="group relative flex h-full flex-col gap-5 overflow-hidden p-8">
            <div className="absolute top-0 right-0 p-4">
              <div className="flex items-center gap-1 rounded-full bg-emerald-500/15 px-3 py-1 text-[10px] font-bold tracking-wider text-emerald-700 uppercase">
                <Shield className="size-3" /> CAC Verified
              </div>
            </div>

            <div className="mt-2 flex items-center gap-4">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-500/10 text-xl font-bold text-blue-600">
                HS
              </div>
              <div>
                <h4 className="text-foreground group-hover:text-primary text-xl font-extrabold transition-colors">
                  Havenhill Synergy
                </h4>
                <p className="text-muted-foreground flex items-center gap-1 text-sm font-medium">
                  <MapPin className="size-3.5" /> Abuja (FCT)
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-1">
                <Star className="fill-accent text-accent size-4" />
                <Star className="fill-accent text-accent size-4" />
                <Star className="fill-accent text-accent size-4" />
                <Star className="fill-accent text-accent size-4" />
                <Star className="fill-accent text-accent size-4" />
                <span className="text-foreground ml-2 text-sm font-bold">5.0</span>
              </div>
              <p className="text-muted-foreground text-xs font-medium">
                Based on 210 verified reviews
              </p>
            </div>

            <div className="border-border/50 mt-auto border-t pt-5">
              <p className="text-foreground/80 text-sm leading-relaxed italic">
                &quot;The escrow payment through Gridless gave me complete peace of mind. Excellent
                workmanship.&quot;
              </p>
              <p className="text-muted-foreground mt-2 text-xs font-bold">— Ibrahim M.</p>
            </div>
          </div>
        }
        back={
          <div className="flex h-full flex-col justify-between p-8">
            <div>
              <div className="mb-4 flex size-12 items-center justify-center rounded-2xl bg-blue-500/10 text-xl font-bold text-blue-600">
                HS
              </div>
              <h4 className="text-foreground mb-2 text-2xl font-extrabold">Havenhill Synergy</h4>
              <div className="mb-4 flex flex-wrap gap-2">
                <span className="bg-muted/50 text-foreground border-border/50 rounded-md border px-2 py-1 text-xs font-medium">
                  Grid-Tied
                </span>
                <span className="bg-muted/50 text-foreground border-border/50 rounded-md border px-2 py-1 text-xs font-medium">
                  10-Year Warranty
                </span>
              </div>
              <p className="text-foreground/80 text-sm leading-relaxed">
                Award-winning engineering firm deploying high-efficiency panels and scalable storage
                solutions in the FCT.
              </p>
            </div>
            <Link
              href="/installers/havenhill"
              className={buttonVariants({
                variant: "default",
                size: "lg",
                className: "w-full font-bold shadow-md",
              })}
            >
              View Full Profile
            </Link>
          </div>
        }
      />
    </div>
  );
}
