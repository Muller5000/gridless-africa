import React from "react";
import CalculatorFlow from "@/features/calculator/calculator-flow";

export default function SolarCalculatorPage() {
  return (
    <div className="container mx-auto flex max-w-6xl flex-col items-center px-4 py-12 md:py-20">
      <CalculatorFlow />
    </div>
  );
}
