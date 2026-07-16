import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="from-background to-muted/20 w-full bg-linear-to-b py-20 md:py-32">
        <div className="container mx-auto max-w-6xl px-4 text-center">
          <div className="mx-auto max-w-3xl space-y-6">
            <div className="border-secondary-foreground/20 bg-secondary/10 text-secondary-foreground inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold">
              ⚡ Nigeria&apos;s Trusted Solar Marketplace
            </div>
            <h1 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
              Power Your Future with{" "}
              <span className="text-secondary-foreground">Gridless Energy</span>
            </h1>
            <p className="text-muted-foreground mx-auto max-w-xl text-lg sm:text-xl">
              Bridge the energy gap. Sizer your load, receive verified quotes from vetted
              installers, and protect payments with secure escrow.
            </p>
            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link href="/calculator" className={buttonVariants({ size: "lg" })}>
                Calculate Your Savings
              </Link>
              <Link
                href="/installers"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                Browse Verified Installers
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="container mx-auto max-w-6xl px-4 py-16 md:py-24">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-foreground text-3xl font-bold tracking-tight sm:text-4xl">
            Tackling the Bottlenecks of Nigerian Solar
          </h2>
          <p className="text-muted-foreground mx-auto max-w-2xl">
            We solve the industry&apos;s greatest challenges: trust, hardware standardization, and
            upfront capital.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
            <div className="bg-primary text-primary-foreground mb-4 flex h-10 w-10 items-center justify-center rounded-lg font-bold">
              1
            </div>
            <h3 className="text-foreground mb-2 text-lg font-semibold">Solar Savings Calculator</h3>
            <p className="text-muted-foreground text-sm">
              Our AI-assisted tool calculates your energy needs, estimates ROI, and matches you with
              verified solar hardware.
            </p>
          </div>

          <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
            <div className="bg-secondary text-secondary-foreground mb-4 flex h-10 w-10 items-center justify-center rounded-lg font-bold">
              2
            </div>
            <h3 className="text-foreground mb-2 text-lg font-semibold">Verified Bidding</h3>
            <p className="text-muted-foreground text-sm">
              Receive up to 3 competitive, standardized quotes from vetted, geofenced tier-1 and
              tier-2 solar engineering firms.
            </p>
          </div>

          <div className="border-border bg-card rounded-xl border p-6 shadow-sm">
            <div className="bg-primary text-primary-foreground mb-4 flex h-10 w-10 items-center justify-center rounded-lg font-bold">
              3
            </div>
            <h3 className="text-foreground mb-2 text-lg font-semibold">Secure Escrow Payments</h3>
            <p className="text-muted-foreground text-sm">
              Pay securely via Paystack integration. Funds are held in escrow and released only when
              installation milestones are completed and verified.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-primary text-primary-foreground w-full py-16 text-center md:py-20">
        <div className="container mx-auto max-w-4xl space-y-6 px-4">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready to transition to reliable power?
          </h2>
          <p className="text-primary-foreground/80 mx-auto max-w-xl text-lg">
            Use our intelligent sizer to estimate required panel count, inverter kVa, battery
            capacity, and payback period.
          </p>
          <Link href="/calculator" className={buttonVariants({ variant: "secondary", size: "lg" })}>
            Launch Solar Calculator
          </Link>
        </div>
      </section>
    </div>
  );
}
