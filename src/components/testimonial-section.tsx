"use client";

import { useEffect, useRef, useState, useSyncExternalStore, useCallback } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface Testimonial {
  name: string;
  location: string;
  systemSize: string;
  quote: string;
  rating: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Chinedu O.",
    location: "Lekki, Lagos",
    systemSize: "5kVA System",
    quote:
      "We haven't turned on our generator in 3 months. The escrow gave us total peace of mind.",
    rating: 5,
  },
  {
    name: "Amina B.",
    location: "Abuja, FCT",
    systemSize: "10kVA System",
    quote:
      "Daystar Power installed everything in 2 days. The whole process through Gridless was transparent.",
    rating: 5,
  },
  {
    name: "Tunde A.",
    location: "Ibadan, Oyo",
    systemSize: "3.5kVA System",
    quote:
      "I was skeptical about solar in Nigeria until I saw the ROI calculator. Paid for itself in 14 months.",
    rating: 5,
  },
  {
    name: "Ngozi E.",
    location: "Victoria Island, Lagos",
    systemSize: "25kVA Commercial",
    quote:
      "Our office runs 24/7 on solar now. We saved over ₦2M in diesel costs in the first year.",
    rating: 5,
  },
];

function subscribeReducedMotion(callback: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }
  const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  mediaQuery.addEventListener("change", callback);
  return () => {
    mediaQuery.removeEventListener("change", callback);
  };
}

function getReducedMotionSnapshot(): boolean {
  if (typeof window === "undefined") {
    return false;
  }
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getReducedMotionServerSnapshot(): boolean {
  return false;
}

export function TestimonialSection({ className }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isProgrammaticScroll = useRef(false);

  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );

  // Track if testimonial section is in viewport so background auto-rotate does not run
  useEffect(() => {
    const el = sectionRef.current;
    if (!el || typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setIsInView(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry) {
          setIsInView(entry.isIntersecting);
        }
      },
      { threshold: 0.15 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const goToSlide = useCallback(
    (index: number) => {
      const targetIndex = (index + TESTIMONIALS.length) % TESTIMONIALS.length;
      setCurrentIndex(targetIndex);

      const container = containerRef.current;
      if (!container) return;

      const slides = container.querySelectorAll<HTMLElement>("[data-testimonial-slide]");
      const target = slides[targetIndex];
      if (target) {
        isProgrammaticScroll.current = true;
        // Scroll ONLY the container horizontally without moving the window/page scroll
        container.scrollTo({
          left: target.offsetLeft,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
        window.setTimeout(() => {
          isProgrammaticScroll.current = false;
        }, 500);
      }
    },
    [prefersReducedMotion],
  );

  // Auto-rotate every 6 seconds ONLY when in view and not paused
  useEffect(() => {
    if (isPaused || prefersReducedMotion || !isInView) {
      return;
    }

    const interval = setInterval(() => {
      goToSlide(currentIndex + 1);
    }, 6000);

    return () => {
      clearInterval(interval);
    };
  }, [currentIndex, goToSlide, isPaused, prefersReducedMotion, isInView]);

  // Sync index on manual scroll / swipe
  const handleScroll = () => {
    if (isProgrammaticScroll.current) return;
    const container = containerRef.current;
    if (!container) return;

    const scrollLeft = container.scrollLeft;
    const slideWidth = container.offsetWidth;
    if (slideWidth > 0) {
      const newIndex = Math.round(scrollLeft / slideWidth);
      if (newIndex >= 0 && newIndex < TESTIMONIALS.length && newIndex !== currentIndex) {
        setCurrentIndex(newIndex);
      }
    }
  };

  return (
    <section
      ref={sectionRef}
      className={cn("bg-muted/30 w-full overflow-hidden py-16 sm:py-24", className)}
      aria-roledescription="carousel"
      aria-label="Customer Testimonials"
    >
      <div className="container mx-auto max-w-5xl px-4 sm:px-6">
        {/* Top Header & Aggregate Stat */}
        <div className="mb-12 space-y-4 text-center sm:mb-16">
          <div className="border-border bg-card text-foreground inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-xs font-medium shadow-xs sm:text-sm">
            <span aria-hidden="true">⭐</span>
            <span className="font-semibold">4.8 average</span>
            <span className="text-muted-foreground">from 400+ verified installations</span>
          </div>

          <h2 className="text-foreground font-heading text-3xl font-bold tracking-tight sm:text-4xl">
            What Our Customers Say
          </h2>

          <p className="text-muted-foreground mx-auto max-w-2xl text-base sm:text-lg">
            Verified Nigerian homeowners and businesses enjoying reliable electricity with zero
            diesel noise.
          </p>
        </div>

        {/* Carousel Area */}
        <div
          className="relative mx-auto max-w-3xl"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onFocus={() => setIsPaused(true)}
          onBlur={() => setIsPaused(false)}
        >
          {/* Scroll-snap container */}
          <div
            ref={containerRef}
            onScroll={handleScroll}
            className="flex snap-x snap-mandatory [scrollbar-width:none] overflow-x-auto scroll-smooth rounded-2xl [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
          >
            {TESTIMONIALS.map((item, index) => (
              <div
                key={item.name}
                data-testimonial-slide
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${TESTIMONIALS.length}`}
                className="w-full shrink-0 snap-start px-2 py-4"
              >
                <div className="border-border bg-card relative flex min-h-[300px] flex-col justify-between rounded-2xl border p-6 shadow-sm sm:min-h-[320px] sm:p-10">
                  <Quote
                    className="pointer-events-none absolute top-6 right-6 size-10 text-emerald-500/15 sm:size-12 dark:text-emerald-400/20"
                    aria-hidden="true"
                  />

                  {/* Stars + System Size Badge */}
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div
                      className="flex items-center gap-1 text-amber-500"
                      aria-label={`${item.rating} out of 5 stars`}
                    >
                      {Array.from({ length: item.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="size-5 fill-amber-400 text-amber-400"
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                    <Badge variant="secondary" className="px-2.5 py-1 text-xs font-semibold">
                      {item.systemSize}
                    </Badge>
                  </div>

                  {/* Large Quote */}
                  <blockquote className="text-foreground mb-8 text-lg leading-snug font-medium tracking-tight sm:text-2xl sm:leading-relaxed">
                    &ldquo;{item.quote}&rdquo;
                  </blockquote>

                  {/* Author Information */}
                  <div className="border-border/60 flex items-center gap-3 border-t pt-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/15 text-sm font-bold text-emerald-700 dark:text-emerald-300">
                      {item.name.charAt(0)}
                    </div>
                    <div>
                      <div className="text-foreground text-sm font-semibold sm:text-base">
                        {item.name}
                      </div>
                      <div className="text-muted-foreground text-xs sm:text-sm">
                        {item.location}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between gap-4 px-2">
            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={cn(
                    "h-2.5 rounded-full transition-all duration-300 focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none motion-reduce:transition-none",
                    currentIndex === index
                      ? "w-8 bg-emerald-600 dark:bg-emerald-400"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/60 w-2.5",
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={currentIndex === index ? "true" : undefined}
                />
              ))}
            </div>

            {/* Prev / Next Buttons */}
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => goToSlide(currentIndex - 1)}
                aria-label="Previous testimonial"
                className="size-9 rounded-full hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <ChevronLeft className="size-4" />
              </Button>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => goToSlide(currentIndex + 1)}
                aria-label="Next testimonial"
                className="size-9 rounded-full hover:border-emerald-500/50 hover:text-emerald-600 dark:hover:text-emerald-400"
              >
                <ChevronRight className="size-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
