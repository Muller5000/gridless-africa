import React from "react";
import EnergyAssessmentFlow from "@/features/calculator/energy-assessment-flow";

export default function CustomerAssessmentPage() {
  return (
    <div className="container mx-auto flex max-w-6xl flex-col items-center px-4 py-8 md:py-12">
      <EnergyAssessmentFlow />
    </div>
  );
}
