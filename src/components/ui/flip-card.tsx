"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface FlipCardProps {
  /** JSX element for the front face */
  front: React.ReactNode;
  /** JSX element for the back face */
  back: React.ReactNode;
  /** Optional className for the outer container */
  className?: string;
}

/**
 * FlipCard – a reusable component that displays a card with a glass‑morphism
 * style on both faces and flips on hover (desktop) or tap (mobile).
 *
 * Tailwind CSS provides the glass effect with:
 *   - `bg-white/10` for translucency
 *   - `backdrop-blur-sm` for subtle blur
 *   - `border border-white/20` for a faint outline
 *   - `shadow-lg` for depth
 *
 * The flip animation uses CSS 3D transforms. The container sets a perspective;
 * the inner wrapper rotates 180° on the Y‑axis when the card is flipped.
 */
export function FlipCard({ front, back, className }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false);

  const toggleFlip = () => setFlipped((prev) => !prev);

  return (
    <div
      className={cn("group perspective-1000 h-full w-full cursor-pointer", className)}
      onClick={toggleFlip}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className={cn(
          "relative h-full w-full transition-transform duration-500 ease-in-out",
          flipped ? "rotate-y-180 transform" : "rotate-y-0 transform",
          "preserve-3d",
        )}
      >
        {/* Front side */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-sm",
            "flex flex-col overflow-hidden",
            "backface-hidden",
          )}
        >
          {front}
        </div>
        {/* Back side */}
        <div
          className={cn(
            "absolute inset-0 rounded-xl border border-white/20 bg-white/10 shadow-lg backdrop-blur-sm",
            "flex flex-col overflow-hidden",
            "rotate-y-180 backface-hidden",
          )}
        >
          {back}
        </div>
      </div>
    </div>
  );
}

// Helper CSS to expose utilities Tailwind doesn’t ship by default.
export const flipCardStyles = `
  .backface-hidden { backface-visibility: hidden; }
  .rotate-y-0 { transform: rotateY(0deg); }
  .rotate-y-180 { transform: rotateY(180deg); }
  .preserve-3d { transform-style: preserve-3d; }
`;
