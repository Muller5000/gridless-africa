import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Plus,
  Sparkles,
  AlertCircle,
  ArrowRight,
  UserCheck,
  Printer,
  Flame,
  Battery,
  Sun,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default async function CustomerDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch user profile status
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single();

  // Fetch energy assessment details
  const { data: assessment } = await supabase
    .from("assessments")
    .select("*")
    .eq("profile_id", user.id)
    .single();

  const onboardingCompleted = profile?.onboarding_completed || false;
  const currentStep = profile?.onboarding_step || 1;
  const hasAssessment = !!assessment;

  // Calculate unified profile completion percentage
  let completionPercent = 0;
  if (onboardingCompleted && hasAssessment) {
    completionPercent = 100;
  } else if (onboardingCompleted) {
    completionPercent = 75;
  } else if (currentStep === 3) {
    completionPercent = 50;
  } else if (currentStep === 2) {
    completionPercent = 25;
  }

  const welcomeName = profile?.full_name || user.user_metadata?.full_name || user.email;

  return (
    <div className="max-w-5xl space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-extrabold tracking-tight">
            Welcome, {welcomeName}!
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Manage your solar savings calculator results, bid comparisons, and escrow.
          </p>
        </div>
        {hasAssessment && (
          <Link
            href="/assessment"
            className={cn(buttonVariants(), "cursor-pointer gap-2 shadow-xs")}
          >
            <Plus className="size-4" /> Recalculate Sizing
          </Link>
        )}
      </div>

      {/* Profile Completion and Next Actions Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Progress Card */}
        <Card className="border-border bg-card flex flex-col justify-between space-y-4 border p-6 shadow-xs md:col-span-1">
          <div className="space-y-1">
            <span className="text-muted-foreground block text-[10px] font-bold tracking-wider uppercase">
              Profile Setup Progress
            </span>
            <div className="flex items-center space-x-3 pt-2">
              {/* Visual dial */}
              <div className="border-muted relative flex size-16 shrink-0 items-center justify-center rounded-full border-4">
                <span className="text-xs font-bold">{completionPercent}%</span>
                {/* Visual circle fill */}
                <svg className="absolute inset-0 size-full -rotate-90">
                  <circle
                    cx="32"
                    cy="32"
                    r="28"
                    stroke="var(--color-primary)"
                    strokeWidth="4"
                    fill="transparent"
                    strokeDasharray={175}
                    strokeDashoffset={175 - (175 * completionPercent) / 100}
                    className="transition-all duration-500"
                  />
                </svg>
              </div>
              <div>
                <h4 className="text-foreground text-sm font-bold">
                  {completionPercent === 100 ? "Verification Ready" : "Setup Required"}
                </h4>
                <p className="text-muted-foreground mt-0.5 text-[10px] leading-relaxed">
                  {completionPercent === 100
                    ? "Your customer profile and energy audit are complete."
                    : completionPercent >= 75
                      ? "Onboarding done. Next: Appliance audit sizer."
                      : "Fill out property & electricity settings."}
                </p>
              </div>
            </div>
          </div>

          {completionPercent < 100 && (
            <Link
              href={onboardingCompleted ? "/assessment" : "/onboarding"}
              className={cn(
                buttonVariants({ variant: "outline", size: "sm" }),
                "w-full cursor-pointer",
              )}
            >
              Resume Setup
            </Link>
          )}
        </Card>

        {/* Dynamic Next Action Widget */}
        <Card className="border-border bg-card flex flex-col justify-between space-y-4 border p-6 shadow-xs md:col-span-2">
          <div className="space-y-1.5">
            <span className="text-muted-foreground block text-[10px] font-bold tracking-wider uppercase">
              Recommended Next Action
            </span>
            <div className="flex items-start space-x-3 pt-1">
              {completionPercent === 100 ? (
                <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" />
              ) : onboardingCompleted ? (
                <Sparkles className="text-primary mt-0.5 size-5 shrink-0" />
              ) : (
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-amber-500" />
              )}
              <div>
                <h4 className="text-foreground text-sm font-bold">
                  {completionPercent === 100
                    ? "Review Sizing Recommendations"
                    : onboardingCompleted
                      ? "Complete Energy Load Assessment"
                      : "Complete Onboarding Registration"}
                </h4>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  {completionPercent === 100
                    ? `Audit completed. Your required hardware sizing is locked to your profile. Vetted installers can bid on these specifications.`
                    : onboardingCompleted
                      ? "Estimate required inverter sizes, lithium batteries, and solar panel quantities to match certified installers."
                      : "Finish contact details and structural building details to solicit quotes."}
                </p>
              </div>
            </div>
          </div>

          <div>
            <Link
              href={
                completionPercent === 100
                  ? "/assessment/report"
                  : onboardingCompleted
                    ? "/assessment"
                    : "/onboarding"
              }
              className={cn(buttonVariants({ size: "sm" }), "cursor-pointer gap-1.5")}
            >
              {completionPercent === 100 ? (
                <>
                  Print Sizing Report <Printer className="size-4" />
                </>
              ) : onboardingCompleted ? (
                <>
                  Launch Appliance Audit <ArrowRight className="size-4" />
                </>
              ) : (
                <>
                  Complete Setup <UserCheck className="size-4" />
                </>
              )}
            </Link>
          </div>
        </Card>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card className="border-border bg-card space-y-2 border p-6 shadow-xs">
          <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
            Active Projects
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-foreground text-3xl font-black">0</span>
            <span className="text-muted-foreground text-xs">In progress</span>
          </div>
        </Card>

        <Card className="border-border bg-card space-y-2 border p-6 shadow-xs">
          <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
            Pending Quotes
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-foreground text-3xl font-black">0</span>
            <span className="text-muted-foreground text-xs">Bids received</span>
          </div>
        </Card>

        <Card className="border-border bg-card space-y-2 border p-6 shadow-xs">
          <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
            Escrow Ledger
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-primary text-3xl font-black">₦0.00</span>
            <span className="text-xs font-medium text-emerald-600">Secured</span>
          </div>
        </Card>
      </div>

      {/* Sizing Recommendations details dashboard card */}
      {hasAssessment ? (
        <Card className="border-border bg-card space-y-6 border p-6 shadow-xs">
          <div className="border-border flex items-center justify-between border-b pb-3">
            <h3 className="text-foreground text-sm font-bold tracking-wider uppercase">
              My Verified Energy Specification
            </h3>
            <span className="bg-primary/10 text-primary rounded-md px-2.5 py-0.5 text-[10px] font-semibold capitalize">
              {assessment.category} System
            </span>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="border-border bg-muted/20 flex items-center space-x-3 rounded-xl border p-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500">
                <Flame className="size-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-muted-foreground text-[9px] font-semibold tracking-wider uppercase">
                  Inverter size
                </span>
                <p className="text-foreground text-sm font-extrabold">
                  {assessment.recommended_inverter_kva} kVa
                </p>
              </div>
            </div>

            <div className="border-border bg-muted/20 flex items-center space-x-3 rounded-xl border p-4">
              <div className="bg-primary/10 text-primary flex size-9 shrink-0 items-center justify-center rounded-lg">
                <Battery className="size-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-muted-foreground text-[9px] font-semibold tracking-wider uppercase">
                  Battery Storage
                </span>
                <p className="text-foreground text-sm font-extrabold">
                  {assessment.recommended_battery_kwh} kWh
                </p>
              </div>
            </div>

            <div className="border-border bg-muted/20 flex items-center space-x-3 rounded-xl border p-4">
              <div className="bg-secondary/15 text-secondary-foreground flex size-9 shrink-0 items-center justify-center rounded-lg">
                <Sun className="size-5" />
              </div>
              <div className="space-y-0.5">
                <span className="text-muted-foreground text-[9px] font-semibold tracking-wider uppercase">
                  Solar capacity
                </span>
                <p className="text-foreground text-sm font-extrabold">
                  {assessment.recommended_solar_w > 0
                    ? `${assessment.recommended_solar_w} W`
                    : "0 W"}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Link
              href="/assessment"
              className={cn(buttonVariants({ variant: "outline", size: "sm" }), "cursor-pointer")}
            >
              Edit Audit
            </Link>
            <Link
              href="/assessment/report"
              className={cn(buttonVariants({ size: "sm" }), "cursor-pointer gap-1.5")}
            >
              <Printer className="size-4" /> View Report
            </Link>
          </div>
        </Card>
      ) : onboardingCompleted ? (
        <Card className="border-border bg-card flex flex-col items-center justify-center space-y-6 border p-12 text-center shadow-xs">
          <div className="bg-primary/5 text-primary flex size-14 items-center justify-center rounded-full">
            <Sparkles className="size-8" />
          </div>
          <div className="max-w-sm space-y-2">
            <h3 className="text-foreground text-lg font-bold">Estimate Solar System Sizing</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Define your appliances and operations profile to calculate inverter kVa capacity,
              lithium batteries, and payback period.
            </p>
          </div>
          <Link
            href="/assessment"
            className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer")}
          >
            Launch Appliance Audit Sizer
          </Link>
        </Card>
      ) : (
        <Card className="border-border bg-card flex flex-col items-center justify-center space-y-6 border p-12 text-center shadow-xs">
          <div className="flex size-14 items-center justify-center rounded-full bg-amber-500/5 text-amber-500">
            <AlertCircle className="size-8" />
          </div>
          <div className="max-w-sm space-y-2">
            <h3 className="text-foreground text-lg font-bold">Setup Your Profile First</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Please complete your onboarding profile details so installers can estimate logistics
              and roofing parameters for bids.
            </p>
          </div>
          <Link
            href="/onboarding"
            className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer")}
          >
            Complete Profile Setup
          </Link>
        </Card>
      )}
    </div>
  );
}
