"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import {
  APPLIANCE_CATALOG,
  calculateSizing,
  SelectedAppliance,
  SizingResult,
} from "./assessment-service";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  Loader2,
  Plus,
  Minus,
  Printer,
  ChevronRight,
  Battery,
  Flame,
  Sun,
  ShieldCheck,
} from "lucide-react";

export default function EnergyAssessmentFlow() {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [phcnHours, setPhcnHours] = useState(8);

  // Initialize selected appliances from catalog with quantity = 0
  const [selected, setSelected] = useState<SelectedAppliance[]>([]);

  const supabase = createClient();

  // Load user data & saved assessments on mount
  useEffect(() => {
    async function loadData() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          window.location.assign("/login");
          return;
        }
        setUserId(user.id);

        // Fetch user's PHCN hours from electricity profile if available
        const { data: elecProfile } = await supabase
          .from("electricity_profiles")
          .select("phcn_availability")
          .eq("profile_id", user.id)
          .single();

        if (elecProfile) {
          setPhcnHours(elecProfile.phcn_availability || 8);
        }

        // Fetch saved assessment
        const { data: assessment } = await supabase
          .from("assessments")
          .select("*")
          .eq("profile_id", user.id)
          .single();

        if (assessment && Array.isArray(assessment.appliances)) {
          setSelected(assessment.appliances as SelectedAppliance[]);
        } else {
          // Defaults: copy catalog with quantity = 0
          setSelected(
            APPLIANCE_CATALOG.map((app) => ({
              id: app.id,
              name: app.name,
              power: app.defaultPower,
              quantity: 0,
              hours: app.defaultHours,
            })),
          );
        }
      } catch (err) {
        console.error("Failed to load energy assessment data", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [supabase]);

  // Quantity updates
  const updateQty = (id: string, delta: number) => {
    setSelected((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, quantity: Math.max(0, app.quantity + delta) } : app,
      ),
    );
  };

  // Hours updates
  const updateHours = (id: string, hours: number) => {
    setSelected((prev) =>
      prev.map((app) =>
        app.id === id ? { ...app, hours: Math.min(24, Math.max(0.1, hours)) } : app,
      ),
    );
  };

  // Calculate live results
  const results: SizingResult = calculateSizing(selected, phcnHours);

  // Save assessment to database
  const handleSave = async () => {
    if (!userId) return;
    setSaving(true);
    try {
      const { error } = await supabase.from("assessments").upsert(
        {
          profile_id: userId,
          appliances: selected,
          daily_wh: results.dailyWh,
          daily_kwh: results.dailyKwh,
          peak_load_w: results.peakLoadW,
          recommended_inverter_kva: results.recommendedInverterKva,
          recommended_battery_kwh: results.recommendedBatteryKwh,
          recommended_solar_w: results.recommendedSolarW,
          category: results.category,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "profile_id" },
      );

      if (error) throw error;
      setSuccessMsg("Assessment successfully saved!");
      setTimeout(() => setSuccessMsg(null), 3000);
    } catch (err) {
      console.error(err);
      alert("Failed to save your energy assessment. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  if (loading) {
    return (
      <div className="flex h-[450px] w-full flex-col items-center justify-center space-y-4">
        <Loader2 className="text-primary size-8 animate-spin" />
        <p className="text-muted-foreground text-xs">Loading energy calculator parameters...</p>
      </div>
    );
  }

  return (
    <div className="grid w-full max-w-6xl grid-cols-1 gap-8 lg:grid-cols-3">
      {/* List of appliances */}
      <div className="space-y-6 lg:col-span-2">
        <div className="border-border flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-foreground text-2xl font-black">Appliance Audit</h2>
            <p className="text-muted-foreground mt-0.5 text-xs">
              Select appliance quantities and daily operation hours.
            </p>
          </div>
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-muted-foreground">Location Outage Outlines:</span>
            <span className="bg-muted text-foreground rounded-md px-2.5 py-1 font-bold">
              {24 - phcnHours} hrs outage/day
            </span>
          </div>
        </div>

        {/* Success toast alert */}
        {successMsg && (
          <div className="animate-in fade-in flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-xs text-emerald-600 duration-200">
            <ShieldCheck className="size-4 shrink-0" />
            <span className="font-semibold">{successMsg}</span>
          </div>
        )}

        {/* Appliance cards directory */}
        <div className="grid max-h-[600px] grid-cols-1 gap-4 overflow-y-auto pr-2 sm:grid-cols-2">
          {selected.map((app) => {
            const isActive = app.quantity > 0;
            return (
              <Card
                key={app.id}
                className={cn(
                  "flex flex-col justify-between space-y-4 border p-4 transition-all",
                  isActive
                    ? "border-primary bg-primary/5 ring-primary ring-1"
                    : "border-border bg-card",
                )}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-0.5">
                    <h4 className="text-foreground text-sm font-bold">{app.name}</h4>
                    <span className="text-muted-foreground text-[10px]">
                      {app.power} Watts per unit
                    </span>
                  </div>

                  {/* Quantity selector */}
                  <div className="flex items-center space-x-2">
                    <button
                      type="button"
                      onClick={() => updateQty(app.id, -1)}
                      className="border-border hover:bg-muted text-muted-foreground hover:text-foreground flex size-6 cursor-pointer items-center justify-center rounded-md border"
                    >
                      <Minus className="size-3" />
                    </button>
                    <span className="w-5 text-center text-xs font-bold">{app.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(app.id, 1)}
                      className="border-border hover:bg-muted text-muted-foreground hover:text-foreground flex size-6 cursor-pointer items-center justify-center rounded-md border"
                    >
                      <Plus className="size-3" />
                    </button>
                  </div>
                </div>

                {/* Operation hours selector (only visible if quantity > 0) */}
                {isActive && (
                  <div className="border-border/60 animate-in slide-in-from-top-1 space-y-2 border-t pt-3 duration-100">
                    <div className="flex items-center justify-between text-[10px]">
                      <Label htmlFor={`hours-${app.id}`} className="text-muted-foreground">
                        Daily Runtime:
                      </Label>
                      <span className="text-foreground font-bold">{app.hours} Hours</span>
                    </div>
                    <input
                      id={`hours-${app.id}`}
                      type="range"
                      min="0.5"
                      max="24"
                      step="0.5"
                      value={app.hours}
                      onChange={(e) => updateHours(app.id, Number(e.target.value))}
                      className="bg-muted accent-primary h-1 w-full cursor-pointer appearance-none rounded-lg"
                    />
                  </div>
                )}
              </Card>
            );
          })}
        </div>
      </div>

      {/* Sizing Recommendations Panel */}
      <div className="space-y-6 lg:col-span-1">
        <Card className="border-border bg-card space-y-6 border p-6 shadow-md lg:sticky lg:top-6">
          <div className="border-border border-b pb-3">
            <h3 className="text-foreground text-sm font-bold tracking-wider uppercase">
              Assessment Sizing
            </h3>
          </div>

          <div className="space-y-4">
            <div className="border-border/40 flex justify-between border-b pb-2 text-xs">
              <span className="text-muted-foreground">Total Peak Load:</span>
              <span className="text-foreground font-bold">{results.peakLoadW} Watts</span>
            </div>
            <div className="border-border/40 flex justify-between border-b pb-2 text-xs">
              <span className="text-muted-foreground">Daily Energy Demand:</span>
              <span className="text-foreground font-bold">{results.dailyKwh} kWh/day</span>
            </div>
            <div className="border-border/40 flex justify-between border-b pb-2 text-xs">
              <span className="text-muted-foreground">Sizing Category:</span>
              <span className="bg-primary/10 text-primary rounded-md px-2.5 py-0.5 text-[10px] font-bold capitalize">
                {results.category} System
              </span>
            </div>
          </div>

          {/* Hardware Sizing Panel Cards */}
          <div className="space-y-3 pt-2">
            <div className="border-border bg-muted/20 flex items-center space-x-3 rounded-xl border p-3.5">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <Flame className="size-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-muted-foreground text-[9px] font-semibold tracking-wider uppercase">
                  Inverter Required
                </span>
                <p className="text-foreground text-sm font-extrabold">
                  {results.recommendedInverterKva} kVa
                </p>
              </div>
            </div>

            <div className="border-border bg-muted/20 flex items-center space-x-3 rounded-xl border p-3.5">
              <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
                <Battery className="size-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-muted-foreground text-[9px] font-semibold tracking-wider uppercase">
                  Battery Storage
                </span>
                <p className="text-foreground text-sm font-extrabold">
                  {results.recommendedBatteryKwh} kWh
                </p>
              </div>
            </div>

            <div className="border-border bg-muted/20 flex items-center space-x-3 rounded-xl border p-3.5">
              <div className="bg-secondary/15 text-secondary-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
                <Sun className="size-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-muted-foreground text-[9px] font-semibold tracking-wider uppercase">
                  Solar Capacity
                </span>
                <p className="text-foreground text-sm font-extrabold">
                  {results.recommendedSolarW > 0 ? `${results.recommendedSolarW} Watts` : "0 Watts"}
                </p>
              </div>
            </div>
          </div>

          {/* Save/Print action handlers */}
          <div className="border-border space-y-3 border-t pt-4">
            <button
              onClick={handleSave}
              disabled={saving}
              className={cn(buttonVariants({ className: "w-full cursor-pointer" }), "gap-2")}
            >
              {saving && <Loader2 className="size-4 animate-spin" />}
              Save Assessment
            </button>
            <Link
              href="/assessment/report"
              className={cn(
                buttonVariants({ variant: "outline", className: "w-full cursor-pointer" }),
                "gap-2",
                results.dailyWh === 0 && "pointer-events-none opacity-50",
              )}
            >
              <Printer className="size-4" /> Print Assessment Report
            </Link>
            <Link
              href="/dashboard"
              className={cn(
                buttonVariants({
                  variant: "ghost",
                  className: "text-muted-foreground hover:text-foreground w-full cursor-pointer",
                }),
                "gap-1",
              )}
            >
              Back to Dashboard <ChevronRight className="size-4" />
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
