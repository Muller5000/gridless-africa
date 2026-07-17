import React from "react";
import OnboardingWizard from "@/features/onboarding/onboarding-wizard";

export default function CustomerOnboardingPage() {
  return (
    <div className="container mx-auto flex max-w-6xl flex-col items-center px-4 py-8 md:py-16">
      <OnboardingWizard />
    </div>
  );
}
