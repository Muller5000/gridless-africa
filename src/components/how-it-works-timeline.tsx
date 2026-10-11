"use client";

import React, { useState } from "react";
import {
  Calculator,
  ShieldCheck,
  Check,
  Lock,
  Clock,
  ArrowRight,
  Layers,
  Sparkles,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Appliance {
  id: string;
  name: string;
  icon: string;
  watts: number;
}

const APPLIANCES: Appliance[] = [
  { id: "ac", name: "1.5HP Inverter AC", icon: "❄️", watts: 1200 },
  { id: "fridge", name: "Inverter Fridge", icon: "🧊", watts: 300 },
  { id: "work", name: "Workstation & Starlink", icon: "💻", watts: 250 },
  { id: "pump", name: "1HP Water Pump", icon: "💧", watts: 750 },
];

export function HowItWorksTimeline() {
  // Interactive appliance selection for Step 1
  const [selectedAppliances, setSelectedAppliances] = useState<string[]>(["ac", "fridge", "work"]);

  const toggleAppliance = (id: string) => {
    setSelectedAppliances((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const totalWatts = selectedAppliances.reduce((sum, id) => {
    const item = APPLIANCES.find((a) => a.id === id);
    return sum + (item?.watts || 0);
  }, 0);

  // Dynamic system spec estimate based on watts
  const getSystemSpec = () => {
    if (totalWatts <= 600) {
      return { kva: "2.5kVA", battery: "5kWh LiFePO4", panels: "4x 550W" };
    } else if (totalWatts <= 1800) {
      return { kva: "5kVA", battery: "10kWh LiFePO4", panels: "8x 550W" };
    } else {
      return { kva: "7.5kVA – 10kVA", battery: "15kWh LiFePO4", panels: "12x 550W" };
    }
  };

  const currentSpec = getSystemSpec();

  return (
    <section className="container mx-auto max-w-6xl space-y-16 px-4 py-20 md:py-28">
      {/* Section Header */}
      <div className="space-y-4 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold tracking-wider text-emerald-700 uppercase dark:text-emerald-400">
          <Sparkles className="size-3.5" />
          <span>The Gridless Journey</span>
        </div>
        <h2 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
          How Gridless Africa Works
        </h2>
        <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
          We eliminate cowboy contractors, standardize quality, and protect 100% of your funds with
          milestone escrow from start to finish.
        </p>
      </div>

      {/* Connected 3-Step Journey Timeline Grid */}
      <div className="relative">
        {/* Desktop Connecting Line behind step badges */}
        <div
          className="absolute top-12 right-[16%] left-[16%] -z-10 hidden h-0.5 bg-gradient-to-r from-emerald-500/20 via-emerald-500 to-emerald-500/20 md:block"
          aria-hidden="true"
        />

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* STEP 1: Smart Load Sizing */}
          <div className="group border-border bg-card relative flex flex-col justify-between rounded-3xl border p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-xl">
            <div className="space-y-5">
              {/* Step indicator header */}
              <div className="flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 shadow-xs dark:text-emerald-400">
                  <Calculator className="size-6" />
                </div>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 font-mono text-xs font-black text-emerald-700 dark:text-emerald-400">
                  STEP 01
                </span>
              </div>

              <div>
                <h3 className="text-foreground text-2xl font-bold tracking-tight">
                  1. Size your exact load
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  Select your appliances. Our smart algorithm calculates your exact inverter,
                  battery, and panel requirements so you never overpay for oversized hardware.
                </p>
              </div>

              {/* Interactive Mini Appliance Picker Mockup */}
              <div className="border-border/70 bg-muted/30 space-y-3 rounded-2xl border p-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Interactive Sizer Preview</span>
                  <span className="font-mono text-emerald-600 dark:text-emerald-400">
                    {totalWatts}W Peak Load
                  </span>
                </div>

                {/* Appliance toggle chips */}
                <div className="grid grid-cols-2 gap-2">
                  {APPLIANCES.map((appliance) => {
                    const isSelected = selectedAppliances.includes(appliance.id);
                    return (
                      <button
                        key={appliance.id}
                        type="button"
                        onClick={() => toggleAppliance(appliance.id)}
                        className={cn(
                          "flex cursor-pointer items-center justify-between rounded-xl px-2.5 py-2 text-left text-xs font-semibold transition-all",
                          isSelected
                            ? "text-foreground border border-emerald-500/40 bg-emerald-500/15 shadow-xs"
                            : "bg-background/80 text-muted-foreground hover:bg-muted border border-transparent",
                        )}
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <span>{appliance.icon}</span>
                          <span className="truncate">{appliance.name}</span>
                        </span>
                        {isSelected && (
                          <Check className="size-3 shrink-0 text-emerald-600 dark:text-emerald-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Live Recommended Spec Output */}
                <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2.5 text-center">
                  <span className="block text-[11px] font-bold text-emerald-700 uppercase dark:text-emerald-300">
                    Calculated Setup
                  </span>
                  <p className="text-foreground mt-0.5 text-xs font-black">
                    {currentSpec.kva} Hybrid • {currentSpec.battery}
                  </p>
                  <p className="text-muted-foreground text-[10px]">{currentSpec.panels}</p>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/calculator"
                className="text-primary inline-flex items-center gap-1.5 text-xs font-bold transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <span>Launch Full Sizer Calculator</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* STEP 2: Standardized Competitive Quotes */}
          <div className="group border-border bg-card relative flex flex-col justify-between rounded-3xl border p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-xl">
            <div className="space-y-5">
              {/* Step indicator header */}
              <div className="flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-600 shadow-xs dark:text-amber-400">
                  <Layers className="size-6" />
                </div>
                <span className="rounded-full border border-amber-500/20 bg-amber-500/5 px-3 py-1 font-mono text-xs font-black text-amber-700 dark:text-amber-400">
                  STEP 02
                </span>
              </div>

              <div>
                <h3 className="text-foreground text-2xl font-bold tracking-tight">
                  2. Compare standardized bids
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  Your requirements are broadcasted strictly to CAC-registered, COREN-vetted
                  installers in your State. Compare up to 3 standardized proposals side-by-side.
                </p>
              </div>

              {/* Standardized Bids Comparison Preview Mockup */}
              <div className="border-border/70 bg-muted/30 space-y-2.5 rounded-2xl border p-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Standardized Bids</span>
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <Clock className="size-3" />
                    <span>&lt; 48 Hrs Turnaround</span>
                  </span>
                </div>

                {/* Bid Card 1 */}
                <div className="border-border/60 bg-background flex items-center justify-between rounded-xl border p-2.5 shadow-xs">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-foreground text-xs font-bold">Arnergy Solar</span>
                      <span className="rounded-md bg-emerald-500/15 px-1.5 py-0.5 text-[9px] font-extrabold text-emerald-700 dark:text-emerald-400">
                        Top Rated
                      </span>
                    </div>
                    <span className="text-muted-foreground text-[10px]">
                      Tier-1 Jinko • Deye 5kW
                    </span>
                  </div>
                  <span className="text-foreground text-xs font-black">₦5.9M</span>
                </div>

                {/* Bid Card 2 */}
                <div className="border-border/60 bg-background flex items-center justify-between rounded-xl border p-2.5 shadow-xs">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-foreground text-xs font-bold">Daystar Power</span>
                      <span className="rounded-md bg-amber-500/15 px-1.5 py-0.5 text-[9px] font-extrabold text-amber-700 dark:text-amber-400">
                        Best Value
                      </span>
                    </div>
                    <span className="text-muted-foreground text-[10px]">
                      Canadian Solar • Growatt
                    </span>
                  </div>
                  <span className="text-foreground text-xs font-black">₦5.6M</span>
                </div>

                {/* Bid Card 3 */}
                <div className="border-border/60 bg-background flex items-center justify-between rounded-xl border p-2.5 opacity-80 shadow-xs">
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-foreground text-xs font-bold">Havenhill Synergy</span>
                      <span className="bg-muted text-muted-foreground rounded-md px-1.5 py-0.5 text-[9px] font-bold">
                        10-Yr Warranty
                      </span>
                    </div>
                    <span className="text-muted-foreground text-[10px]">LONGi Hi-MO • BYD Box</span>
                  </div>
                  <span className="text-foreground text-xs font-black">₦6.1M</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="#installers"
                className="text-primary inline-flex items-center gap-1.5 text-xs font-bold transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <span>Browse Vetted Regional Engineers</span>
                <ArrowRight className="size-3.5" />
              </Link>
            </div>
          </div>

          {/* STEP 3: Paystack Escrow Protection */}
          <div className="group border-border bg-card relative flex flex-col justify-between rounded-3xl border p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500/50 hover:shadow-xl">
            <div className="space-y-5">
              {/* Step indicator header */}
              <div className="flex items-center justify-between">
                <div className="flex size-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-600 shadow-xs dark:text-emerald-400">
                  <ShieldCheck className="size-6" />
                </div>
                <span className="rounded-full border border-emerald-500/20 bg-emerald-500/5 px-3 py-1 font-mono text-xs font-black text-emerald-700 dark:text-emerald-400">
                  STEP 03
                </span>
              </div>

              <div>
                <h3 className="text-foreground text-2xl font-bold tracking-tight">
                  3. Pay safely in escrow
                </h3>
                <p className="text-muted-foreground mt-2 text-sm leading-relaxed">
                  Your funds stay locked in an automated Paystack escrow account. The installer only
                  receives milestone disbursements when you personally inspect and sign off on each
                  phase.
                </p>
              </div>

              {/* Escrow Milestone Pipeline Mockup */}
              <div className="border-border/70 bg-muted/30 space-y-3 rounded-2xl border p-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                  <span>Paystack Escrow Releases</span>
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                    <Lock className="size-3" />
                    <span>100% Protected</span>
                  </span>
                </div>

                <div className="space-y-2">
                  {/* Milestone 1 */}
                  <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2 text-xs font-semibold">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-black text-slate-950">
                      50%
                    </div>
                    <div className="flex-1 truncate">
                      <span className="text-foreground block truncate text-xs font-bold">
                        Phase 1: Hardware on Site
                      </span>
                      <span className="text-muted-foreground block text-[10px]">
                        Panels & battery serials verified
                      </span>
                    </div>
                    <Check className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  </div>

                  {/* Milestone 2 */}
                  <div className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-2 text-xs font-semibold">
                    <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-black text-slate-950">
                      40%
                    </div>
                    <div className="flex-1 truncate">
                      <span className="text-foreground block truncate text-xs font-bold">
                        Phase 2: Installation Live
                      </span>
                      <span className="text-muted-foreground block text-[10px]">
                        Load testing & earthing pass
                      </span>
                    </div>
                    <Check className="size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
                  </div>

                  {/* Milestone 3 */}
                  <div className="border-border/60 bg-background flex items-center gap-3 rounded-xl border p-2 text-xs font-semibold">
                    <div className="bg-muted text-muted-foreground flex size-6 shrink-0 items-center justify-center rounded-full text-[10px] font-black">
                      10%
                    </div>
                    <div className="flex-1 truncate">
                      <span className="text-foreground block truncate text-xs font-bold">
                        Phase 3: 7-Day Sign-off
                      </span>
                      <span className="text-muted-foreground block text-[10px]">
                        Final release after zero faults
                      </span>
                    </div>
                    <Lock className="text-muted-foreground size-3.5 shrink-0" />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <span className="text-muted-foreground inline-flex items-center gap-1.5 text-xs font-semibold">
                <ShieldCheck className="size-4 text-emerald-600 dark:text-emerald-400" />
                <span>Zero advance payments to unknown contractors</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
