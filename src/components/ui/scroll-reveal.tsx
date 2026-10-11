"use client";

import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface ScrollRevealProps {
  delay?: number;
  className?: string;
  children: ReactNode;
}

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

export function ScrollReveal({ delay = 0, className, children }: ScrollRevealProps) {
  const prefersReducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot,
  );
  const elementRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const node = elementRef.current;
    if (!node) {
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      const raf = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(node);
        }
      },
      { threshold: 0.1 },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <div
      ref={elementRef}
      className={cn(
        "transition-[opacity,transform] duration-[600ms] ease-out motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none",
        isVisible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-[24px] opacity-0",
        className,
      )}
      style={{
        transitionDelay: delay > 0 ? `${delay}ms` : undefined,
      }}
    >
      {children}
    </div>
  );
}
