import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ShieldCheck, Calculator, Compass, Zap, ChevronRight } from "lucide-react";
import { InstallerShowcase } from "@/components/installer-showcase";
import { GeneratorRoiCalculator } from "@/features/calculator/generator-roi-calculator";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full overflow-hidden py-20 md:py-32">
        {/* Background Video */}
        <video autoPlay loop muted playsInline className="absolute inset-0 size-full object-cover">
          <source src="/hero-video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-slate-950/70" />

        <div className="relative z-10 container mx-auto max-w-6xl space-y-8 px-4 text-center">
          <div className="animate-fade-in inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-semibold text-white">
            <Zap className="size-3.5 fill-current text-amber-400" /> Nigeria&apos;s Trusted Solar
            Infrastructure Marketplace
          </div>

          <h1 className="mx-auto max-w-4xl text-4xl leading-tight font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
            Transition to Reliable Solar Power with{" "}
            <span className="text-secondary font-black">Absolute Trust</span>
          </h1>

          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg md:text-xl">
            Bridge the grid reliability gap. Size your custom appliance load, compare competitive
            bids from vetted installers, and secure your payment in escrow.
          </p>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center">
            <Link
              href="/calculator"
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
                className: "cursor-pointer gap-2 px-8 font-bold shadow-sm",
              })}
            >
              <Calculator className="size-5" /> Calculate Your Savings
            </Link>
            <Link
              href="/installers"
              className={buttonVariants({
                variant: "ghost",
                size: "lg",
                className:
                  "cursor-pointer border border-white px-8 font-semibold text-white hover:bg-white/10 hover:text-white",
              })}
            >
              Browse Verified Installers
            </Link>
          </div>
        </div>
      </section>

      {/* Escrow Trust Shield Banner */}
      <section className="border-border bg-card w-full border-y py-6">
        <div className="container mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 md:flex-row">
          <div className="flex items-center space-x-3 text-left">
            <div className="flex size-12 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-600">
              <ShieldCheck className="size-7" />
            </div>
            <div>
              <h3 className="text-foreground text-sm font-bold">Escrow Protected Payments</h3>
              <p className="text-muted-foreground text-xs">
                Funds are held securely and released to installers only upon milestone sign-off.
              </p>
            </div>
          </div>
          <div className="text-muted-foreground flex items-center space-x-6 text-xs font-semibold">
            <span>✓ Paystack Secure Checkout</span>
            <span>✓ CAC Vetted Installers</span>
            <span>✓ Nigeria-Wide Escrow Safety</span>
          </div>
        </div>
      </section>

      {/* Generator ROI Calculator Section */}
      <section className="border-border w-full border-b bg-slate-50 py-16 md:py-24 dark:bg-slate-900">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-10 space-y-3 text-center">
            <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
              Stop Burning Cash on Generator Fuel
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base">
              Use our interactive calculator to see exactly how fast a solar system pays for itself
              in Nigeria.
            </p>
          </div>
          <GeneratorRoiCalculator />
        </div>
      </section>

      {/* Installer Showcase Deck */}
      <section className="border-border relative w-full overflow-hidden border-b py-16 md:py-24">
        {/* Decorative background for glass morphism */}
        <div className="from-primary/10 via-secondary/10 to-primary/10 absolute top-1/2 left-1/2 -z-10 h-full w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r blur-[100px]" />

        <div className="container mx-auto max-w-6xl space-y-10 px-4">
          <div className="space-y-3 text-center">
            <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
              Matched with Verified Regional Experts
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base">
              We connect you exclusively with CAC-registered installers who have proven track
              records in your State.
            </p>
          </div>

          <InstallerShowcase />
        </div>
      </section>

      {/* Market Bottlenecks & Solutions Grid */}
      <section className="container mx-auto max-w-6xl space-y-16 px-4 py-16 md:py-24">
        <div className="space-y-4 text-center">
          <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
            Tackling the Bottlenecks of Nigerian Solar
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base">
            We eliminate risk, guarantee equipment standards, and match you with regional experts.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="border-border bg-card rounded-xl border p-6 shadow-xs transition-shadow hover:shadow-md">
            <div className="bg-primary text-primary-foreground mb-4 flex size-10 items-center justify-center rounded-lg">
              <Calculator className="size-5" />
            </div>
            <h3 className="text-foreground mb-2 text-lg font-bold">1. Solar Savings Calculator</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Input your appliances, current monthly fuel spend, and location. Our sizer outputs
              recommended inverter, battery, and panel counts instantly.
            </p>
          </div>

          <div className="border-border bg-card rounded-xl border p-6 shadow-xs transition-shadow hover:shadow-md">
            <div className="bg-secondary text-secondary-foreground mb-4 flex size-10 items-center justify-center rounded-lg">
              <Compass className="size-5" />
            </div>
            <h3 className="text-foreground mb-2 text-lg font-bold">2. Geofenced Bidding</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Your generated lead is broadcasted to vetted regional installers in Oyo and Lagos.
              Receive up to 3 competitive, standardized quotes within 48 hours.
            </p>
          </div>

          <div className="border-border bg-card rounded-xl border p-6 shadow-xs transition-shadow hover:shadow-md">
            <div className="bg-primary text-primary-foreground mb-4 flex size-10 items-center justify-center rounded-lg">
              <ShieldCheck className="size-5" />
            </div>
            <h3 className="text-foreground mb-2 text-lg font-bold">3. Milestone Escrow Release</h3>
            <p className="text-muted-foreground text-xs leading-relaxed">
              Verify each phase of the installation. Once you sign off, Paystack releases that
              milestone&apos;s funds to the installer. Maximum project safety.
            </p>
          </div>
        </div>
      </section>

      {/* Target Audiences: Residential & Commercial */}
      <section className="bg-muted/30 border-border w-full border-t py-16 md:py-24">
        <div className="container mx-auto max-w-6xl space-y-12 px-4">
          <div className="space-y-4 text-center">
            <h2 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
              Solar Solutions For Every Scale
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-sm md:text-base">
              Designed for residential peace of mind and commercial economic growth.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="border-border bg-card flex flex-col justify-between space-y-6 rounded-xl border p-8">
              <div className="space-y-4">
                <div className="bg-primary/10 text-primary inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  Residential
                </div>
                <h3 className="text-foreground text-2xl font-bold">Power Your Household</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Run lightings, TVs, freezers, and critical pumps without noisy generators. Cut
                  fuel bills and secure immediate energy independence.
                </p>
              </div>
              <Link
                href="/calculator"
                className="text-primary flex items-center gap-1 text-sm font-bold hover:underline"
              >
                Size Home System <ChevronRight className="size-4" />
              </Link>
            </div>

            <div className="border-border bg-card flex flex-col justify-between space-y-6 rounded-xl border p-8">
              <div className="space-y-4">
                <div className="bg-secondary/10 text-secondary-foreground inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  Commercial
                </div>
                <h3 className="text-foreground text-2xl font-bold">Infrastructure for SMEs</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  Eliminate business downtime. Shield inventory and operations from grid failures,
                  protect operating margins, and highlight clean energy adoption.
                </p>
              </div>
              <Link
                href="/calculator"
                className="text-primary flex items-center gap-1 text-sm font-bold hover:underline"
              >
                Estimate SME ROI <ChevronRight className="size-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="bg-primary text-primary-foreground relative w-full overflow-hidden py-20 text-center">
        <div className="relative z-10 container mx-auto max-w-4xl space-y-6 px-4">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl md:text-5xl">
            Empower Your Business or Home Today
          </h2>
          <p className="text-primary-foreground/80 mx-auto max-w-xl text-sm leading-relaxed md:text-base">
            Transition to solar with verified engineering firms, transparent hardware
            specifications, and secure escrow accounts.
          </p>
          <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center">
            <Link
              href="/calculator"
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
                className: "cursor-pointer gap-2 px-8 font-bold",
              })}
            >
              <Calculator className="size-5" /> Calculate Savings Now
            </Link>
            <Link
              href="/login"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary cursor-pointer px-8",
              })}
            >
              Sign Up to Portal
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
