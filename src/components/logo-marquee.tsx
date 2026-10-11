"use client";

import { useSyncExternalStore } from "react";
import { cn } from "@/lib/utils";

function subscribeReducedMotion(callback: () => void): () => void {
  if (typeof window === "undefined" || !window.matchMedia) {
    return () => {};
  }
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => {
    mediaQuery.removeEventListener("change", callback);
  };
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
}

interface Partner {
  name: string;
  category: string;
  badgeAccent?: string;
}

const PARTNERS: readonly Partner[] = [
  { name: "Paystack", category: "Payment" },
  { name: "Canadian Solar", category: "Panels" },
  { name: "LONGi", category: "Panels" },
  { name: "Deye", category: "Inverters" },
  { name: "JA Solar", category: "Panels" },
  { name: "BYD", category: "Storage" },
  { name: "Growatt", category: "Inverters" },
  { name: "Jinko Solar", category: "Panels" },
];

interface LogoMarqueeProps {
  className?: string;
  label?: string;
}

function PartnerPill({ partner }: { partner: Partner }) {
  return (
    <div
      className={cn(
        "group border-border/70 bg-card/60 flex items-center gap-2.5 rounded-full border px-5 py-2.5 shadow-sm transition-all duration-300",
        // Greyscale by default, full color on hover
        "hover:border-primary/50 hover:bg-card shrink-0 cursor-default opacity-70 contrast-75 grayscale select-none hover:opacity-100 hover:shadow-md hover:contrast-100 hover:grayscale-0",
      )}
    >
      <span className="bg-primary/70 group-hover:bg-primary h-2 w-2 rounded-full transition-transform duration-300 group-hover:scale-125" />
      <span className="font-heading text-foreground/90 group-hover:text-foreground text-sm font-semibold tracking-tight transition-colors sm:text-base">
        {partner.name}
      </span>
      <span className="text-muted-foreground group-hover:text-primary text-[10px] tracking-wider uppercase transition-colors">
        {partner.category}
      </span>
    </div>
  );
}

export function LogoMarquee({
  className,
  label = "Trusted Equipment & Payment Partners",
}: LogoMarqueeProps) {
  const prefersReducedMotion = usePrefersReducedMotion();

  // Duplicate partner list for seamless infinite looping
  const duplicatedPartners = [...PARTNERS, ...PARTNERS];

  return (
    <section className={cn("w-full overflow-hidden py-8", className)}>
      <div className="container mx-auto px-4">
        {/* Label above */}
        {label && (
          <p className="text-muted-foreground mb-6 text-center text-xs font-semibold tracking-widest uppercase">
            {label}
          </p>
        )}

        {/* Static Grid for prefers-reduced-motion */}
        {prefersReducedMotion ? (
          <div className="mx-auto grid max-w-4xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {PARTNERS.map((partner) => (
              <div key={partner.name} className="flex justify-center">
                <PartnerPill partner={partner} />
              </div>
            ))}
          </div>
        ) : (
          /* Marquee Track */
          <div className="relative w-full">
            {/* Left and right edge gradient fade */}
            <div
              aria-hidden="true"
              className="from-background via-background/80 pointer-events-none absolute top-0 bottom-0 left-0 z-10 w-20 bg-gradient-to-r to-transparent"
            />
            <div
              aria-hidden="true"
              className="from-background via-background/80 pointer-events-none absolute top-0 right-0 bottom-0 z-10 w-20 bg-gradient-to-l to-transparent"
            />

            {/* Marquee Scroller */}
            <div className="flex overflow-hidden">
              <div
                className="marquee-track flex shrink-0 items-center gap-6 py-2 hover:[animation-play-state:paused]"
                style={{
                  animation: "gridless-marquee 28s linear infinite",
                }}
              >
                {duplicatedPartners.map((partner, index) => (
                  <PartnerPill key={`${partner.name}-${index}`} partner={partner} />
                ))}
              </div>
            </div>

            {/* CSS Animation keyframe definition */}
            <style>{`
              @keyframes gridless-marquee {
                0% {
                  transform: translateX(0%);
                }
                100% {
                  transform: translateX(-50%);
                }
              }
            `}</style>
          </div>
        )}
      </div>
    </section>
  );
}
