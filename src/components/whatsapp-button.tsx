"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
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

interface WhatsAppButtonProps {
  className?: string;
  phoneNumber?: string;
  message?: string;
}

export function WhatsAppButton({
  className,
  phoneNumber = "2348000000000",
  message = "Hi, I'm interested in solar energy solutions",
}: WhatsAppButtonProps) {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [showTooltip, setShowTooltip] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowTooltip(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  const encodedMessage = encodeURIComponent(message);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

  return (
    <div className={cn("fixed right-4 bottom-20 z-40 flex flex-col items-end", className)}>
      {/* Tooltip bubble (shows on first mount for 5s, then fades out) */}
      <div
        role="tooltip"
        className={cn(
          "border-border bg-card text-card-foreground pointer-events-none relative mb-2.5 rounded-lg border px-3 py-1.5 text-xs font-medium shadow-md transition-opacity duration-500",
          showTooltip ? "opacity-100" : "opacity-0",
        )}
      >
        <span>Need help? Chat with us</span>
        {/* Tooltip arrow pointing down */}
        <span
          aria-hidden="true"
          className="border-border bg-card absolute right-5 -bottom-1 h-2 w-2 rotate-45 border-r border-b"
        />
      </div>

      {/* Floating WhatsApp Action Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="group focus-visible:ring-ring relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#20ba5a] focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none active:scale-95"
      >
        {/* Pulse ring - disabled if prefers-reduced-motion */}
        {!prefersReducedMotion && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -inset-1 rounded-full bg-[#25D366]/40 motion-safe:animate-ping"
          />
        )}

        {/* WhatsApp Icon */}
        <svg
          className="relative z-10 h-7 w-7 fill-current transition-transform group-hover:scale-110"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.301-.15-1.776-.876-2.052-.976-.275-.101-.476-.15-.676.15-.2.301-.777.976-.952 1.176-.176.2-.351.226-.652.075-.301-.15-1.272-.469-2.424-1.496-.895-.799-1.5-1.786-1.676-2.087-.175-.301-.019-.464.132-.614.136-.135.301-.351.451-.527.151-.175.201-.301.301-.501.101-.2.05-.376-.025-.527-.075-.15-.676-1.63-.927-2.232-.244-.587-.493-.507-.677-.517l-.577-.01c-.2 0-.527.075-.802.376s-1.053 1.028-1.053 2.508c0 1.48 1.078 2.909 1.229 3.11.15.2 2.122 3.24 5.141 4.544.718.311 1.278.497 1.715.636.721.23 1.377.197 1.895.12.578-.087 1.776-.726 2.027-1.428.251-.703.251-1.304.175-1.429-.075-.126-.276-.201-.577-.352z" />
          <path d="M12.04 2C6.536 2 2.067 6.469 2.067 11.973c0 1.821.493 3.535 1.354 5.028L2 22l5.176-1.356a9.92 9.92 0 0 0 4.864 1.27h.004c5.503 0 9.973-4.469 9.973-9.973C22.017 6.469 17.544 2 12.04 2zm0 18.232c-1.579 0-3.088-.435-4.398-1.213l-.316-.188-3.262.856.871-3.178-.206-.328a8.214 8.214 0 0 1-1.258-4.308c0-4.545 3.698-8.243 8.247-8.243 4.549 0 8.247 3.698 8.247 8.243 0 4.545-3.698 8.243-8.247 8.243z" />
        </svg>
      </a>
    </div>
  );
}
