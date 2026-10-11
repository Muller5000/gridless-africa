"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Flame, ArrowRight, VolumeX, Leaf, ShieldCheck, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface SolarTier {
  id: string;
  name: string;
  capacity: string;
  cost: number;
  description: string;
  specs: string;
}

const SOLAR_TIERS: SolarTier[] = [
  {
    id: "3.5kva",
    name: "Starter Home",
    capacity: "3.5 kVA",
    cost: 2850000,
    description: "Powers TV, Fridge, Fans, Lighting & 1 Inverter AC",
    specs: "3.5kVA Hybrid + 5kWh LiFePO4 + 4 Panels",
  },
  {
    id: "5kva",
    name: "Standard Duplex",
    capacity: "5.0 kVA",
    cost: 4650000,
    description: "Powers 2 ACs, Freezers, Pump, Full Home Lighting",
    specs: "5.0kVA Hybrid + 10kWh LiFePO4 + 8 Panels",
  },
  {
    id: "10kva",
    name: "Executive / SME",
    capacity: "10.0 kVA",
    cost: 8400000,
    description: "Powers Multiple ACs, Commercial Equipment, Cold Rooms",
    specs: "10kVA Hybrid + 15kWh LiFePO4 + 16 Panels",
  },
];

export function GeneratorRoiCalculator() {
  // Input mode: 'liters' or 'hours'
  const [inputMode, setInputMode] = useState<"liters" | "hours">("liters");
  const [litersPerWeek, setLitersPerWeek] = useState<number>(60);
  const [dailyGenHours, setDailyGenHours] = useState<number>(8);
  const [fuelType, setFuelType] = useState<"petrol" | "diesel">("petrol");
  const [selectedTierId, setSelectedTierId] = useState<string>("5kva");

  // Fuel pricing (Current Nigerian market averages)
  const fuelPricePerLiter = fuelType === "petrol" ? 980 : 1350;

  // Calculate actual liters based on mode
  // A typical 3.5kVA-7.5kVA petrol generator consumes ~1.3L per hour under load
  // A 10kVA-15kVA diesel generator consumes ~2.2L per hour
  const calculatedWeeklyLiters =
    inputMode === "liters"
      ? litersPerWeek
      : Math.round(dailyGenHours * 7 * (fuelType === "diesel" ? 2.0 : 1.3));

  const weeklyCost = calculatedWeeklyLiters * fuelPricePerLiter;
  const monthlyCost = weeklyCost * 4.33;
  const annualCost = monthlyCost * 12;

  // Selected Solar Setup
  const selectedTier = SOLAR_TIERS.find((t) => t.id === selectedTierId) || SOLAR_TIERS[1];
  const solarCost = selectedTier.cost;

  // Payback period
  const paybackMonths = monthlyCost > 0 ? solarCost / monthlyCost : 0;
  const paybackYears = paybackMonths / 12;

  // 5-Year comparative financials
  // Generator 5-year cost includes fuel + estimated 10% maintenance/servicing
  const fiveYearGenFuel = annualCost * 5;
  const fiveYearGenMaintenance = annualCost * 0.12 * 5;
  const fiveYearTotalGenSpend = fiveYearGenFuel + fiveYearGenMaintenance;
  const netFiveYearSavings = Math.max(0, fiveYearTotalGenSpend - solarCost);

  // Environmental and noise impact
  const annualGenHours =
    inputMode === "hours" ? dailyGenHours * 365 : Math.round((calculatedWeeklyLiters / 1.4) * 52);
  const annualCo2Tons = ((calculatedWeeklyLiters * 52 * 2.3) / 1000).toFixed(1);

  return (
    <div className="border-border/80 bg-card/70 mx-auto w-full max-w-5xl space-y-8 rounded-3xl border p-6 shadow-2xl backdrop-blur-xl sm:p-10">
      {/* Header */}
      <div className="border-border/60 flex flex-col gap-4 border-b pb-6 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="bg-destructive/10 text-destructive inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-bold">
            <Flame className="size-3.5 fill-current" /> Fuel Bleed Visualizer
          </div>
          <h3 className="text-foreground mt-2 text-2xl font-black sm:text-3xl">
            Generator vs. Solar Investment Engine
          </h3>
          <p className="text-muted-foreground mt-1 text-sm">
            Calculate your exact break-even timeline and real 5-year cash savings in Nigeria.
          </p>
        </div>

        {/* Quick Fuel Type Toggle */}
        <div className="border-border/80 bg-muted/30 flex items-center gap-2 rounded-2xl border p-1.5">
          <button
            type="button"
            onClick={() => setFuelType("petrol")}
            className={cn(
              "cursor-pointer rounded-xl px-4 py-2 text-xs font-bold transition-all",
              fuelType === "petrol"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            ⛽ Petrol (PMS ~₦980/L)
          </button>
          <button
            type="button"
            onClick={() => setFuelType("diesel")}
            className={cn(
              "cursor-pointer rounded-xl px-4 py-2 text-xs font-bold transition-all",
              fuelType === "diesel"
                ? "bg-card text-foreground shadow-sm"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            🛢️ Diesel (AGO ~₦1,350/L)
          </button>
        </div>
      </div>

      {/* Main Interactive Grid */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Interactive Inputs (5 Cols) */}
        <div className="space-y-6 lg:col-span-5">
          {/* Mode Switcher */}
          <div className="bg-muted/40 flex rounded-xl p-1 text-xs font-bold">
            <button
              type="button"
              onClick={() => setInputMode("liters")}
              className={cn(
                "flex-1 cursor-pointer rounded-lg py-2 transition-all",
                inputMode === "liters"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Enter Liters / Week
            </button>
            <button
              type="button"
              onClick={() => setInputMode("hours")}
              className={cn(
                "flex-1 cursor-pointer rounded-lg py-2 transition-all",
                inputMode === "hours"
                  ? "bg-card text-foreground shadow-xs"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              Enter Daily Run Hours
            </button>
          </div>

          {/* Slider: Liters or Hours */}
          {inputMode === "liters" ? (
            <div className="border-border bg-muted/20 space-y-3 rounded-2xl border p-5">
              <div className="flex items-center justify-between">
                <span className="text-foreground text-xs font-bold">
                  Generator Fuel Consumption
                </span>
                <span className="text-primary text-base font-black">
                  {litersPerWeek} Liters / Week
                </span>
              </div>
              <input
                type="range"
                min="10"
                max="250"
                step="5"
                value={litersPerWeek}
                onChange={(e) => setLitersPerWeek(Number(e.target.value))}
                className="accent-primary bg-muted h-2 w-full cursor-pointer rounded-lg"
              />
              <div className="text-muted-foreground flex justify-between text-[11px] font-semibold">
                <span>10L (1 Jerrycan)</span>
                <span>70L (Average Home)</span>
                <span>250L (Estate / SME)</span>
              </div>
            </div>
          ) : (
            <div className="border-border bg-muted/20 space-y-3 rounded-2xl border p-5">
              <div className="flex items-center justify-between">
                <span className="text-foreground text-xs font-bold">Generator Run Time Daily</span>
                <span className="text-primary text-base font-black">
                  {dailyGenHours} Hours / Day
                </span>
              </div>
              <input
                type="range"
                min="2"
                max="24"
                step="1"
                value={dailyGenHours}
                onChange={(e) => setDailyGenHours(Number(e.target.value))}
                className="accent-primary bg-muted h-2 w-full cursor-pointer rounded-lg"
              />
              <div className="text-muted-foreground flex justify-between text-[11px] font-semibold">
                <span>2 hrs (Evening only)</span>
                <span>8 hrs (Work/Night)</span>
                <span>24 hrs (Full Off-Grid)</span>
              </div>
              <p className="text-muted-foreground text-[11px] italic">
                ~Est. {calculatedWeeklyLiters} Liters/week at typical generator burn rate.
              </p>
            </div>
          )}

          {/* Target Solar System Selection */}
          <div className="space-y-2">
            <label className="text-foreground text-xs font-bold">
              Compare Against Solar System Tier
            </label>
            <div className="space-y-2">
              {SOLAR_TIERS.map((tier) => (
                <button
                  key={tier.id}
                  type="button"
                  onClick={() => setSelectedTierId(tier.id)}
                  className={cn(
                    "flex w-full cursor-pointer items-center justify-between rounded-2xl border p-4 text-left transition-all",
                    selectedTierId === tier.id
                      ? "border-primary bg-primary/10 ring-primary/30 shadow-xs ring-1"
                      : "border-border bg-card/60 hover:bg-muted/30",
                  )}
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-foreground text-sm font-extrabold">{tier.name}</span>
                      <span className="bg-primary/15 text-primary rounded-md px-2 py-0.5 text-[10px] font-bold">
                        {tier.capacity}
                      </span>
                    </div>
                    <p className="text-muted-foreground mt-0.5 text-[11px]">{tier.description}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-foreground text-sm font-black">
                      ₦{(tier.cost / 1000000).toFixed(2)}M
                    </span>
                    <span className="text-muted-foreground block text-[10px]">Turnkey Setup</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Visual ROI Dashboard (7 Cols) */}
        <div className="space-y-6 lg:col-span-7">
          {/* Top Metric Highlight Box */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Cash Burned on Fuel */}
            <div className="border-destructive/20 bg-destructive/5 rounded-2xl border p-5">
              <span className="text-destructive text-[11px] font-bold tracking-wider uppercase">
                Your Current Fuel Drain
              </span>
              <p className="text-destructive mt-1 text-2xl font-black sm:text-3xl">
                ₦{monthlyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                <span className="text-muted-foreground text-xs font-semibold"> / month</span>
              </p>
              <div className="border-destructive/10 text-foreground/80 mt-2 border-t pt-2 text-xs font-semibold">
                ₦{annualCost.toLocaleString(undefined, { maximumFractionDigits: 0 })} wasted every
                year
              </div>
            </div>

            {/* Break-Even Speed */}
            <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
              <span className="text-[11px] font-bold tracking-wider text-emerald-600 uppercase dark:text-emerald-400">
                Solar Payback Timeline
              </span>
              <p className="mt-1 text-2xl font-black text-emerald-600 sm:text-3xl dark:text-emerald-400">
                {paybackMonths > 0 ? paybackMonths.toFixed(1) : "0"}{" "}
                <span className="text-sm font-bold">Months</span>
              </p>
              <div className="text-foreground/80 mt-2 border-t border-emerald-500/10 pt-2 text-xs font-semibold">
                Breaks even in ~{paybackYears > 0 ? paybackYears.toFixed(1) : "0"} years
              </div>
            </div>
          </div>

          {/* 5-Year Cumulative Comparison Card */}
          <div className="border-border bg-muted/15 space-y-4 rounded-3xl border p-6">
            <div className="flex items-center justify-between">
              <span className="text-foreground text-xs font-bold tracking-wider uppercase">
                5-Year Total Financial Projection
              </span>
              <span className="bg-primary/10 text-primary inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[11px] font-bold">
                <Sparkles className="size-3" /> ROI Benchmark
              </span>
            </div>

            <div className="space-y-3">
              {/* Generator Bar */}
              <div>
                <div className="mb-1 flex justify-between text-xs font-semibold">
                  <span className="text-destructive font-bold">
                    🚨 5 Years of Generator Running
                  </span>
                  <span className="text-foreground font-extrabold">
                    ₦{fiveYearTotalGenSpend.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="bg-muted h-3 w-full overflow-hidden rounded-full">
                  <div className="bg-destructive/80 h-full w-full rounded-full" />
                </div>
                <span className="text-muted-foreground mt-0.5 block text-[10px]">
                  Includes ₦
                  {fiveYearGenFuel.toLocaleString(undefined, { maximumFractionDigits: 0 })} fuel + ₦
                  {fiveYearGenMaintenance.toLocaleString(undefined, { maximumFractionDigits: 0 })}{" "}
                  servicing & oil
                </span>
              </div>

              {/* Solar Bar */}
              <div>
                <div className="mb-1 flex justify-between text-xs font-semibold">
                  <span className="text-primary font-bold">
                    ☀️ 5 Years with {selectedTier.capacity} Solar
                  </span>
                  <span className="text-primary font-extrabold">₦{solarCost.toLocaleString()}</span>
                </div>
                <div className="bg-muted h-3 w-full overflow-hidden rounded-full">
                  <div
                    className="bg-primary h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${Math.min(100, Math.max(15, (solarCost / fiveYearTotalGenSpend) * 100))}%`,
                    }}
                  />
                </div>
                <span className="text-muted-foreground mt-0.5 block text-[10px]">
                  One-time turnkey installation • ₦0 monthly fuel • 10-Yr warranty
                </span>
              </div>
            </div>

            {/* Net Savings Callout */}
            <div className="bg-primary/10 border-primary/20 mt-4 flex items-center justify-between rounded-2xl border p-4">
              <div>
                <span className="text-primary text-[11px] font-bold tracking-wider uppercase">
                  Net 5-Year Pocket Savings
                </span>
                <p className="text-foreground text-xl font-black sm:text-2xl">
                  +₦{netFiveYearSavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div className="text-right">
                <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                  Effective Power Cost:
                </span>
                <p className="text-foreground text-sm font-extrabold">100% FREE after payback</p>
              </div>
            </div>
          </div>

          {/* Quality of Life Impact Strip */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="border-border bg-card rounded-2xl border p-3 shadow-xs">
              <VolumeX className="text-primary mx-auto mb-1 size-5" />
              <span className="text-muted-foreground text-[10px] font-bold uppercase">
                Noise Silence
              </span>
              <p className="text-foreground mt-0.5 text-xs font-extrabold">
                {annualGenHours.toLocaleString()} Hrs/Yr
              </p>
            </div>
            <div className="border-border bg-card rounded-2xl border p-3 shadow-xs">
              <Leaf className="mx-auto mb-1 size-5 text-emerald-600" />
              <span className="text-muted-foreground text-[10px] font-bold uppercase">CO2 Cut</span>
              <p className="text-foreground mt-0.5 text-xs font-extrabold">
                {annualCo2Tons} Tons/Yr
              </p>
            </div>
            <div className="border-border bg-card rounded-2xl border p-3 shadow-xs">
              <ShieldCheck className="mx-auto mb-1 size-5 text-amber-500" />
              <span className="text-muted-foreground text-[10px] font-bold uppercase">
                Escrow Safety
              </span>
              <p className="text-foreground mt-0.5 text-xs font-extrabold">100% Covered</p>
            </div>
          </div>

          {/* Direct Matching Action CTA */}
          <Link
            href={`/calculator?tier=${selectedTier.id}&fuel=${monthlyCost}`}
            className={cn(
              buttonVariants({ size: "lg" }),
              "w-full cursor-pointer gap-2 py-6 text-base font-extrabold shadow-xl transition-transform hover:scale-[1.01]",
            )}
          >
            <span>Lock in this {selectedTier.capacity} Solar Blueprint</span>
            <ArrowRight className="size-5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
