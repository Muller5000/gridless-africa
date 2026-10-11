"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroQuickQuote() {
  const [selectedState, setSelectedState] = useState("Lagos");
  const [propertyType, setPropertyType] = useState<"residential" | "commercial">("residential");
  const [fuelSpend, setFuelSpend] = useState<number>(150000);

  // Quick estimation logic
  const estimatedKva =
    propertyType === "commercial"
      ? fuelSpend >= 350000
        ? "10.0"
        : "7.5"
      : fuelSpend >= 250000
        ? "5.0"
        : fuelSpend >= 120000
          ? "3.5"
          : "2.5";

  const estimatedBattery =
    propertyType === "commercial"
      ? fuelSpend >= 350000
        ? "15.0"
        : "10.0"
      : fuelSpend >= 250000
        ? "7.5"
        : fuelSpend >= 120000
          ? "5.0"
          : "3.5";

  const annualSavings = (fuelSpend * 12).toLocaleString();

  return (
    <div className="border-border/80 bg-card/90 w-full max-w-lg rounded-3xl border p-6 shadow-2xl backdrop-blur-xl sm:p-8">
      <div className="border-border/60 flex items-center justify-between border-b pb-4">
        <div className="flex items-center gap-2">
          <div className="bg-primary/10 text-primary flex size-8 items-center justify-center rounded-xl">
            <Zap className="size-4 fill-current" />
          </div>
          <div>
            <h3 className="text-foreground text-sm font-bold">Instant Sizing & Quote Match</h3>
            <p className="text-muted-foreground text-[11px]">Standardized regional pricing</p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-bold text-emerald-600">
          <ShieldCheck className="size-3.5" /> Escrow Backed
        </span>
      </div>

      <div className="mt-5 space-y-4">
        {/* State Selector */}
        <div>
          <label className="text-foreground mb-1.5 flex items-center justify-between text-xs font-bold">
            <span>Project Location</span>
            <span className="text-muted-foreground text-[10px] font-medium">Regional Geofence</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: "Lagos", label: "Lagos" },
              { id: "Oyo", label: "Oyo (Ibadan)" },
              { id: "Abuja", label: "Abuja (FCT)" },
              { id: "Rivers", label: "Rivers" },
              { id: "Ogun", label: "Ogun" },
              { id: "Other", label: "Other States" },
            ].map((st) => (
              <button
                key={st.id}
                type="button"
                onClick={() => setSelectedState(st.id)}
                className={cn(
                  "cursor-pointer rounded-xl border px-3 py-2 text-center text-xs font-bold transition-all",
                  selectedState === st.id
                    ? "border-primary bg-primary/10 text-primary shadow-xs"
                    : "border-border bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                )}
              >
                {st.label}
              </button>
            ))}
          </div>
        </div>

        {/* Property Type Selector */}
        <div>
          <label className="text-foreground mb-1.5 block text-xs font-bold">Property Type</label>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setPropertyType("residential")}
              className={cn(
                "flex cursor-pointer items-center justify-center gap-2 rounded-xl border p-2.5 text-xs font-bold transition-all",
                propertyType === "residential"
                  ? "border-primary bg-primary/10 text-primary shadow-xs"
                  : "border-border bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
            >
              <span>🏠 Residential Home</span>
            </button>
            <button
              type="button"
              onClick={() => setPropertyType("commercial")}
              className={cn(
                "flex cursor-pointer items-center justify-center gap-2 rounded-xl border p-2.5 text-xs font-bold transition-all",
                propertyType === "commercial"
                  ? "border-primary bg-primary/10 text-primary shadow-xs"
                  : "border-border bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
            >
              <span>🏢 Business / SME</span>
            </button>
          </div>
        </div>

        {/* Monthly Fuel Spend Selector */}
        <div>
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-foreground font-bold">Monthly Generator Spend</span>
            <span className="text-primary font-extrabold">₦{fuelSpend.toLocaleString()}</span>
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            {[75000, 150000, 250000, 450000].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setFuelSpend(amt)}
                className={cn(
                  "cursor-pointer rounded-xl border py-2 text-center text-[11px] font-bold transition-all",
                  fuelSpend === amt
                    ? "border-primary bg-primary text-primary-foreground shadow-xs"
                    : "border-border bg-muted/20 text-muted-foreground hover:bg-muted/50 hover:text-foreground",
                )}
              >
                ₦{(amt / 1000).toFixed(0)}k/mo
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Estimated Hardware & Savings Preview */}
        <div className="border-primary/20 bg-primary/5 rounded-2xl border p-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground font-semibold">Estimated Setup:</span>
            <span className="text-foreground font-extrabold">
              {estimatedKva} kVA Inverter • {estimatedBattery} kWh Storage
            </span>
          </div>
          <div className="border-primary/10 mt-2 flex items-center justify-between border-t pt-2 text-xs">
            <span className="text-muted-foreground font-semibold">Replaces Generator Burn:</span>
            <span className="font-extrabold text-emerald-600 dark:text-emerald-400">
              ~₦{annualSavings} / year
            </span>
          </div>
        </div>

        {/* CTA Button */}
        <Link
          href={`/calculator?state=${selectedState}&type=${propertyType}&fuel=${fuelSpend}`}
          className="group bg-primary text-primary-foreground flex w-full cursor-pointer items-center justify-center gap-2 rounded-2xl py-4 text-sm font-extrabold shadow-lg transition-all hover:opacity-95 hover:shadow-xl active:scale-[0.99]"
        >
          <span>Get 3 Verified Quotes in {selectedState}</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
        </Link>

        <p className="text-muted-foreground text-center text-[11px] font-medium">
          🔒 Zero spam • 100% verified CAC engineers • Escrow-protected
        </p>
      </div>
    </div>
  );
}
