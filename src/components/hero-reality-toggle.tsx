"use client";

import React, { useState } from "react";
import { Flame, Sun, AlertTriangle, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

export function HeroRealityToggle() {
  const [isSolar, setIsSolar] = useState(true);

  return (
    <div className="mx-auto w-full max-w-2xl space-y-4">
      {/* Interactive Switcher Toggle Pills */}
      <div className="inline-flex rounded-2xl border border-white/20 bg-slate-950/70 p-1.5 shadow-xl backdrop-blur-md">
        <button
          type="button"
          onClick={() => setIsSolar(false)}
          className={cn(
            "flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all",
            !isSolar
              ? "bg-destructive font-extrabold text-white shadow-md"
              : "text-slate-300 hover:text-white",
          )}
        >
          <Flame className="size-3.5" />
          <span>Life with Generator</span>
        </button>
        <button
          type="button"
          onClick={() => setIsSolar(true)}
          className={cn(
            "flex cursor-pointer items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all",
            isSolar
              ? "bg-emerald-500 font-black text-slate-950 shadow-md"
              : "text-slate-300 hover:text-white",
          )}
        >
          <Sun className="size-3.5 fill-current text-slate-950" />
          <span>Life with Gridless Solar</span>
        </button>
      </div>

      {/* Dynamic Content Card */}
      <div
        className={cn(
          "rounded-3xl border p-6 text-left shadow-2xl backdrop-blur-xl transition-all duration-300 sm:p-7",
          isSolar
            ? "border-emerald-500/30 bg-slate-950/80 text-white"
            : "border-destructive/30 bg-slate-950/85 text-white",
        )}
      >
        {isSolar ? (
          <div className="animate-in fade-in-50 space-y-4 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="flex items-center gap-1.5 text-xs font-black text-emerald-400">
                <CheckCircle2 className="size-4" /> 24/7 Silent Clean Energy
              </span>
              <span className="text-[11px] font-bold text-slate-300">
                Paystack Escrow Protected
              </span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center sm:text-left">
                <span className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Monthly Fuel Bill
                </span>
                <p className="mt-0.5 text-base font-black text-emerald-400">₦0 / Month</p>
                <span className="text-[11px] text-slate-300">Zero petrol queues</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center sm:text-left">
                <span className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Acoustic Noise
                </span>
                <p className="mt-0.5 text-base font-black text-white">Absolute Silence</p>
                <span className="text-[11px] text-slate-300">Sleep through outages</span>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-3.5 text-center sm:text-left">
                <span className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Scam Protection
                </span>
                <p className="mt-0.5 text-base font-black text-emerald-400">Zero Risk</p>
                <span className="text-[11px] text-slate-300">Pay only on sign-off</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="animate-in fade-in-50 space-y-4 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-destructive flex items-center gap-1.5 text-xs font-black">
                <AlertTriangle className="size-4" /> Daily Cash Bleed & Noise
              </span>
              <span className="text-[11px] font-bold text-slate-300">Unregulated & Unverified</span>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              <div className="border-destructive/20 bg-destructive/10 rounded-2xl border p-3.5 text-center sm:text-left">
                <span className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Monthly Fuel Bill
                </span>
                <p className="text-destructive mt-0.5 text-base font-black">~₦250k+ / Month</p>
                <span className="text-[11px] text-slate-300">Volatile pump prices</span>
              </div>
              <div className="border-destructive/20 bg-destructive/10 rounded-2xl border p-3.5 text-center sm:text-left">
                <span className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Acoustic Noise
                </span>
                <p className="mt-0.5 text-base font-black text-white">Constant Roar</p>
                <span className="text-[11px] text-slate-300">Toxic smoke exhaust</span>
              </div>
              <div className="border-destructive/20 bg-destructive/10 rounded-2xl border p-3.5 text-center sm:text-left">
                <span className="block text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  Contractor Risk
                </span>
                <p className="text-destructive mt-0.5 text-base font-black">Cowboy Installers</p>
                <span className="text-[11px] text-slate-300">Disappearing deposits</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
