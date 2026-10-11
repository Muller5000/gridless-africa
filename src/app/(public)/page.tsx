import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ShieldCheck, Calculator, Compass, ChevronRight, CheckCircle2 } from "lucide-react";
import { InstallerShowcase } from "@/components/installer-showcase";
import { GeneratorRoiCalculator } from "@/features/calculator/generator-roi-calculator";
import { HeroRealityToggle } from "@/components/hero-reality-toggle";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section: Authentic Nigerian Home Background with Cinematic Overlay & Centered Copy */}
      <section className="relative w-full overflow-hidden py-24 md:py-36">
        {/* Authentic Contemporary Nigerian Home Background Image */}
        <div
          className="absolute inset-0 scale-105 bg-cover bg-center transition-transform duration-1000"
          style={{ backgroundImage: `url('/hero-solar-home.jpg')` }}
        />

        {/* Cinematic gradient overlay for optimal legibility without murky darkness */}
        <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[0.5px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-slate-950/40" />

        <div className="relative z-10 container mx-auto max-w-4xl space-y-8 px-4 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-md">
            <ShieldCheck className="size-4 text-emerald-400" />
            <span>Nigeria&apos;s Verified Solar Marketplace</span>
          </div>

          {/* Center Headline */}
          <h1 className="mx-auto max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:leading-[1.15]">
            Solar installations you can <span className="text-emerald-400">actually trust.</span>
          </h1>

          {/* Subtitle */}
          <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg md:text-xl">
            Stop gambling with unverified contractors or counterfeit equipment. Compare standardized
            bids from CAC-vetted Nigerian engineers, and hold your payment safely in Paystack escrow
            until the job passes inspection.
          </p>

          {/* Interactive Reality Switcher (Concept 2) */}
          <HeroRealityToggle />

          {/* Centered Action Buttons */}
          <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:justify-center">
            <Link
              href="/calculator"
              className={buttonVariants({
                size: "lg",
                className:
                  "cursor-pointer gap-2 bg-emerald-500 px-8 py-6 text-base font-black text-slate-950 shadow-xl transition-transform hover:scale-105 hover:bg-emerald-400",
              })}
            >
              <Calculator className="size-5" /> Calculate Your Savings
            </Link>
            <Link
              href="/login"
              className={buttonVariants({
                variant: "outline",
                size: "lg",
                className:
                  "cursor-pointer border-2 border-white/30 bg-white/10 px-8 py-6 text-base font-bold text-white shadow-lg backdrop-blur-md transition-all hover:bg-white/20 hover:text-white",
              })}
            >
              Browse Verified Installers
            </Link>
          </div>

          {/* Trust Pillars */}
          <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-xs font-semibold text-slate-300">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-400" /> 100% Paystack Escrow
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-400" /> Vetted CAC Installers
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="size-4 text-emerald-400" /> Guaranteed Tier-1 Hardware
            </span>
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
