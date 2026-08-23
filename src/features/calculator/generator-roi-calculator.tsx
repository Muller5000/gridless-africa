"use client";

import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardTitle } from "@/components/ui/card";
import { Fuel, TrendingDown, BatteryCharging, ArrowRight } from "lucide-react";

export function GeneratorRoiCalculator() {
  const [litersPerWeek, setLitersPerWeek] = useState(50);
  const fuelPricePerLiter = 1200; // ₦1,200 per liter average

  const weeklyCost = litersPerWeek * fuelPricePerLiter;
  const monthlyCost = weeklyCost * 4.3;
  const annualCost = monthlyCost * 12;

  // Assume an average 5kVa solar setup costs roughly ₦4,500,000
  const estimatedSolarCost = 4500000;

  const paybackMonths = monthlyCost > 0 ? estimatedSolarCost / monthlyCost : 0;
  const paybackYears = paybackMonths / 12;

  return (
    <Card className="border-border/50 bg-card/50 mx-auto w-full max-w-4xl overflow-hidden shadow-lg backdrop-blur-sm">
      <div className="bg-secondary/10 border-border/50 flex items-center gap-3 border-b px-6 py-4">
        <TrendingDown className="text-secondary-foreground size-6" />
        <div>
          <CardTitle className="text-xl font-bold">Generator Fuel Offset Calculator</CardTitle>
          <CardDescription className="text-muted-foreground text-sm">
            See how quickly a solar system pays for itself by eliminating generator fuel costs.
          </CardDescription>
        </div>
      </div>
      <CardContent className="grid grid-cols-1 items-center gap-8 p-6 md:grid-cols-2">
        {/* Left Side: Controls */}
        <div className="space-y-6">
          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-foreground flex items-center gap-2 text-sm font-semibold">
                <Fuel className="text-primary size-4" />
                Generator Fuel Used (Liters / Week)
              </label>
              <span className="text-primary font-bold">{litersPerWeek} L</span>
            </div>
            <input
              type="range"
              min="0"
              max="200"
              step="5"
              value={litersPerWeek}
              onChange={(e) => setLitersPerWeek(Number(e.target.value))}
              className="bg-muted accent-primary h-2 w-full cursor-pointer appearance-none rounded-lg"
            />
            <div className="text-muted-foreground mt-1 flex justify-between text-xs">
              <span>0 L</span>
              <span>200 L</span>
            </div>
          </div>

          <div className="bg-background border-border rounded-lg border p-4">
            <h4 className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
              Current Estimated Fuel Spend
            </h4>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground mb-1 text-xs">Monthly Cost</p>
                <p className="text-destructive text-lg font-bold">
                  ₦{monthlyCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1 text-xs">Annual Cost</p>
                <p className="text-destructive text-lg font-bold">
                  ₦{annualCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </p>
              </div>
            </div>
            <p className="text-muted-foreground mt-3 text-[10px] italic">
              *Calculated at ₦1,200/Liter (Average Petrol/Diesel cost)
            </p>
          </div>
        </div>

        {/* Right Side: ROI Data */}
        <div className="bg-primary/5 border-primary/20 relative overflow-hidden rounded-xl border p-6">
          <div className="absolute -top-4 -right-4 opacity-10">
            <BatteryCharging className="text-primary h-32 w-32" />
          </div>

          <div className="relative z-10 space-y-6">
            <div>
              <h3 className="text-primary/80 mb-1 text-sm font-semibold tracking-wider uppercase">
                Solar Break-Even Time
              </h3>
              <div className="flex items-end gap-2">
                <span className="text-primary text-4xl font-black md:text-5xl">
                  {paybackMonths > 0 ? paybackMonths.toFixed(1) : "0"}
                </span>
                <span className="text-primary/80 pb-1 text-lg font-semibold">Months</span>
              </div>
              <p className="text-muted-foreground mt-2 text-sm">
                Time required to offset a ₦4.5M (5kVa) Solar Setup.
              </p>
            </div>

            <div className="space-y-2">
              <div className="text-foreground flex justify-between text-xs font-semibold">
                <span>0 Months</span>
                <span>{paybackYears > 0 ? paybackYears.toFixed(1) : "0"} Years</span>
              </div>
              <div className="bg-muted h-3 w-full overflow-hidden rounded-full">
                <div
                  className="bg-secondary h-3 rounded-full transition-all duration-500 ease-in-out"
                  style={{
                    width: `${Math.min(100, Math.max(10, (12 / (paybackMonths || 1)) * 100))}%`,
                  }}
                />
              </div>
              <p className="text-muted-foreground flex items-center justify-center gap-1 pt-2 text-center text-xs">
                After this period, your power is effectively{" "}
                <strong className="text-secondary-foreground">FREE</strong>{" "}
                <ArrowRight className="size-3" />
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
