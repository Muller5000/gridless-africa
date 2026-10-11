"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Info, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface SolarBenchmarkTier {
  id: string;
  name: string;
  capacity: string;
  minCost: number;
  maxCost: number;
  typicalAppliances: string;
}

const BENCHMARK_TIERS: SolarBenchmarkTier[] = [
  {
    id: "3.5kva",
    name: "Starter Home",
    capacity: "3.5 kVA",
    minCost: 2400000,
    maxCost: 3100000,
    typicalAppliances: "TVs, Fridge, Fans, Lights & 1 Inverter AC",
  },
  {
    id: "5kva",
    name: "Standard Duplex",
    capacity: "5.0 kVA",
    minCost: 4000000,
    maxCost: 5200000,
    typicalAppliances: "2-3 ACs, Freezers, Water Pump & Full Home",
  },
  {
    id: "10kva",
    name: "Large Home / SME",
    capacity: "10.0 kVA",
    minCost: 7500000,
    maxCost: 9500000,
    typicalAppliances: "Multiple ACs, Commercial loads, Office Hubs",
  },
];

export function GeneratorRoiCalculator() {
  const [fuelType, setFuelType] = useState<"petrol" | "diesel">("petrol");
  const [monthlyFuelSpend, setMonthlyFuelSpend] = useState<number>(180000);
  const [selectedTierId, setSelectedTierId] = useState<string>("5kva");

  // Current Nigerian market pump prices (Q4 2024 - 2026 averages)
  const fuelPricePerLiter = fuelType === "petrol" ? 1150 : 1400;

  // Selected benchmark system
  const selectedTier = BENCHMARK_TIERS.find((t) => t.id === selectedTierId) || BENCHMARK_TIERS[1];

  // Calculations
  const annualFuelSpend = monthlyFuelSpend * 12;
  const estimatedMonthlyLiters = Math.round(monthlyFuelSpend / fuelPricePerLiter);
  const minPaybackMonths = Math.max(6, Math.round(selectedTier.minCost / monthlyFuelSpend));
  const maxPaybackMonths = Math.max(8, Math.round(selectedTier.maxCost / monthlyFuelSpend));

  return (
    <div className="border-border/80 bg-card w-full max-w-4xl rounded-3xl border p-6 shadow-xl sm:p-10">
      <div className="space-y-8">
        {/* Simple Controls Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-center">
          {/* Left Column: 2 Clear Inputs (Fuel Type + Spend) */}
          <div className="space-y-6 md:col-span-6">
            {/* 1. Fuel Type */}
            <div className="space-y-2">
              <label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                1. What fuel does your generator run on?
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFuelType("petrol")}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-3.5 text-center text-sm font-bold transition-all",
                    fuelType === "petrol"
                      ? "border-primary bg-primary/10 text-primary ring-primary/30 shadow-xs ring-1"
                      : "border-border bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                  )}
                >
                  <span>⛽ Petrol (PMS)</span>
                  <span className="text-muted-foreground block text-[11px] font-normal">
                    ~₦1,150 / Litre
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setFuelType("diesel")}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-3.5 text-center text-sm font-bold transition-all",
                    fuelType === "diesel"
                      ? "border-primary bg-primary/10 text-primary ring-primary/30 shadow-xs ring-1"
                      : "border-border bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                  )}
                >
                  <span>🛢️ Diesel (AGO)</span>
                  <span className="text-muted-foreground block text-[11px] font-normal">
                    ~₦1,400 / Litre
                  </span>
                </button>
              </div>
            </div>

            {/* 2. Monthly Generator Spend */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                  2. Monthly Spend on Generator Fuel
                </label>
                <span className="text-primary text-lg font-black">
                  ₦{monthlyFuelSpend.toLocaleString()}
                </span>
              </div>

              <input
                type="range"
                min="50000"
                max="600000"
                step="25000"
                value={monthlyFuelSpend}
                onChange={(e) => setMonthlyFuelSpend(Number(e.target.value))}
                className="accent-primary bg-muted h-2 w-full cursor-pointer rounded-lg"
              />

              {/* Quick preset chips */}
              <div className="flex flex-wrap gap-2">
                {[80000, 150000, 250000, 400000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setMonthlyFuelSpend(amt)}
                    className={cn(
                      "cursor-pointer rounded-xl border px-3 py-1.5 text-xs font-bold transition-all",
                      monthlyFuelSpend === amt
                        ? "border-primary bg-primary text-primary-foreground shadow-xs"
                        : "border-border bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                    )}
                  >
                    ₦{(amt / 1000).toFixed(0)}k/mo
                  </button>
                ))}
              </div>
              <p className="text-muted-foreground text-[11px]">
                That is ~{estimatedMonthlyLiters} Liters burned every month.
              </p>
            </div>

            {/* 3. System Size Comparison */}
            <div className="space-y-2">
              <label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                3. Select Solar System Capacity to Compare
              </label>
              <div className="grid grid-cols-3 gap-2">
                {BENCHMARK_TIERS.map((tier) => (
                  <button
                    key={tier.id}
                    type="button"
                    onClick={() => setSelectedTierId(tier.id)}
                    className={cn(
                      "cursor-pointer rounded-2xl border p-3 text-center transition-all",
                      selectedTierId === tier.id
                        ? "border-primary bg-primary/10 text-primary ring-primary/30 shadow-xs ring-1"
                        : "border-border bg-muted/20 text-muted-foreground hover:bg-muted/40 hover:text-foreground",
                    )}
                  >
                    <span className="block text-sm font-black">{tier.capacity}</span>
                    <span className="text-muted-foreground block text-[10px]">{tier.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Clean, Uncluttered Insight Card */}
          <div className="border-primary/20 bg-primary/5 space-y-5 rounded-3xl border p-6 md:col-span-6 md:p-8">
            <div className="border-primary/10 flex items-center justify-between border-b pb-4">
              <span className="text-primary inline-flex items-center gap-1.5 text-xs font-bold tracking-wider uppercase">
                <Zap className="size-3.5 fill-current" /> Payback Estimate
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400">
                <ShieldCheck className="size-3.5" /> Escrow Protected
              </span>
            </div>

            {/* Highlight Metric */}
            <div>
              <span className="text-muted-foreground text-xs font-bold">
                Estimated Break-Even Timeline:
              </span>
              <p className="text-foreground mt-1 text-3xl font-black sm:text-4xl">
                ~{minPaybackMonths} to {maxPaybackMonths} Months
              </p>
              <p className="text-muted-foreground mt-1 text-xs">
                After this period, your system has fully paid for itself.
              </p>
            </div>

            {/* Benchmark Price Range */}
            <div className="border-border bg-card space-y-1 rounded-2xl border p-4 shadow-xs">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground font-medium">
                  Rough Benchmark Cost ({selectedTier.capacity}):
                </span>
                <span className="text-foreground font-black">
                  ₦{(selectedTier.minCost / 1000000).toFixed(1)}M – ₦
                  {(selectedTier.maxCost / 1000000).toFixed(1)}M*
                </span>
              </div>
              <p className="text-muted-foreground text-[11px]">{selectedTier.typicalAppliances}</p>
            </div>

            {/* Annual Cash Lost on Generator */}
            <div className="border-primary/10 flex items-center justify-between border-t pt-3 text-xs">
              <span className="text-muted-foreground font-semibold">Annual Fuel Burn:</span>
              <span className="text-destructive font-black">
                ₦{annualFuelSpend.toLocaleString()} / year lost
              </span>
            </div>

            {/* Clear Disclaimer about Installer Variations */}
            <div className="bg-muted/40 text-muted-foreground flex items-start gap-2 rounded-2xl p-3 text-[11px] leading-relaxed">
              <Info className="text-primary mt-0.5 size-4 shrink-0" />
              <span>
                <strong>Note:</strong> Solar prices above are approximate market benchmarks. On
                Gridless, different verified installers submit tailored competitive bids so you can
                compare prices, warranties, and equipment options transparently.
              </span>
            </div>

            {/* Action CTA Button */}
            <Link
              href={`/calculator?tier=${selectedTier.id}&fuel=${monthlyFuelSpend}`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "w-full cursor-pointer gap-2 py-6 text-sm font-extrabold shadow-lg transition-transform hover:scale-[1.02]",
              )}
            >
              <span>Get Exact Quotes from Installers</span>
              <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
