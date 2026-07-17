import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import PrintButton from "@/components/ui/print-button";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SelectedAppliance } from "@/features/calculator/assessment-service";
import { ChevronLeft, Zap, ShieldCheck } from "lucide-react";

export default async function AssessmentReportPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch profile details
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  // Fetch properties details
  const { data: property } = await supabase
    .from("properties")
    .select("*")
    .eq("profile_id", user.id)
    .single();

  // Fetch saved assessment details
  const { data: assessment } = await supabase
    .from("assessments")
    .select("*")
    .eq("profile_id", user.id)
    .single();

  if (!assessment) {
    redirect("/assessment");
  }

  const selected = (assessment.appliances as SelectedAppliance[]).filter((app) => app.quantity > 0);

  const clientName = profile?.full_name || user.email;
  const stateName = profile?.state || "Not specified";
  const lgaName = profile?.lga || "Not specified";

  return (
    <div className="bg-card border-border animate-in fade-in mx-auto max-w-4xl space-y-8 rounded-xl border p-8 shadow-xs duration-200 md:p-12 print:border-0 print:p-0 print:shadow-none">
      {/* Top action controls (hidden on print) */}
      <div className="border-border/60 flex flex-col gap-4 border-b pb-5 sm:flex-row sm:items-center sm:justify-between print:hidden">
        <Link
          href="/assessment"
          className={cn(
            buttonVariants({ variant: "ghost", size: "sm" }),
            "text-muted-foreground hover:text-foreground cursor-pointer gap-1",
          )}
        >
          <ChevronLeft className="size-4" /> Edit Assessment
        </Link>
        <PrintButton />
      </div>

      {/* Report Header Letterhead */}
      <div className="border-border/80 flex flex-col items-start justify-between gap-6 border-b pb-6 md:flex-row">
        <div className="space-y-2">
          <div className="text-primary flex items-center space-x-2 text-xl font-black">
            <Zap className="size-6 fill-current" />
            <span>GRIDLESS AFRICA</span>
          </div>
          <h1 className="text-foreground text-2xl font-black tracking-tight sm:text-3xl">
            Solar Energy Audit Report
          </h1>
          <p className="text-muted-foreground text-xs">
            System Recommendation & Sizing Specifications
          </p>
        </div>

        <div className="text-muted-foreground space-y-1 text-left text-xs md:text-right">
          <div>
            <strong className="text-foreground">Date:</strong>{" "}
            {new Date(assessment.updated_at).toLocaleDateString()}
          </div>
          <div>
            <strong className="text-foreground">Client:</strong> {clientName}
          </div>
          <div>
            <strong className="text-foreground">Region:</strong> {lgaName}, {stateName} State
          </div>
          {property?.building_type && (
            <div>
              <strong className="text-foreground">Building:</strong> {property.building_type} (
              {property.ownership})
            </div>
          )}
        </div>
      </div>

      {/* Appliance Audit Table */}
      <div className="space-y-3">
        <h3 className="text-foreground text-sm font-bold tracking-wider uppercase">
          Appliance Consumption Registry
        </h3>
        <div className="border-border/60 overflow-hidden rounded-lg border">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="bg-muted/40 border-border/60 text-muted-foreground border-b font-semibold">
                <th className="p-3">Appliance</th>
                <th className="p-3 text-center">Qty</th>
                <th className="p-3 text-center">Runtime (hrs)</th>
                <th className="p-3 text-right">Power (W)</th>
                <th className="p-3 text-right">Daily Wh</th>
              </tr>
            </thead>
            <tbody className="divide-border/40 divide-y">
              {selected.map((app) => (
                <tr key={app.id} className="text-foreground">
                  <td className="p-3 font-medium">{app.name}</td>
                  <td className="p-3 text-center">{app.quantity}</td>
                  <td className="p-3 text-center">{app.hours} hrs</td>
                  <td className="p-3 text-right">{app.power} W</td>
                  <td className="p-3 text-right">
                    {(app.power * app.quantity * app.hours).toLocaleString()} Wh
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sizing Recommendations Box */}
      <div className="grid grid-cols-1 gap-6 pt-4 md:grid-cols-2">
        {/* Recommendation details */}
        <div className="border-border bg-muted/10 space-y-4 rounded-xl border p-6">
          <h3 className="text-foreground text-sm font-extrabold tracking-wider uppercase">
            Recommended Hardware Sizing
          </h3>

          <div className="text-muted-foreground space-y-3 text-xs">
            <div className="border-border/40 flex justify-between border-b pb-1.5">
              <span>Inverter Capacity:</span>
              <strong className="text-foreground">{assessment.recommended_inverter_kva} kVa</strong>
            </div>
            <div className="border-border/40 flex justify-between border-b pb-1.5">
              <span>Lithium Battery Storage:</span>
              <strong className="text-foreground">{assessment.recommended_battery_kwh} kWh</strong>
            </div>
            <div className="border-border/40 flex justify-between border-b pb-1.5">
              <span>Solar Panel Capacity:</span>
              <strong className="text-foreground">
                {assessment.recommended_solar_w > 0
                  ? `${assessment.recommended_solar_w} Watts`
                  : "Not required"}
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Sizing Scale Category:</span>
              <strong className="text-primary capitalize">{assessment.category} System</strong>
            </div>
          </div>
        </div>

        {/* Load Sizing Summary */}
        <div className="border-border bg-muted/10 space-y-4 rounded-xl border p-6">
          <h3 className="text-foreground text-sm font-extrabold tracking-wider uppercase">
            Energy Demand Summary
          </h3>

          <div className="text-muted-foreground space-y-3 text-xs">
            <div className="border-border/40 flex justify-between border-b pb-1.5">
              <span>Peak Coincident Load:</span>
              <strong className="text-foreground">{assessment.peak_load_w} Watts</strong>
            </div>
            <div className="border-border/40 flex justify-between border-b pb-1.5">
              <span>Total Daily Consumption:</span>
              <strong className="text-foreground">{assessment.daily_kwh} kWh/day</strong>
            </div>
            <div className="border-border/40 flex justify-between border-b pb-1.5">
              <span>Energy Year demand:</span>
              <strong className="text-foreground">
                {(assessment.daily_kwh * 365).toFixed(0)} kWh/year
              </strong>
            </div>
            <div className="flex justify-between">
              <span>Target Autonomy runtime:</span>
              <strong className="text-foreground">12 Hours (approx)</strong>
            </div>
          </div>
        </div>
      </div>

      {/* Safety Escrow Bid Banner */}
      <div className="space-y-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-6">
        <div className="flex items-center space-x-2 text-sm font-bold text-emerald-600">
          <ShieldCheck className="size-5 shrink-0" />
          <span>Gridless Africa Verification Shield</span>
        </div>
        <p className="text-muted-foreground text-xs leading-relaxed">
          This energy audit report was compiled using standard engineering parameters adjusted for
          Nigerian meteorological peak sun hours. This data structure has been verified and
          registered to your profile. Vetted installers on Gridless Africa will quote against these
          exact hardware metrics to prevent equipment oversizing or undersizing.
        </p>
      </div>

      {/* Report Footer */}
      <div className="border-border text-muted-foreground border-t pt-6 text-center text-[10px] leading-relaxed">
        <p>Gridless Africa Marketplace • Lagos & Oyo State geofenced Solar Infrastructure</p>
        <p className="mt-0.5">
          Report generated securely via authenticated client session. All rights reserved.
        </p>
      </div>
    </div>
  );
}
