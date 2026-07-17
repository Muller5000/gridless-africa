import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Sparkles, AlertCircle, ArrowRight, UserCheck } from "lucide-react";
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

  const onboardingCompleted = profile?.onboarding_completed || false;
  const currentStep = profile?.onboarding_step || 1;

  // Calculate completion percentage
  let completionPercent = 0;
  if (onboardingCompleted) {
    completionPercent = 100;
  } else if (currentStep === 2) {
    completionPercent = 33;
  } else if (currentStep === 3) {
    completionPercent = 66;
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
        {onboardingCompleted && (
          <Link
            href="/calculator"
            className={cn(buttonVariants(), "cursor-pointer gap-2 shadow-xs")}
          >
            <Plus className="size-4" /> New Sizing Request
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
                  {onboardingCompleted ? "Verification Ready" : "Onboarding Setup"}
                </h4>
                <p className="text-muted-foreground mt-0.5 text-[10px] leading-relaxed">
                  {onboardingCompleted
                    ? "Your customer profile is complete and stored."
                    : "Fill out property & electricity settings."}
                </p>
              </div>
            </div>
          </div>

          {!onboardingCompleted && (
            <Link
              href="/onboarding"
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
              {onboardingCompleted ? (
                <Sparkles className="text-primary mt-0.5 size-5 shrink-0" />
              ) : (
                <AlertCircle className="mt-0.5 size-5 shrink-0 text-amber-500" />
              )}
              <div>
                <h4 className="text-foreground text-sm font-bold">
                  {onboardingCompleted
                    ? "Complete Energy Assessment"
                    : "Complete Onboarding Registration"}
                </h4>
                <p className="text-muted-foreground mt-1 text-xs leading-relaxed">
                  {onboardingCompleted
                    ? "Estimate required inverter sizes, lithium batteries, and payback period to match CAC certified installers."
                    : "Finish contact details and structural building details to solicit quotes."}
                </p>
              </div>
            </div>
          </div>

          <div>
            <Link
              href={onboardingCompleted ? "/calculator" : "/onboarding"}
              className={cn(buttonVariants({ size: "sm" }), "cursor-pointer gap-1.5")}
            >
              {onboardingCompleted ? (
                <>
                  Launch Solar Sizer <ArrowRight className="size-4" />
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

      {/* Empty State Showcase */}
      {onboardingCompleted ? (
        <Card className="border-border bg-card flex flex-col items-center justify-center space-y-6 border p-12 text-center shadow-xs">
          <div className="bg-primary/5 text-primary flex size-14 items-center justify-center rounded-full">
            <Sparkles className="size-8" />
          </div>
          <div className="max-w-sm space-y-2">
            <h3 className="text-foreground text-lg font-bold">Initiate Solar Procurement</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Calculate appliance loads contextualized for Lagos & Oyo. Standardize inverter kVa and
              battery requirements automatically.
            </p>
          </div>
          <Link
            href="/calculator"
            className={cn(buttonVariants({ variant: "outline" }), "cursor-pointer")}
          >
            Launch Solar Sizer
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
