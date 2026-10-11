"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";
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

function easeOutExpo(x: number): number {
  return x === 1 ? 1 : 1 - Math.pow(2, -10 * x);
}

export interface CountUpProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

export function CountUp({
  target,
  prefix = "",
  suffix = "",
  duration = 2000,
  className,
}: CountUpProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [count, setCount] = useState<number>(0);
  const elementRef = useRef<HTMLSpanElement | null>(null);
  const hasTriggeredRef = useRef<boolean>(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    if (prefersReducedMotion) {
      return;
    }

    if (hasTriggeredRef.current) return;

    if (typeof IntersectionObserver === "undefined") {
      return;
    }

    let animationFrameId: number;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry?.isIntersecting && !hasTriggeredRef.current) {
          hasTriggeredRef.current = true;
          observer.disconnect();

          let startTime: number | null = null;

          const step = (timestamp: number) => {
            if (startTime === null) {
              startTime = timestamp;
            }

            const elapsed = timestamp - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easeOutExpo(progress);
            const currentVal = Math.round(easedProgress * target);

            setCount(currentVal);

            if (progress < 1) {
              animationFrameId = requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          animationFrameId = requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [target, duration, prefersReducedMotion]);

  // When reduced motion is preferred, display final value immediately
  const displayCount = prefersReducedMotion ? target : count;

  return (
    <span ref={elementRef} className={cn("tabular-nums", className)}>
      {prefix}
      {displayCount.toLocaleString()}
      {suffix}
    </span>
  );
}
