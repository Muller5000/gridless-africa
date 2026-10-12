import React from "react";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ShieldCheck, Calculator, ChevronRight, ArrowRight } from "lucide-react";
import { InstallerShowcase } from "@/components/installer-showcase";
import { GeneratorRoiCalculator } from "@/features/calculator/generator-roi-calculator";
import { HeroRealityToggle } from "@/components/hero-reality-toggle";
import DottedTrailCursor from "@/components/ui/dotted-trail-cursor";
import WaterRippleCarousel, { type Slide } from "@/components/ui/water-ripple-carousel";
import { CountUp } from "@/components/ui/count-up";
import { LogoMarquee } from "@/components/logo-marquee";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { TestimonialSection } from "@/components/testimonial-section";
import { FaqSection } from "@/components/faq-section";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { HowItWorksTimeline } from "@/components/how-it-works-timeline";

const HERO_SOLAR_SLIDES: Slide[] = [
  {
    image: "/hero-solar-home.jpg",
    title: "Residential Solar Villa",
    caption: "5kVA – 15kVA Turnkey Hybrid Systems • Lekki & Ikoyi, Lagos",
    alt: "Contemporary Nigerian solar duplex with rooftop solar panels and LiFePO4 battery system",
  },
  {
    image: "/hero-solar-powerstation.jpg",
    title: "itel PowerTank 2kWh Solar Backup",
    caption: "Portable Clean Power for Apartments & Remote Work • Ikeja, Yaba & Nationwide",
    alt: "itel PowerTank 2kWh portable solar power station with foldable solar panel in a modern Nigerian apartment",
  },
  {
    image: "/hero-solar-commercial.jpg",
    title: "Commercial & Industrial Rooftop Array",
    caption: "25kVA – 100kVA+ Industrial Hybrid Microgrid • Ikeja Industrial & Victoria Island",
    alt: "Commercial office headquarters in Lagos with high-capacity industrial rooftop solar array",
  },
];

export default function LandingPage() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section: Interactive Water Ripple Carousel with Nigerian Solar Setups */}
      <section className="relative w-full overflow-hidden">
        <WaterRippleCarousel
          slides={HERO_SOLAR_SLIDES}
          height="auto"
          duration={1800}
          strength={1.2}
          autoplay={7500}
          ink="#10b981"
          className="min-h-[580px] w-full md:min-h-[640px]"
        >
          {/* Cinematic gradient overlay for optimal legibility without murky darkness */}
          <div className="pointer-events-none absolute inset-0 bg-slate-950/65 backdrop-blur-[0.5px]" />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/35 to-slate-950/50" />

          <div className="pointer-events-none relative z-10 container mx-auto max-w-4xl space-y-6 px-4 py-20 text-center md:py-28">
            {/* Badge */}
            <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-bold text-white shadow-lg backdrop-blur-md">
              <ShieldCheck className="size-4 text-emerald-400" />
              <span>Nigeria&apos;s Verified Solar Marketplace</span>
            </div>

            {/* Center Headline */}
            <h1 className="mx-auto max-w-3xl text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl lg:leading-[1.15]">
              Solar installations you can <span className="text-emerald-400">actually trust.</span>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg md:text-xl">
              Stop gambling with unverified contractors or counterfeit equipment. Compare
              standardized bids from CAC-vetted Nigerian engineers, and hold your payment safely in
              Paystack escrow until the job passes inspection.
            </p>

            {/* Centered Action Buttons */}
            <div className="pointer-events-auto flex flex-col gap-3.5 pt-3 sm:flex-row sm:justify-center">
              <Link
                href="/calculator"
                className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-emerald-500 px-8 py-4 text-sm font-black text-slate-950 shadow-[0_0_25px_rgba(16,185,129,0.35)] transition-all hover:scale-[1.02] hover:bg-emerald-400 active:scale-[0.98] sm:text-base"
              >
                <Calculator className="size-4.5" />
                <span>Calculate Your Solar Savings</span>
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#installers"
                className="inline-flex items-center justify-center gap-2.5 rounded-full border border-white/20 bg-white/10 px-8 py-4 text-sm font-bold text-white shadow-lg backdrop-blur-md transition-all hover:border-white/40 hover:bg-white/20 active:scale-[0.98] sm:text-base"
              >
                <ShieldCheck className="size-4.5 text-emerald-400" />
                <span>Browse Verified Installers</span>
              </Link>
            </div>

            {/* Subtle Interactive Hint */}
            <div className="pt-2 text-[11px] font-medium tracking-wide text-white/50">
              <span>✦ Tap or click anywhere on the background to ripple between solar setups</span>
            </div>
          </div>
        </WaterRippleCarousel>
      </section>

      {/* Trust & Impact Bar */}
      <section className="border-border bg-card w-full border-b py-8 shadow-xs">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            <div className="border-border/60 space-y-1 border-r pr-4 text-center last:border-none md:text-left">
              <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Escrow Protected
              </span>
              <p className="text-foreground text-2xl font-black">
                <CountUp target={180} prefix="₦" suffix="M+" />
              </p>
              <p className="text-muted-foreground text-[11px]">Customer funds held safely</p>
            </div>

            <div className="border-border/60 space-y-1 border-r pr-4 text-center last:border-none md:text-left">
              <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Vetted Network
              </span>
              <p className="text-foreground text-2xl font-black">
                <CountUp target={100} suffix="%" />
              </p>
              <p className="text-muted-foreground text-[11px]">CAC & COREN registered</p>
            </div>

            <div className="border-border/60 space-y-1 border-r pr-4 text-center last:border-none md:text-left">
              <span className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Quote Delivery
              </span>
              <p className="text-foreground text-2xl font-black">
                <CountUp target={48} prefix="< " suffix=" Hrs" />
              </p>
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

      {/* Equipment & Payment Partners Marquee */}
      <LogoMarquee />

      {/* Generator vs. Solar Reality Check & ROI Calculator Section */}
      <section className="border-border relative w-full overflow-hidden border-b">
        <DottedTrailCursor
          colorA="#10b981"
          colorB="#f59e0b"
          dotSpacing={36}
          dotRadius={1.3}
          glowRadius={220}
          headRadius={60}
          className="w-full py-20 md:py-28"
        >
          <div className="container mx-auto max-w-6xl space-y-20 px-4">
            {/* Reality Comparison: Life with Generator vs. Life with Gridless Solar */}
            <div className="space-y-6 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-1 text-xs font-bold tracking-wider text-emerald-700 uppercase dark:text-emerald-400">
                <span>The Nigerian Power Dilemma</span>
              </div>
              <h2 className="text-foreground text-4xl font-extrabold tracking-tight sm:text-5xl">
                Compare the reality.
              </h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                See what changes the moment you switch from volatile generator dependence to clean,
                silent solar energy.
              </p>
              <div className="pt-2">
                <HeroRealityToggle />
              </div>
            </div>

            {/* Stop burning cash on diesel + Calculator */}
            <div className="space-y-12">
              <div className="space-y-4 text-center">
                <h3 className="text-foreground text-3xl font-extrabold tracking-tight sm:text-4xl">
                  Stop burning cash on diesel.
                </h3>
                <p className="text-muted-foreground mx-auto max-w-2xl text-lg">
                  Use our interactive calculator to see exactly how fast a solar system pays for
                  itself in Nigeria. No fluff, just math.
                </p>
              </div>
              <div className="mx-auto flex justify-center">
                <GeneratorRoiCalculator />
              </div>
            </div>
          </div>
        </DottedTrailCursor>
      </section>

      {/* Installer Showcase Deck */}
      <section
        id="installers"
        className="border-border relative w-full overflow-hidden border-b py-20 md:py-28"
      >
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

      {/* How Gridless Africa Works: Connected 3-Step Journey Timeline */}
      <ScrollReveal>
        <HowItWorksTimeline />
      </ScrollReveal>

      {/* Customer Social Proof & Testimonials */}
      <ScrollReveal>
        <TestimonialSection />
      </ScrollReveal>

      {/* Target Audiences: Residential & Commercial */}
      <ScrollReveal>
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
      </ScrollReveal>

      {/* Frequently Asked Questions */}
      <ScrollReveal>
        <FaqSection />
      </ScrollReveal>

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

      {/* Floating WhatsApp Quick Consultation */}
      <WhatsAppButton />
    </div>
  );
}
