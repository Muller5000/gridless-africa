import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import {
  ShieldCheck,
  Calculator,
  Compass,
  ChevronRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import { InstallerShowcase } from "@/components/installer-showcase";
import { GeneratorRoiCalculator } from "@/features/calculator/generator-roi-calculator";
import { HeroQuickQuote } from "@/components/hero-quick-quote";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section: Rich Visual Showcase + Instant Quote Match */}
      <section className="border-border/40 from-background via-muted/20 to-background relative w-full overflow-hidden border-b bg-gradient-to-b pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Subtle decorative background glow */}
        <div className="from-primary/10 via-secondary/10 absolute top-0 left-1/2 -z-10 h-[500px] w-full max-w-7xl -translate-x-1/2 rounded-full bg-gradient-to-tr to-transparent opacity-70 blur-[140px]" />

        <div className="container mx-auto max-w-6xl space-y-12 px-4">
          {/* Top Headline & Value Narrative Block */}
          <div className="grid grid-cols-1 items-end gap-8 lg:grid-cols-12">
            <div className="space-y-4 lg:col-span-8">
              <div className="border-primary/20 bg-primary/10 text-primary inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs font-bold">
                <ShieldCheck className="text-primary size-4" />
                <span>Nigeria&apos;s Verified Solar Marketplace</span>
              </div>

              <h1 className="text-foreground text-4xl font-black tracking-tight sm:text-5xl md:text-6xl lg:leading-[1.1]">
                Solar installations you can{" "}
                <span className="text-primary decoration-secondary underline decoration-wavy decoration-from-font">
                  actually trust.
                </span>
              </h1>
            </div>

            <div className="space-y-3 text-left lg:col-span-4">
              <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                Stop gambling with unverified contractors or counterfeit equipment. Compare
                standardized quotes from CAC-registered engineers, and hold your payment safely in
                escrow until the job passes inspection.
              </p>
              <div className="text-foreground flex items-center gap-3 text-xs font-bold">
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-4" /> 100% Escrow Protected
                </span>
                <span className="text-muted-foreground">•</span>
                <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="size-4" /> Vetted CAC Installers
                </span>
              </div>
            </div>
          </div>

          {/* Centerpiece: Visual Solar Home Image + Quick Quote Match Widget Side-by-Side */}
          <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-12">
            {/* Left Column: Visual Architectural Solar Home Photo with Component Highlights */}
            <div className="group border-border/80 relative flex min-h-[460px] flex-col justify-between overflow-hidden rounded-3xl border p-6 shadow-2xl transition-all sm:p-8 lg:col-span-7">
              {/* Background Solar Home Image */}
              <div
                className="absolute inset-0 bg-cover bg-center transition-transform duration-700 ease-out group-hover:scale-105"
                style={{ backgroundImage: `url('/hero-solar-home.jpg')` }}
              />

              {/* Gradient Scrim for text readability and cinematic depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/25 to-transparent" />

              {/* Top Floating Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-slate-950/80 px-3.5 py-1.5 text-xs font-extrabold text-white shadow-md backdrop-blur-md">
                  <Sparkles className="size-3.5 text-amber-400" /> Turnkey 5kVA Residential Setup
                </span>
                <span className="rounded-full bg-emerald-500/90 px-3 py-1 text-[11px] font-bold text-white shadow-md">
                  Active • Lagos State
                </span>
              </div>

              {/* Bottom Hardware Specs Callout */}
              <div className="relative z-10 space-y-3">
                <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  <div className="rounded-2xl border border-white/20 bg-slate-950/75 p-3 text-white shadow-lg backdrop-blur-md">
                    <span className="block text-[10px] font-bold tracking-wider text-slate-300 uppercase">
                      Rooftop Solar Array
                    </span>
                    <p className="mt-0.5 text-xs font-extrabold sm:text-sm">
                      8× 550W Tier-1 Panels
                    </p>
                  </div>
                  <div className="rounded-2xl border border-white/20 bg-slate-950/75 p-3 text-white shadow-lg backdrop-blur-md">
                    <span className="block text-[10px] font-bold tracking-wider text-slate-300 uppercase">
                      Lithium Storage
                    </span>
                    <p className="mt-0.5 text-xs font-extrabold sm:text-sm">
                      10kWh LiFePO4 Battery
                    </p>
                  </div>
                  <div className="col-span-2 rounded-2xl border border-white/20 bg-slate-950/75 p-3 text-white shadow-lg backdrop-blur-md sm:col-span-1">
                    <span className="block text-[10px] font-bold tracking-wider text-slate-300 uppercase">
                      Payment Safety
                    </span>
                    <p className="mt-0.5 text-xs font-extrabold text-emerald-400 sm:text-sm">
                      Paystack Escrow
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Interactive Quick Sizer & Quote Match Widget */}
            <div className="flex flex-col justify-center lg:col-span-5">
              <HeroQuickQuote />
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Impact Bar */}
      <section className="border-border bg-card w-full border-b py-8 shadow-xs">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="border-border/60 space-y-1 border-r pr-4 text-center last:border-none md:text-left">
              <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Escrow Protected
              </span>
              <p className="text-foreground text-2xl font-black">₦180M+</p>
              <p className="text-muted-foreground text-[11px]">Customer funds held safely</p>
            </div>

            <div className="border-border/60 space-y-1 border-r pr-4 text-center last:border-none md:text-left">
              <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Vetted Network
              </span>
              <p className="text-foreground text-2xl font-black">100%</p>
              <p className="text-muted-foreground text-[11px]">CAC & COREN registered</p>
            </div>

            <div className="border-border/60 space-y-1 border-r pr-4 text-center last:border-none md:text-left">
              <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Quote Delivery
              </span>
              <p className="text-foreground text-2xl font-black">&lt; 48 Hrs</p>
              <p className="text-muted-foreground text-[11px]">Standardized regional bids</p>
            </div>

            <div className="space-y-1 text-center md:text-left">
              <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Partner Security
              </span>
              <p className="text-2xl font-black text-emerald-600 dark:text-emerald-400">Paystack</p>
              <p className="text-muted-foreground text-[11px]">Milestone automated release</p>
            </div>
          </div>
        </div>
      </section>

      {/* Generator ROI Calculator Section */}
      <section className="border-border bg-muted/20 w-full border-b py-20 md:py-28">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="mb-12 space-y-4 text-center">
            <h2 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
              Stop burning cash on diesel.
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Use our interactive calculator to see exactly how fast a solar system pays for itself
              in Nigeria. No fluff, just math.
            </p>
          </div>
          <div className="mx-auto flex justify-center">
            <GeneratorRoiCalculator />
          </div>
        </div>
      </section>

      {/* Installer Showcase Deck */}
      <section className="border-border relative w-full overflow-hidden border-b py-20 md:py-28">
        {/* Decorative background for glass morphism */}
        <div className="from-primary/10 via-secondary/10 to-primary/10 absolute top-1/2 left-1/2 -z-10 h-full w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r blur-[100px]" />

        <div className="container mx-auto max-w-6xl space-y-12 px-4">
          <div className="space-y-4 text-center">
            <h2 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
              Local experts, vetted by us.
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              We don&apos;t let just anyone on our platform. We connect you exclusively with
              registered, proven installers in your State.
            </p>
          </div>

          <InstallerShowcase />
        </div>
      </section>

      {/* Market Bottlenecks & Solutions Grid */}
      <section className="container mx-auto max-w-6xl space-y-16 px-4 py-20 md:py-28">
        <div className="space-y-4 text-center">
          <h2 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
            How Gridless Africa Works
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
            We eliminate the risk of cowboy installers, guarantee equipment standards, and protect
            your hard-earned money.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="border-border bg-card group flex flex-col justify-between overflow-hidden rounded-3xl border p-10 shadow-sm transition-all hover:shadow-lg md:col-span-2 lg:col-span-2 lg:row-span-2">
            <div>
              <div className="bg-primary text-primary-foreground mb-8 flex size-14 items-center justify-center rounded-2xl shadow-sm">
                <Calculator className="size-7" />
              </div>
              <h3 className="text-foreground mb-4 text-3xl font-bold tracking-tight">
                1. Calculate your exact needs
              </h3>
              <p className="text-muted-foreground max-w-md text-base leading-relaxed">
                Tell us what appliances you want to run. Our smart sizer outputs the exact inverter
                capacity, battery storage, and panel counts you need. No more overpaying for
                oversized systems.
              </p>
            </div>
            <div className="mt-10 opacity-60 transition-opacity group-hover:opacity-100">
              <div className="from-primary/10 h-40 w-full rounded-2xl bg-gradient-to-br to-transparent" />
            </div>
          </div>

          <div className="border-border bg-card flex flex-col justify-center rounded-3xl border p-10 shadow-sm transition-all hover:shadow-lg lg:col-span-1">
            <div className="bg-secondary text-secondary-foreground mb-6 flex size-12 items-center justify-center rounded-2xl shadow-sm">
              <Compass className="size-6" />
            </div>
            <h3 className="text-foreground mb-3 text-2xl font-bold tracking-tight">
              2. Get competitive quotes
            </h3>
            <p className="text-muted-foreground text-base leading-relaxed">
              We broadcast your requirements to vetted installers in your area. Receive up to 3
              standardized quotes in 48 hours to compare apples-to-apples.
            </p>
          </div>

          <div className="border-primary bg-primary text-primary-foreground flex flex-col justify-center rounded-3xl border p-10 shadow-lg transition-all hover:-translate-y-1 lg:col-span-1">
            <div className="mb-6 flex size-12 items-center justify-center rounded-2xl bg-white/20 text-white backdrop-blur-sm">
              <ShieldCheck className="size-6" />
            </div>
            <h3 className="mb-3 text-2xl font-bold tracking-tight text-white">
              3. Pay safely in escrow
            </h3>
            <p className="text-primary-foreground/90 text-base leading-relaxed">
              Your money stays in a secure Paystack account. Installers only get paid when you
              verify each phase of the installation.
            </p>
          </div>
        </div>
      </section>

      {/* Target Audiences: Residential & Commercial */}
      <section className="bg-muted/30 border-border w-full border-t py-20 md:py-28">
        <div className="container mx-auto max-w-6xl space-y-14 px-4">
          <div className="space-y-4 text-center">
            <h2 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
              Built for Homes and Businesses
            </h2>
            <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
              Whether you need to power a freezer or an entire factory floor, we&apos;ve got you
              covered.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="border-border bg-card flex flex-col justify-between space-y-8 rounded-3xl border p-10 shadow-sm transition-shadow hover:shadow-md">
              <div className="space-y-5">
                <div className="bg-primary/10 text-primary inline-flex items-center rounded-full px-4 py-1 text-sm font-bold tracking-wider uppercase">
                  Residential
                </div>
                <h3 className="text-foreground text-3xl font-bold tracking-tight">
                  Power Your Household
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  Keep the lights on, the AC running, and the freezer cold without the deafening
                  roar of a generator. Cut your monthly fuel bills and secure your family&apos;s
                  comfort.
                </p>
              </div>
              <Link
                href="/calculator"
                className="text-primary flex items-center gap-2 text-base font-bold hover:underline"
              >
                Size Your Home System <ChevronRight className="size-5" />
              </Link>
            </div>

            <div className="border-border bg-card flex flex-col justify-between space-y-8 rounded-3xl border p-10 shadow-sm transition-shadow hover:shadow-md">
              <div className="space-y-5">
                <div className="bg-secondary/20 text-secondary-foreground inline-flex items-center rounded-full px-4 py-1 text-sm font-bold tracking-wider uppercase">
                  Commercial
                </div>
                <h3 className="text-foreground text-3xl font-bold tracking-tight">
                  Infrastructure for SMEs
                </h3>
                <p className="text-muted-foreground text-base leading-relaxed">
                  End business downtime. Shield your inventory and operations from grid failures,
                  protect your operating margins from diesel spikes, and power growth.
                </p>
              </div>
              <Link
                href="/calculator"
                className="text-primary flex items-center gap-2 text-base font-bold hover:underline"
              >
                Estimate SME ROI <ChevronRight className="size-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Footer Section */}
      <section className="bg-primary text-primary-foreground relative w-full overflow-hidden py-24 text-center">
        <div className="relative z-10 container mx-auto max-w-4xl space-y-8 px-4">
          <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Ready to flip the switch?
          </h2>
          <p className="text-primary-foreground/80 mx-auto max-w-2xl text-lg leading-relaxed">
            Join thousands of Nigerians transitioning to clean, reliable solar energy with verified
            engineering firms and secure escrow payments.
          </p>
          <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:justify-center">
            <Link
              href="/calculator"
              className={buttonVariants({
                variant: "secondary",
                size: "lg",
                className:
                  "cursor-pointer gap-2 px-10 py-6 text-lg font-bold shadow-xl transition-transform hover:-translate-y-1",
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
                  "text-primary-foreground border-primary-foreground hover:bg-primary-foreground hover:text-primary cursor-pointer border-2 px-10 py-6 text-lg",
              })}
            >
              Sign Up
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
