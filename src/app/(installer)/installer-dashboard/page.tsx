import React from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import LeadsList from "@/features/quotes/leads-list";
import InstallerOnboardingWizard from "@/features/onboarding/installer-onboarding-wizard";
import { Card } from "@/components/ui/card";
import {
  AlertTriangle,
  ShieldCheck,
  Clock,
  AlertCircle,
  Briefcase,
  Award,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default async function InstallerDashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Fetch installer profile details
  const { data: profile } = await supabase
    .from("installer_profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const onboardingCompleted = profile?.onboarding_completed || false;
  const verificationStatus = profile?.verification_status || "pending";

  // If onboarding is incomplete, render the onboarding wizard flow
  if (!onboardingCompleted) {
    return <InstallerOnboardingWizard />;
  }

  // Fetch certifications and portfolios for dashboard display
  const { data: certs } = await supabase
    .from("installer_certifications")
    .select("*")
    .eq("installer_id", user.id);

  const { data: portfolios } = await supabase
    .from("installer_portfolios")
    .select("*")
    .eq("installer_id", user.id);

  return (
    <div className="animate-in fade-in max-w-5xl space-y-8 duration-200">
      <div className="border-border flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-foreground text-3xl font-extrabold tracking-tight">
            Installer Control Center
          </h1>
          <p className="text-muted-foreground mt-1 text-sm">
            Browse regional customer leads, manage active bids, and monitor escrow payouts.
          </p>
        </div>
        <div className="flex items-center space-x-2 text-xs">
          <span className="text-muted-foreground">Verification status:</span>
          <span
            className={cn(
              "rounded-md px-3 py-1 text-[10px] font-bold uppercase",
              verificationStatus === "approved"
                ? "border border-emerald-500/20 bg-emerald-500/10 text-emerald-600"
                : verificationStatus === "rejected"
                  ? "bg-destructive/10 text-destructive border-destructive/20 border"
                  : "border border-amber-500/20 bg-amber-500/10 text-amber-500",
            )}
          >
            {verificationStatus === "approved"
              ? "Verified Partner"
              : verificationStatus === "rejected"
                ? "Rejected"
                : verificationStatus === "under_review"
                  ? "Under Review"
                  : "Pending"}
          </span>
        </div>
      </div>

      {/* Dynamic Verification Status Banners */}
      {verificationStatus === "approved" ? (
        <div className="animate-in slide-in-from-top-2 flex items-start space-x-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-5 duration-200">
          <ShieldCheck className="mt-0.5 size-5 shrink-0 text-emerald-600" />
          <div className="space-y-1">
            <h4 className="text-foreground text-sm font-bold">Verified Solar Partner Account</h4>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Your credentials have been successfully verified! You have full bidding privileges on
              matching customer leads. Ensure your coverage geography is up to date in settings.
            </p>
          </div>
        </div>
      ) : verificationStatus === "rejected" ? (
        <div className="border-destructive/20 bg-destructive/5 animate-in slide-in-from-top-2 flex items-start space-x-3 rounded-xl border p-5 duration-200">
          <AlertCircle className="text-destructive mt-0.5 size-5 shrink-0" />
          <div className="space-y-1">
            <h4 className="text-foreground text-destructive text-sm font-bold">
              Bidding Privileges Disabled: Verification Failed
            </h4>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Your business registration (CAC) or professional engineering certifications could not
              be validated. Please review your uploaded documentation or contact our administration
              helpdesk to appeal.
            </p>
          </div>
        </div>
      ) : (
        <div className="animate-in slide-in-from-top-2 flex items-start space-x-3 rounded-xl border border-amber-500/20 bg-amber-500/5 p-5 duration-200">
          <Clock className="mt-0.5 size-5 shrink-0 text-amber-500" />
          <div className="space-y-1">
            <h4 className="text-foreground text-sm font-bold">Business Vetting Under Review</h4>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Our support team is manually vetting your rc-number, team engineers, and licenses.
              Bidding leads will be activated as soon as your account is approved.
            </p>
          </div>
        </div>
      )}

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
        <Card className="border-border bg-card space-y-2 border p-6 shadow-xs">
          <span className="text-muted-foreground text-[10px] font-bold tracking-wider uppercase">
            My Active Bids
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-foreground text-3xl font-black">0</span>
            <span className="text-muted-foreground text-xs">Submitted</span>
          </div>
        </Card>

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
            Escrow Payouts
          </span>
          <div className="flex items-baseline space-x-2">
            <span className="text-primary text-3xl font-black">₦0.00</span>
            <span className="text-muted-foreground text-xs">Cleared</span>
          </div>
        </Card>
      </div>

      {/* Main Grid: Leads feed and installer details */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        {/* Leads Feed (Takes 2 columns) */}
        <div className="space-y-6 lg:col-span-2">
          <div className="border-border flex items-center justify-between border-b pb-3">
            <h3 className="text-foreground text-sm font-bold tracking-wider uppercase">
              Matching Customer Leads ({profile.operating_states.join(", ")})
            </h3>
          </div>
          {verificationStatus === "approved" ? (
            <LeadsList />
          ) : (
            <Card className="border-border bg-card flex flex-col items-center justify-center space-y-4 border p-12 text-center shadow-xs">
              <div className="flex size-12 items-center justify-center rounded-full bg-amber-500/10 text-amber-500">
                <AlertTriangle className="size-6" />
              </div>
              <div className="max-w-sm space-y-1">
                <h4 className="text-foreground text-sm font-bold">Leads Locked</h4>
                <p className="text-muted-foreground text-xs leading-relaxed">
                  Bidding on regional customer energy requests requires an active verified partner
                  account status.
                </p>
              </div>
            </Card>
          )}
        </div>

        {/* Credentials and business settings sidebar (Takes 1 column) */}
        <div className="space-y-6 lg:col-span-1">
          {/* Company details card */}
          <Card className="border-border bg-card space-y-5 border p-6 shadow-xs">
            <div className="border-border text-foreground flex items-center space-x-2 border-b pb-3 font-bold">
              <Briefcase className="text-primary size-4" />
              <span className="text-xs tracking-wider uppercase">Company Specs</span>
            </div>

            <div className="text-muted-foreground space-y-3.5 text-xs">
              <div className="border-border/40 flex justify-between border-b pb-1.5">
                <span>Name:</span>
                <strong className="text-foreground">{profile.company_name}</strong>
              </div>
              {profile.rc_number && (
                <div className="border-border/40 flex justify-between border-b pb-1.5">
                  <span>RC Number:</span>
                  <strong className="text-foreground">{profile.rc_number}</strong>
                </div>
              )}
              <div className="border-border/40 flex justify-between border-b pb-1.5">
                <span>Years Exp:</span>
                <strong className="text-foreground">{profile.years_of_experience} yrs</strong>
              </div>
              <div className="border-border/40 flex justify-between border-b pb-1.5">
                <span>Technicians:</span>
                <strong className="text-foreground">{profile.technicians_count}</strong>
              </div>
              <div className="border-border/40 flex justify-between border-b pb-1.5">
                <span>Engineers:</span>
                <strong className="text-foreground">{profile.engineers_count}</strong>
              </div>
              <div className="border-border/40 flex justify-between border-b pb-1.5">
                <span>Support Staff:</span>
                <strong className="text-foreground">{profile.support_staff_count}</strong>
              </div>
              <div className="flex justify-between">
                <span>Portfolio Projects:</span>
                <strong className="text-foreground">{portfolios?.length || 0} projects</strong>
              </div>
            </div>
          </Card>

          {/* Certifications and Portfolio summary */}
          <Card className="border-border bg-card space-y-5 border p-6 shadow-xs">
            <div className="border-border text-foreground flex items-center space-x-2 border-b pb-3 font-bold">
              <Award className="text-primary size-4" />
              <span className="text-xs tracking-wider uppercase">My Certifications</span>
            </div>

            {certs && certs.length > 0 ? (
              <div className="space-y-3">
                {certs.map((c) => (
                  <div
                    key={c.id}
                    className="bg-muted/20 border-border/40 flex items-center justify-between rounded-lg border p-2 text-xs"
                  >
                    <div className="space-y-0.5">
                      <p className="text-foreground font-semibold">{c.name}</p>
                      {c.license_number && (
                        <p className="text-muted-foreground text-[10px]">ID: {c.license_number}</p>
                      )}
                    </div>
                    <a
                      href={c.document_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary flex items-center gap-0.5 text-[10px] hover:underline"
                    >
                      View <ExternalLink className="size-3" />
                    </a>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-muted-foreground text-[10px]">No certifications loaded.</p>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
