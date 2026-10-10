"use client";

import React, { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import {
  ArrowLeft,
  ArrowRight,
  Plus,
  Minus,
  Sparkles,
  MapPin,
  Flame,
  BatteryCharging,
  Sun,
  ShieldCheck,
  Zap,
  CheckCircle2,
  Building2,
  Home,
} from "lucide-react";

interface Appliance {
  id: string;
  name: string;
  category: "cooling" | "appliances" | "heavy";
  power: number; // Watts
  quantity: number;
  icon: string;
}

export default function CalculatorFlow() {
  const [step, setStep] = useState(1);
  const [propertyType, setPropertyType] = useState<"residential" | "commercial">("residential");
  const [primaryGoal, setPrimaryGoal] = useState<"zero_generator" | "night_backup" | "cut_bills">(
    "zero_generator",
  );
  const [stateName, setStateName] = useState<string>("Lagos");

  // Presets
  const applyPreset = (preset: "small" | "family" | "sme") => {
    if (preset === "small") {
      setAppliances([
        {
          id: "ac",
          name: "Inverter AC (1.0 HP)",
          category: "cooling",
          power: 900,
          quantity: 0,
          icon: "❄️",
        },
        {
          id: "fridge",
          name: "Fridge / Freezer",
          category: "appliances",
          power: 250,
          quantity: 1,
          icon: "🧊",
        },
        {
          id: "tv",
          name: "Smart TV & Soundbar",
          category: "appliances",
          power: 120,
          quantity: 1,
          icon: "📺",
        },
        {
          id: "fan",
          name: "Standing Fans",
          category: "cooling",
          power: 65,
          quantity: 2,
          icon: "💨",
        },
        {
          id: "light",
          name: "LED Bulbs",
          category: "appliances",
          power: 12,
          quantity: 6,
          icon: "💡",
        },
        {
          id: "pump",
          name: "Water Pump (1 HP)",
          category: "heavy",
          power: 800,
          quantity: 0,
          icon: "💧",
        },
      ]);
      setOutageHours(8);
      setFuelSpend(90000);
    } else if (preset === "family") {
      setAppliances([
        {
          id: "ac",
          name: "Inverter AC (1.5 HP)",
          category: "cooling",
          power: 1200,
          quantity: 2,
          icon: "❄️",
        },
        {
          id: "fridge",
          name: "Deep Freezer & Fridge",
          category: "appliances",
          power: 400,
          quantity: 2,
          icon: "🧊",
        },
        {
          id: "tv",
          name: "Smart TV & Decoders",
          category: "appliances",
          power: 150,
          quantity: 2,
          icon: "📺",
        },
        {
          id: "fan",
          name: "Standing Fans",
          category: "cooling",
          power: 65,
          quantity: 4,
          icon: "💨",
        },
        {
          id: "light",
          name: "LED Bulbs",
          category: "appliances",
          power: 12,
          quantity: 14,
          icon: "💡",
        },
        {
          id: "pump",
          name: "Water Pump (1 HP)",
          category: "heavy",
          power: 850,
          quantity: 1,
          icon: "💧",
        },
      ]);
      setOutageHours(10);
      setFuelSpend(220000);
    } else if (preset === "sme") {
      setAppliances([
        {
          id: "ac",
          name: "Office ACs (2.0 HP)",
          category: "cooling",
          power: 1600,
          quantity: 3,
          icon: "❄️",
        },
        {
          id: "fridge",
          name: "Beverage Coolers",
          category: "appliances",
          power: 350,
          quantity: 2,
          icon: "🧊",
        },
        {
          id: "tv",
          name: "Monitors / POS / Servers",
          category: "appliances",
          power: 300,
          quantity: 3,
          icon: "💻",
        },
        {
          id: "fan",
          name: "Ceiling Fans",
          category: "cooling",
          power: 75,
          quantity: 4,
          icon: "💨",
        },
        {
          id: "light",
          name: "Commercial Lighting",
          category: "appliances",
          power: 15,
          quantity: 25,
          icon: "💡",
        },
        {
          id: "pump",
          name: "Commercial Pump",
          category: "heavy",
          power: 1100,
          quantity: 1,
          icon: "💧",
        },
      ]);
      setPropertyType("commercial");
      setOutageHours(9);
      setFuelSpend(450000);
    }
  };

  // Appliance quantities
  const [appliances, setAppliances] = useState<Appliance[]>([
    {
      id: "ac",
      name: "Air Conditioner (1.5 HP)",
      category: "cooling",
      power: 1200,
      quantity: 1,
      icon: "❄️",
    },
    {
      id: "fridge",
      name: "Refrigerator / Deep Freezer",
      category: "appliances",
      power: 300,
      quantity: 1,
      icon: "🧊",
    },
    {
      id: "tv",
      name: "Television & Sound System",
      category: "appliances",
      power: 120,
      quantity: 1,
      icon: "📺",
    },
    {
      id: "fan",
      name: "Standing / Ceiling Fans",
      category: "cooling",
      power: 70,
      quantity: 3,
      icon: "💨",
    },
    {
      id: "light",
      name: "Energy-saving LED Bulbs",
      category: "appliances",
      power: 10,
      quantity: 10,
      icon: "💡",
    },
    {
      id: "pump",
      name: "Water Pump (0.75 - 1 HP)",
      category: "heavy",
      power: 800,
      quantity: 0,
      icon: "💧",
    },
  ]);

  // Outage and Generator Spend
  const [outageHours, setOutageHours] = useState(8);
  const [fuelSpend, setFuelSpend] = useState(140000); // Monthly NGN fuel spend

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
  let inverterKva = 2.5;
  if (totalLoadW > 5500) inverterKva = 10.0;
  else if (totalLoadW > 3500) inverterKva = 7.5;
  else if (totalLoadW > 2200) inverterKva = 5.0;
  else if (totalLoadW > 1100) inverterKva = 3.5;

  // Energy consumption during outage (kWh)
  const dailyEnergyWh = totalLoadW * 0.65 * outageHours;
  const batteryKwh = Math.max(3.5, Math.ceil(((dailyEnergyWh * 1.25) / 1000) * 10) / 10);

  // Solar panels (Watts) - 4.5 average sun hours in southern/central Nigeria
  const solarWattsRequired = (dailyEnergyWh * 1.25) / 4.6;
  const panelCount = Math.max(4, Math.ceil(solarWattsRequired / 550)); // modern 550W Tier 1 panels

  // Estimated ROI and payback calculation
  const estimatedCost =
    inverterKva <= 2.5
      ? 1850000
      : inverterKva <= 3.5
        ? 2950000
        : inverterKva <= 5.0
          ? 4750000
          : inverterKva <= 7.5
            ? 7200000
            : 10500000;

  const annualFuelSpend = fuelSpend * 12;
  const paybackMonths = fuelSpend > 0 ? Math.max(6, Math.round(estimatedCost / fuelSpend)) : 36;
  const fiveYearSavings = Math.max(0, annualFuelSpend * 5 - estimatedCost);

  const stepsMeta = [
    { num: 1, title: "Property & Goal" },
    { num: 2, title: "Location" },
    { num: 3, title: "Load Sizer" },
    { num: 4, title: "Current Fuel" },
    { num: 5, title: "Solar Blueprint" },
  ];

  return (
    <div className="w-full max-w-4xl space-y-8">
      {/* Modern Stepper Header */}
      <div className="border-border bg-card/60 rounded-3xl border p-6 shadow-sm backdrop-blur-md">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="bg-primary/10 text-primary inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold">
              <Zap className="size-3.5 fill-current" /> Instant Solar Sizer
            </div>
            <h1 className="text-foreground mt-1 text-2xl font-black tracking-tight sm:text-3xl">
              Solar Savings & Sizing Calculator
            </h1>
          </div>
          <div className="text-right">
            <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
              Progress
            </span>
            <p className="text-foreground text-sm font-extrabold">
              Step {step} of 5: <span className="text-primary">{stepsMeta[step - 1].title}</span>
            </p>
          </div>
        </div>

        {/* Visual Step Dots */}
        <div className="mt-6 grid grid-cols-5 gap-2">
          {stepsMeta.map((s) => (
            <div key={s.num} className="space-y-1.5">
              <div
                className={cn(
                  "h-2 w-full rounded-full transition-all duration-300",
                  step >= s.num ? "bg-primary" : "bg-muted",
                )}
              />
              <span
                className={cn(
                  "hidden text-[11px] font-bold md:block",
                  step === s.num
                    ? "text-primary"
                    : step > s.num
                      ? "text-foreground"
                      : "text-muted-foreground",
                )}
              >
                {s.title}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: PROPERTY TYPE & GOAL */}
      {step === 1 && (
        <div className="animate-in fade-in-50 border-border bg-card space-y-8 rounded-3xl border p-8 shadow-md duration-200 md:p-10">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-foreground text-2xl font-extrabold tracking-tight sm:text-3xl">
              What type of property are we powering?
            </h2>
            <p className="text-muted-foreground text-base">
              We customize the equipment specs based on how your property consumes power.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => setPropertyType("residential")}
              className={cn(
                "group hover:border-primary/50 relative flex cursor-pointer flex-col rounded-2xl border p-6 text-left transition-all",
                propertyType === "residential"
                  ? "border-primary bg-primary/5 ring-primary/20 shadow-md ring-2"
                  : "border-border bg-card hover:bg-muted/30",
              )}
            >
              <div className="bg-primary/10 text-primary mb-4 flex size-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                <Home className="size-6" />
              </div>
              <h3 className="text-foreground text-xl font-bold">Residential Home</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Apartment, standalone bungalow, duplex, or family compound.
              </p>
              {propertyType === "residential" && (
                <div className="text-primary absolute top-4 right-4">
                  <CheckCircle2 className="fill-primary size-5 text-white" />
                </div>
              )}
            </button>

            <button
              type="button"
              onClick={() => setPropertyType("commercial")}
              className={cn(
                "group hover:border-primary/50 relative flex cursor-pointer flex-col rounded-2xl border p-6 text-left transition-all",
                propertyType === "commercial"
                  ? "border-primary bg-primary/5 ring-primary/20 shadow-md ring-2"
                  : "border-border bg-card hover:bg-muted/30",
              )}
            >
              <div className="bg-secondary/20 text-secondary-foreground mb-4 flex size-12 items-center justify-center rounded-xl transition-transform group-hover:scale-110">
                <Building2 className="size-6" />
              </div>
              <h3 className="text-foreground text-xl font-bold">Business / Commercial</h3>
              <p className="text-muted-foreground mt-1 text-sm">
                Retail store, clinic, office hub, warehouse, or school.
              </p>
              {propertyType === "commercial" && (
                <div className="text-primary absolute top-4 right-4">
                  <CheckCircle2 className="fill-primary size-5 text-white" />
                </div>
              )}
            </button>
          </div>

          {/* Primary Energy Goal */}
          <div className="border-border space-y-4 border-t pt-4">
            <h4 className="text-foreground text-base font-bold">What is your main priority?</h4>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  id: "zero_generator",
                  label: "Zero Generator Noise",
                  desc: "Never turn on a generator again",
                },
                {
                  id: "night_backup",
                  label: "Night-Time Comfort",
                  desc: "Silent uninterrupted sleep with AC",
                },
                {
                  id: "cut_bills",
                  label: "Maximum ROI",
                  desc: "Slash monthly fuel costs immediately",
                },
              ].map((goal) => (
                <button
                  key={goal.id}
                  type="button"
                  onClick={() =>
                    setPrimaryGoal(goal.id as "zero_generator" | "night_backup" | "cut_bills")
                  }
                  className={cn(
                    "cursor-pointer rounded-xl border p-4 text-left transition-all",
                    primaryGoal === goal.id
                      ? "border-primary bg-primary/10 text-primary font-bold"
                      : "border-border bg-card text-foreground hover:bg-muted/30",
                  )}
                >
                  <p className="text-sm font-bold">{goal.label}</p>
                  <p className="text-muted-foreground mt-1 text-xs">{goal.desc}</p>
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button
              onClick={() => setStep(2)}
              className={cn(
                buttonVariants({ size: "lg" }),
                "cursor-pointer gap-2 px-8 font-bold shadow-md transition-transform hover:scale-105",
              )}
            >
              Continue to Location <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: LOCATION & SOLAR IRRADIANCE */}
      {step === 2 && (
        <div className="animate-in fade-in-50 border-border bg-card space-y-8 rounded-3xl border p-8 shadow-md duration-200 md:p-10">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-foreground text-2xl font-extrabold tracking-tight sm:text-3xl">
              Where will the system be installed?
            </h2>
            <p className="text-muted-foreground text-base">
              Solar irradiance and regional installer availability vary by state.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            {[
              { name: "Lagos", sub: "Ikeja, Island, Lekki, Epe", sun: "4.5 Peak Sun Hrs/Day" },
              { name: "Oyo", sub: "Ibadan, Ogbomoso, Oyo Town", sun: "4.8 Peak Sun Hrs/Day" },
              { name: "Abuja (FCT)", sub: "Maitama, Gwarinpa, Wuse", sun: "5.2 Peak Sun Hrs/Day" },
              { name: "Ogun", sub: "Abeokuta, Sagamu, Mowe", sun: "4.6 Peak Sun Hrs/Day" },
              { name: "Rivers", sub: "Port Harcourt, Obio-Akpor", sun: "4.3 Peak Sun Hrs/Day" },
              { name: "Enugu", sub: "Enugu City, Nsukka", sun: "4.7 Peak Sun Hrs/Day" },
            ].map((loc) => (
              <button
                key={loc.name}
                type="button"
                onClick={() => setStateName(loc.name)}
                className={cn(
                  "group relative flex cursor-pointer flex-col rounded-2xl border p-5 text-left transition-all",
                  stateName === loc.name
                    ? "border-primary bg-primary/5 ring-primary/20 shadow-md ring-2"
                    : "border-border bg-card hover:bg-muted/30",
                )}
              >
                <div className="flex items-center gap-2">
                  <MapPin
                    className={cn(
                      "size-4",
                      stateName === loc.name ? "text-primary" : "text-muted-foreground",
                    )}
                  />
                  <span className="text-foreground text-base font-bold">{loc.name}</span>
                </div>
                <p className="text-muted-foreground mt-1 text-xs">{loc.sub}</p>
                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                  <Sun className="size-3.5" /> {loc.sun}
                </div>
                {stateName === loc.name && (
                  <div className="text-primary absolute top-4 right-4">
                    <CheckCircle2 className="fill-primary size-4 text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>

          <div className="border-border flex items-center justify-between border-t pt-6">
            <button
              onClick={() => setStep(1)}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "cursor-pointer gap-2 font-semibold",
              )}
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            <button
              onClick={() => setStep(3)}
              className={cn(
                buttonVariants({ size: "lg" }),
                "cursor-pointer gap-2 px-8 font-bold shadow-md",
              )}
            >
              Proceed to Appliances <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: APPLIANCES & LOAD SIZER */}
      {step === 3 && (
        <div className="animate-in fade-in-50 border-border bg-card space-y-8 rounded-3xl border p-8 shadow-md duration-200 md:p-10">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h2 className="text-foreground text-2xl font-extrabold tracking-tight sm:text-3xl">
                What appliances do you want to power?
              </h2>
              <p className="text-muted-foreground text-sm">
                Pick a quick preset or adjust quantities below.
              </p>
            </div>

            {/* Quick Presets */}
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => applyPreset("small")}
                className="border-border bg-muted/40 text-foreground hover:bg-muted cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-bold"
              >
                Flat (3kVA)
              </button>
              <button
                type="button"
                onClick={() => applyPreset("family")}
                className="border-border bg-muted/40 text-foreground hover:bg-muted cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-bold"
              >
                Duplex (5kVA)
              </button>
              <button
                type="button"
                onClick={() => applyPreset("sme")}
                className="border-border bg-muted/40 text-foreground hover:bg-muted cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-bold"
              >
                Office / SME
              </button>
            </div>
          </div>

          {/* Live Load Meter Banner */}
          <div className="border-primary/20 bg-primary/5 flex flex-col gap-4 rounded-2xl border p-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <span className="text-primary text-xs font-bold tracking-wider uppercase">
                Calculated Continuous Load
              </span>
              <p className="text-foreground text-2xl font-black">
                {totalLoadW >= 1000
                  ? `${(totalLoadW / 1000).toFixed(2)} kW`
                  : `${totalLoadW} Watts`}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-card border-border rounded-xl border px-4 py-2 text-center shadow-xs">
                <span className="text-muted-foreground text-[10px] font-bold uppercase">
                  Recommended Inverter
                </span>
                <p className="text-foreground text-sm font-extrabold">{inverterKva} kVA</p>
              </div>
              <div className="bg-card border-border rounded-xl border px-4 py-2 text-center shadow-xs">
                <span className="text-muted-foreground text-[10px] font-bold uppercase">
                  Estimated Battery
                </span>
                <p className="text-foreground text-sm font-extrabold">{batteryKwh} kWh</p>
              </div>
            </div>
          </div>

          {/* Interactive Appliance List */}
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {appliances.map((app) => (
              <div
                key={app.id}
                className={cn(
                  "flex items-center justify-between rounded-2xl border p-4 transition-all",
                  app.quantity > 0
                    ? "border-primary/40 bg-card shadow-xs"
                    : "border-border/60 bg-muted/10 opacity-75",
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{app.icon}</span>
                  <div>
                    <h4 className="text-foreground text-sm font-bold">{app.name}</h4>
                    <span className="text-muted-foreground text-xs">{app.power} Watts each</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    type="button"
                    onClick={() => updateQuantity(app.id, -1)}
                    className="border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 cursor-pointer items-center justify-center rounded-lg border"
                  >
                    <Minus className="size-3.5" />
                  </button>
                  <span className="text-foreground w-6 text-center text-sm font-black">
                    {app.quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => updateQuantity(app.id, 1)}
                    className="border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground flex size-8 cursor-pointer items-center justify-center rounded-lg border"
                  >
                    <Plus className="size-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-border flex items-center justify-between border-t pt-6">
            <button
              onClick={() => setStep(2)}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "cursor-pointer gap-2 font-semibold",
              )}
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            <button
              onClick={() => setStep(4)}
              disabled={totalLoadW === 0}
              className={cn(
                buttonVariants({ size: "lg" }),
                "cursor-pointer gap-2 px-8 font-bold shadow-md disabled:opacity-50",
              )}
            >
              Calculate Fuel Drain <ArrowRight className="size-5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 4: CURRENT DIESEL / PETROL COSTS */}
      {step === 4 && (
        <div className="animate-in fade-in-50 border-border bg-card space-y-8 rounded-3xl border p-8 shadow-md duration-200 md:p-10">
          <div className="space-y-2 text-center md:text-left">
            <h2 className="text-foreground text-2xl font-extrabold tracking-tight sm:text-3xl">
              What are you spending on fuel right now?
            </h2>
            <p className="text-muted-foreground text-base">
              We compare your current generator expenses directly against solar financing to give
              you an accurate payback period.
            </p>
          </div>

          <div className="space-y-6">
            {/* Outage Slider */}
            <div className="border-border bg-muted/20 space-y-3 rounded-2xl border p-6">
              <div className="flex items-center justify-between">
                <span className="text-foreground text-sm font-bold">
                  Average Outage Hours per Day
                </span>
                <span className="text-primary text-lg font-black">{outageHours} Hours</span>
              </div>
              <input
                type="range"
                min="2"
                max="24"
                step="1"
                value={outageHours}
                onChange={(e) => setOutageHours(Number(e.target.value))}
                className="accent-primary bg-muted h-2 w-full cursor-pointer rounded-lg"
              />
              <div className="text-muted-foreground flex justify-between text-[11px] font-semibold">
                <span>2 hrs (Light outages)</span>
                <span>8-10 hrs (Average urban)</span>
                <span>24 hrs (Full off-grid)</span>
              </div>
            </div>

            {/* Monthly Fuel Spend */}
            <div className="border-border bg-muted/20 space-y-3 rounded-2xl border p-6">
              <label htmlFor="fuelSpendInput" className="text-foreground block text-sm font-bold">
                Estimated Monthly Spend on Petrol / Diesel
              </label>
              <div className="relative">
                <span className="text-muted-foreground absolute top-3.5 left-4 text-lg font-bold">
                  ₦
                </span>
                <input
                  id="fuelSpendInput"
                  type="number"
                  step="10000"
                  value={fuelSpend}
                  onChange={(e) => setFuelSpend(Math.max(0, Number(e.target.value)))}
                  className="border-border bg-card text-foreground focus:border-primary w-full rounded-xl border py-3.5 pr-4 pl-10 text-xl font-black shadow-xs focus:outline-none"
                />
              </div>

              {/* Quick Fuel Cost Buttons */}
              <div className="flex flex-wrap gap-2 pt-2">
                {[60000, 120000, 200000, 350000, 500000].map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setFuelSpend(amt)}
                    className="border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground cursor-pointer rounded-lg border px-3 py-1.5 text-xs font-semibold"
                  >
                    ₦{(amt / 1000).toFixed(0)}k/mo
                  </button>
                ))}
              </div>
            </div>

            {/* Real-time Generator Burn Highlight */}
            <div className="flex items-center gap-4 rounded-2xl border border-amber-500/20 bg-amber-500/10 p-5 text-amber-900 dark:text-amber-200">
              <Flame className="size-8 shrink-0 text-amber-600 dark:text-amber-400" />
              <div>
                <p className="text-xs font-bold tracking-wider uppercase">
                  Your Generator Bleed Rate
                </p>
                <p className="text-lg font-extrabold">
                  You are burning approximately{" "}
                  <span className="underline decoration-amber-500">
                    ₦{(fuelSpend * 12).toLocaleString()} every single year
                  </span>{" "}
                  on fuel alone.
                </p>
              </div>
            </div>
          </div>

          <div className="border-border flex items-center justify-between border-t pt-6">
            <button
              onClick={() => setStep(3)}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "cursor-pointer gap-2 font-semibold",
              )}
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            <button
              onClick={() => setStep(5)}
              className={cn(
                buttonVariants({ size: "lg" }),
                "cursor-pointer gap-2 px-8 font-black shadow-lg transition-transform hover:scale-105",
              )}
            >
              Generate Solar Blueprint <Sparkles className="size-5" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 5: THE SOLAR BLUEPRINT (RESULTS) */}
      {step === 5 && (
        <div className="animate-in zoom-in-95 fade-in-50 border-border bg-card space-y-10 rounded-3xl border p-8 shadow-xl duration-300 md:p-12">
          <div className="space-y-3 text-center">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/15 px-4 py-1.5 text-xs font-bold text-emerald-700 dark:text-emerald-300">
              <ShieldCheck className="size-4" /> Recommended Engineering Blueprint
            </div>
            <h2 className="text-foreground text-3xl font-black tracking-tight sm:text-4xl">
              Your Customized Solar Solution
            </h2>
            <p className="text-muted-foreground mx-auto max-w-xl text-base">
              Engineered for {stateName} State to replace your ₦{fuelSpend.toLocaleString()}/mo
              generator costs.
            </p>
          </div>

          {/* Hardware Specs: Modern Bento Grid */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="border-border bg-muted/20 rounded-2xl border p-6 text-center shadow-xs">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-xl bg-amber-500/10 text-amber-600">
                <Flame className="size-6" />
              </div>
              <span className="text-muted-foreground text-[11px] font-bold tracking-wider uppercase">
                Inverter Power
              </span>
              <p className="text-foreground mt-1 text-2xl font-black">{inverterKva} kVA</p>
              <p className="text-muted-foreground mt-1 text-xs">Pure Sine Wave Hybrid</p>
            </div>

            <div className="border-border bg-muted/20 rounded-2xl border p-6 text-center shadow-xs">
              <div className="bg-primary/10 text-primary mx-auto mb-3 flex size-12 items-center justify-center rounded-xl">
                <BatteryCharging className="size-6" />
              </div>
              <span className="text-muted-foreground text-[11px] font-bold tracking-wider uppercase">
                Lithium Storage
              </span>
              <p className="text-foreground mt-1 text-2xl font-black">{batteryKwh} kWh</p>
              <p className="text-muted-foreground mt-1 text-xs">LiFePO4 (6,000+ Cycles)</p>
            </div>

            <div className="border-border bg-muted/20 rounded-2xl border p-6 text-center shadow-xs">
              <div className="bg-secondary/20 text-secondary-foreground mx-auto mb-3 flex size-12 items-center justify-center rounded-xl">
                <Sun className="size-6" />
              </div>
              <span className="text-muted-foreground text-[11px] font-bold tracking-wider uppercase">
                Solar Array
              </span>
              <p className="text-foreground mt-1 text-2xl font-black">{panelCount} Panels</p>
              <p className="text-muted-foreground mt-1 text-xs">550W Tier 1 Mono-PERC</p>
            </div>
          </div>

          {/* Investment & Savings Card */}
          <div className="space-y-6 rounded-3xl border border-emerald-500/30 bg-emerald-500/5 p-8">
            <div className="flex flex-col gap-2 border-b border-emerald-500/15 pb-4 sm:flex-row sm:items-center sm:justify-between">
              <span className="text-sm font-bold text-emerald-800 dark:text-emerald-300">
                Financial Return & Payback Metrics
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-extrabold text-emerald-600">
                ✓ Paystack Escrow Protected
              </span>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
              <div>
                <span className="text-muted-foreground text-xs font-semibold">
                  Estimated Setup Cost
                </span>
                <p className="text-foreground mt-1 text-2xl font-black">
                  ₦{estimatedCost.toLocaleString()}
                </p>
                <span className="text-muted-foreground text-[10px]">
                  Standard benchmark for Tier 1
                </span>
              </div>

              <div>
                <span className="text-muted-foreground text-xs font-semibold">
                  Full Payback Period
                </span>
                <p className="mt-1 text-2xl font-black text-emerald-600">{paybackMonths} Months</p>
                <span className="text-muted-foreground text-[10px]">
                  Break-even vs fuel expenditure
                </span>
              </div>

              <div>
                <span className="text-muted-foreground text-xs font-semibold">
                  Estimated 5-Year Profit
                </span>
                <p className="text-primary mt-1 text-2xl font-black">
                  +₦{fiveYearSavings.toLocaleString()}
                </p>
                <span className="text-muted-foreground text-[10px]">
                  Direct money saved in pocket
                </span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => setStep(3)}
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "flex-1 cursor-pointer gap-2 font-bold",
              )}
            >
              <ArrowLeft className="size-4" /> Modify Sizing
            </button>
            <Link
              href={`/onboarding?type=customer&state=${stateName}&inverter=${inverterKva}&battery=${batteryKwh}`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "flex-2 cursor-pointer gap-2 px-10 font-black shadow-xl transition-transform hover:scale-105",
              )}
            >
              Request 3 Standardized Quotes in {stateName} <ArrowRight className="size-5" />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
