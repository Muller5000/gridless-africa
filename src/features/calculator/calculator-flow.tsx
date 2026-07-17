"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Plus,
  Minus,
  Sparkles,
  MapPin,
  Flame,
  BatteryCharging,
  Sun,
  ShieldCheck,
} from "lucide-react";

interface Appliance {
  id: string;
  name: string;
  power: number; // Watts
  quantity: number;
}

export default function CalculatorFlow() {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState<"residential" | "commercial">("residential");
  const [stateName, setStateName] = useState<"Lagos" | "Oyo">("Lagos");

  // Appliance quantities
  const [appliances, setAppliances] = useState<Appliance[]>([
    { id: "ac", name: "Air Conditioner (1.5 HP)", power: 1200, quantity: 0 },
    { id: "fridge", name: "Refrigerator / Freezer", power: 300, quantity: 1 },
    { id: "tv", name: "Television (LED)", power: 100, quantity: 1 },
    { id: "fan", name: "Standing Fan", power: 75, quantity: 3 },
    { id: "light", name: "LED Bulbs", power: 10, quantity: 10 },
    { id: "pump", name: "Water Pump (0.75 HP)", power: 750, quantity: 0 },
  ]);

  // Outage and Generator Spend
  const [outageHours, setOutageHours] = useState(8);
  const [fuelSpend, setFuelSpend] = useState(120000); // Monthly NGN fuel spend

  const updateQuantity = (id: string, delta: number) => {
    setAppliances((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, quantity: Math.max(0, app.quantity + delta) } : app,
      ),
    );
  };

  // Sizing Calculation Logic
  const totalLoadW = appliances.reduce((sum, app) => sum + app.power * app.quantity, 0);

  // Inverter Size (kVa)
  let inverterKva = 1.5;
  if (totalLoadW > 4000) inverterKva = 10.0;
  else if (totalLoadW > 2500) inverterKva = 5.0;
  else if (totalLoadW > 1200) inverterKva = 3.0;

  // Energy consumption during outage (kWh)
  // Assuming average load is 60% of peak load
  const dailyEnergyWh = totalLoadW * 0.6 * outageHours;
  const batteryKwh = Math.max(2.4, Math.ceil(((dailyEnergyWh * 1.25) / 1000) * 10) / 10); // 1.25 safety/depth factor

  // Solar panels (Watts)
  // Assuming 4.5 peak sun hours in Nigeria
  const solarWattsRequired = (dailyEnergyWh * 1.3) / 4.5;
  const panelCount = Math.max(2, Math.ceil(solarWattsRequired / 450)); // using standard 450W panel

  // Estimated ROI and payback period
  const estimatedCost =
    inverterKva === 1.5
      ? 1500000
      : inverterKva === 3.0
        ? 2800000
        : inverterKva === 5.0
          ? 4800000
          : 8500000;

  const paybackMonths = fuelSpend > 0 ? Math.max(6, Math.round(estimatedCost / fuelSpend)) : 36;

  return (
    <Card className="border-border bg-card w-full max-w-2xl border p-6 shadow-md md:p-8">
      {/* Progress Stepper */}
      <div className="mb-8 space-y-2">
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <span className="text-primary font-semibold tracking-wider uppercase">
            Solar Savings Sizer
          </span>
          <span>Step {step} of 5</span>
        </div>
        <div className="bg-muted h-1.5 w-full rounded-full">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: PROPERTY TYPE */}
      {step === 1 && (
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">Select Property Type</h2>
            <p className="text-muted-foreground text-sm">
              Help us tailor standard energy profiles for your request.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setPropertyType("residential")}
              className={cn(
                "hover:bg-muted/20 flex cursor-pointer flex-col items-center justify-center rounded-xl border p-6 text-center transition-all",
                propertyType === "residential"
                  ? "border-primary bg-primary/5 ring-primary ring-1"
                  : "border-border bg-card",
              )}
            >
              <span className="mb-2 text-3xl">🏠</span>
              <span className="text-foreground text-sm font-bold">Residential</span>
              <span className="text-muted-foreground mt-1 text-[10px]">
                Homes, apartments, estates
              </span>
            </button>
            <button
              onClick={() => setPropertyType("commercial")}
              className={cn(
                "hover:bg-muted/20 flex cursor-pointer flex-col items-center justify-center rounded-xl border p-6 text-center transition-all",
                propertyType === "commercial"
                  ? "border-primary bg-primary/5 ring-primary ring-1"
                  : "border-border bg-card",
              )}
            >
              <span className="mb-2 text-3xl">🏢</span>
              <span className="text-foreground text-sm font-bold">Commercial</span>
              <span className="text-muted-foreground mt-1 text-[10px]">
                Offices, retail, warehouses
              </span>
            </button>
          </div>
          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className={cn(buttonVariants(), "cursor-pointer gap-2")}
            >
              Next Step <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: APPLIANCES */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">
              What appliances do you run?
            </h2>
            <p className="text-muted-foreground text-sm">
              Select quantities of primary appliances to estimate peak load.
            </p>
          </div>

          <div className="divide-border border-border max-h-[300px] divide-y overflow-y-auto border-y pr-2">
            {appliances.map((app) => (
              <div key={app.id} className="flex items-center justify-between py-3">
                <div className="space-y-0.5">
                  <span className="text-foreground text-sm font-semibold">{app.name}</span>
                  <span className="text-muted-foreground block text-xs">{app.power} Watts</span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    type="button"
                    onClick={() => updateQuantity(app.id, -1)}
                    className="border-border bg-card text-muted-foreground hover:text-foreground flex size-7 cursor-pointer items-center justify-center rounded-lg border"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="w-6 text-center text-sm font-bold">{app.quantity}</span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(app.id, 1)}
                    className="border-border bg-card text-muted-foreground hover:text-foreground flex size-7 cursor-pointer items-center justify-center rounded-lg border"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-muted/30 border-border flex items-center justify-between rounded-lg border p-3 text-sm">
            <span className="text-muted-foreground">Estimated Active Load:</span>
            <span className="text-foreground font-bold">
              {totalLoadW >= 1000 ? `${(totalLoadW / 1000).toFixed(1)} kW` : `${totalLoadW} Watts`}
            </span>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(1)}
              className={cn(buttonVariants({ variant: "ghost" }), "cursor-pointer gap-2")}
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            <button
              onClick={() => setStep(3)}
              disabled={totalLoadW === 0}
              className={cn(buttonVariants(), "cursor-pointer gap-2")}
            >
              Next Step <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: OUTAGES & SPEND */}
      {step === 3 && (
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">
              Daily Outages & Fuel Spend
            </h2>
            <p className="text-muted-foreground text-sm">
              Enter your outage duration and generator fuel expenditures.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="outageHours">Average Outage Duration per Day (Hours)</Label>
              <div className="flex items-center space-x-4">
                <input
                  id="outageHours"
                  type="range"
                  min="2"
                  max="24"
                  step="1"
                  value={outageHours}
                  onChange={(e) => setOutageHours(Number(e.target.value))}
                  className="bg-muted accent-primary h-1.5 flex-1 cursor-pointer rounded-lg"
                />
                <span className="text-foreground w-12 text-right text-sm font-bold">
                  {outageHours} hrs
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <Label htmlFor="fuelSpend">Monthly Generator Fuel Cost (₦ NGN)</Label>
              <div className="relative">
                <span className="text-muted-foreground absolute top-2 left-3 text-sm">₦</span>
                <Input
                  id="fuelSpend"
                  type="number"
                  placeholder="120,000"
                  className="pl-7"
                  value={fuelSpend}
                  onChange={(e) => setFuelSpend(Number(e.target.value))}
                />
              </div>
            </div>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(2)}
              className={cn(buttonVariants({ variant: "ghost" }), "cursor-pointer gap-2")}
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            <button
              onClick={() => setStep(4)}
              className={cn(buttonVariants(), "cursor-pointer gap-2")}
            >
              Next Step <ArrowRight className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: GEOLOCATION */}
      {step === 4 && (
        <div className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">Project Location</h2>
            <p className="text-muted-foreground text-sm">
              Verified installers bid within regional geofences. Select your State.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => setStateName("Lagos")}
              className={cn(
                "hover:bg-muted/20 flex cursor-pointer flex-col items-center justify-center rounded-xl border p-6 text-center transition-all",
                stateName === "Lagos"
                  ? "border-primary bg-primary/5 ring-primary ring-1"
                  : "border-border bg-card",
              )}
            >
              <MapPin className="text-primary mb-2 size-6" />
              <span className="text-foreground text-sm font-bold">Lagos State</span>
              <span className="text-muted-foreground mt-1 text-[10px]">
                Metropolitan areas & Island
              </span>
            </button>
            <button
              onClick={() => setStateName("Oyo")}
              className={cn(
                "hover:bg-muted/20 flex cursor-pointer flex-col items-center justify-center rounded-xl border p-6 text-center transition-all",
                stateName === "Oyo"
                  ? "border-primary bg-primary/5 ring-primary ring-1"
                  : "border-border bg-card",
              )}
            >
              <MapPin className="text-secondary-foreground mb-2 size-6" />
              <span className="text-foreground text-sm font-bold">Oyo State</span>
              <span className="text-muted-foreground mt-1 text-[10px]">
                Ibadan, Ogbomosho, Oyo towns
              </span>
            </button>
          </div>

          <div className="flex justify-between pt-4">
            <button
              onClick={() => setStep(3)}
              className={cn(buttonVariants({ variant: "ghost" }), "cursor-pointer gap-2")}
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            <button
              onClick={() => setStep(5)}
              className={cn(buttonVariants(), "cursor-pointer gap-2")}
            >
              Calculate ROI <Calculator className="size-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: RESULTS SCREEN */}
      {step === 5 && (
        <div className="animate-in fade-in zoom-in space-y-6 duration-200">
          <div className="space-y-2 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600">
              <Sparkles className="size-3.5" /> Energy Plan Prepared
            </div>
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">
              Your Solar Specifications
            </h2>
            <p className="text-muted-foreground text-sm">
              Based on your load: {totalLoadW}W in {stateName} State.
            </p>
          </div>

          {/* Core Hardware Metrics Grid */}
          <div className="grid grid-cols-3 gap-4">
            <div className="border-border bg-muted/20 rounded-xl border p-4 text-center">
              <Flame className="mx-auto mb-2 size-6 text-amber-500" />
              <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                Inverter Size
              </span>
              <p className="text-foreground mt-1 text-lg font-bold">{inverterKva} kVa</p>
            </div>
            <div className="border-border bg-muted/20 rounded-xl border p-4 text-center">
              <BatteryCharging className="text-primary mx-auto mb-2 size-6" />
              <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                Battery Storage
              </span>
              <p className="text-foreground mt-1 text-lg font-bold">{batteryKwh} kWh</p>
            </div>
            <div className="border-border bg-muted/20 rounded-xl border p-4 text-center">
              <Sun className="text-secondary-foreground mx-auto mb-2 size-6" />
              <span className="text-muted-foreground text-[10px] font-semibold tracking-wider uppercase">
                Solar Panels
              </span>
              <p className="text-foreground mt-1 text-lg font-bold">{panelCount} × 450W</p>
            </div>
          </div>

          {/* Payback / ROI Card */}
          <div className="space-y-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5">
            <div className="flex items-center space-x-2 text-sm font-bold text-emerald-600">
              <ShieldCheck className="size-5 shrink-0" />
              <span>Investment Recovery Snapshot</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="text-muted-foreground text-xs">Est. System Cost</span>
                <p className="text-foreground mt-0.5 text-lg font-bold">
                  ₦{estimatedCost.toLocaleString()}
                </p>
              </div>
              <div>
                <span className="text-muted-foreground text-xs">Payback Period</span>
                <p className="mt-0.5 text-lg font-bold text-emerald-600">{paybackMonths} Months</p>
              </div>
            </div>
            <p className="text-muted-foreground border-t border-emerald-500/10 pt-2 text-xs leading-relaxed">
              System replaces generator fuel spend of ₦{fuelSpend.toLocaleString()}/month. Real
              prices may vary based on installer bids.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <button
              onClick={() => setStep(2)}
              className={cn(
                buttonVariants({ variant: "outline", className: "flex-1 cursor-pointer" }),
                "gap-2",
              )}
            >
              <ArrowLeft className="size-4" /> Recalculate
            </button>
            <Link
              href="/login?redirectTo=/dashboard"
              className={cn(buttonVariants({ className: "flex-1 cursor-pointer" }), "gap-2")}
            >
              Get Verified Quotes <ArrowRight className="size-4" />
            </Link>
          </div>
        </div>
      )}
    </Card>
  );
}
