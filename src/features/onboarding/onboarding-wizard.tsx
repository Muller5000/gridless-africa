"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { createClient } from "@/lib/supabase/client";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2, ArrowLeft, ArrowRight, CheckCircle, ShieldCheck } from "lucide-react";

// Step Validation Schemas
const step1Schema = zod.object({
  fullName: zod.string().min(2, "Full name must be at least 2 characters"),
  phoneNumber: zod.string().min(8, "Phone number must be at least 8 digits"),
  state: zod.enum(["Lagos", "Oyo"]),
  lga: zod.string().min(2, "Please select or type your Local Government Area"),
  residentialAddress: zod.string().min(5, "Address must be at least 5 characters"),
  customerType: zod.enum(["residential", "sme", "commercial"]),
});

const step2Schema = zod.object({
  ownership: zod.enum(["owner", "tenant", "other"]),
  buildingType: zod.enum(["bungalow", "duplex", "flat", "office", "other"]),
  numberOfFloors: zod.number().min(1, "Must be at least 1 floor"),
  roofType: zod.enum(["concrete", "metal_sheet", "shingle", "tile", "other"]),
  roofCondition: zod.enum(["excellent", "good", "fair", "needs_repair"]),
  roofAccessibility: zod.enum(["easy", "difficult", "no_access"]),
});

const step3Schema = zod.object({
  currentSource: zod.string().min(2, "Please state your current source of electricity"),
  phcnAvailability: zod.number().min(0).max(24, "Cannot exceed 24 hours"),
  generatorOwnership: zod.boolean(),
  monthlyFuelCost: zod.number().min(0, "Must be a positive number"),
  averageElectricityBill: zod.number().min(0, "Must be a positive number"),
  hasExistingInverter: zod.boolean(),
  hasExistingSolar: zod.boolean(),
});

type Step1Values = zod.infer<typeof step1Schema>;
type Step2Values = zod.infer<typeof step2Schema>;
type Step3Values = zod.infer<typeof step3Schema>;

const NIGERIAN_STATES = {
  Lagos: ["Ikeja", "Lekki", "Alimosho", "Surulere", "Epe", "Ikorodu"],
  Oyo: ["Ibadan North", "Ibadan North-East", "Ibadan South-West", "Akinyele", "Ogbomosho"],
};

export default function OnboardingWizard() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const supabase = createClient();

  // Form Hooks
  const step1Form = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      state: "Lagos",
      lga: "",
      residentialAddress: "",
      customerType: "residential",
    },
  });

  const step2Form = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      ownership: "owner",
      buildingType: "bungalow",
      numberOfFloors: 1,
      roofType: "concrete",
      roofCondition: "good",
      roofAccessibility: "easy",
    },
  });

  const step3Form = useForm<Step3Values>({
    resolver: zodResolver(step3Schema),
    defaultValues: {
      currentSource: "grid_and_generator",
      phcnAvailability: 8,
      generatorOwnership: false,
      monthlyFuelCost: 0,
      averageElectricityBill: 0,
      hasExistingInverter: false,
      hasExistingSolar: false,
    },
  });

  // Watch State in Step 1 to update LGAs dynamically
  const selectedState = step1Form.watch("state");
  const lgas = selectedState ? NIGERIAN_STATES[selectedState] : [];

  // Load Existing Profile Progress
  useEffect(() => {
    async function loadData() {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        if (!user) {
          window.location.assign("/login");
          return;
        }
        setUserId(user.id);

        // Fetch profile
        const { data: profile } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profile) {
          step1Form.reset({
            fullName: profile.full_name || "",
            phoneNumber: profile.phone_number || "",
            state: (profile.state as "Lagos" | "Oyo") || "Lagos",
            lga: profile.lga || "",
            residentialAddress: profile.residential_address || "",
            customerType:
              (profile.customer_type as "residential" | "sme" | "commercial") || "residential",
          });
          setStep(profile.onboarding_step || 1);
        }

        // Fetch property
        const { data: property } = await supabase
          .from("properties")
          .select("*")
          .eq("profile_id", user.id)
          .single();

        if (property) {
          step2Form.reset({
            ownership: property.ownership || "owner",
            buildingType: property.building_type || "bungalow",
            numberOfFloors: property.number_of_floors || 1,
            roofType: property.roof_type || "concrete",
            roofCondition: property.roof_condition || "good",
            roofAccessibility: property.roof_accessibility || "easy",
          });
        }

        // Fetch electricity profile
        const { data: electricity } = await supabase
          .from("electricity_profiles")
          .select("*")
          .eq("profile_id", user.id)
          .single();

        if (electricity) {
          step3Form.reset({
            currentSource: electricity.current_source || "grid_and_generator",
            phcnAvailability: electricity.phcn_availability || 0,
            generatorOwnership: electricity.generator_ownership || false,
            monthlyFuelCost: Number(electricity.monthly_fuel_cost) || 0,
            averageElectricityBill: Number(electricity.average_electricity_bill) || 0,
            hasExistingInverter: electricity.has_existing_inverter || false,
            hasExistingSolar: electricity.has_existing_solar || false,
          });
        }
      } catch (error) {
        console.error("Failed to load onboarding profile details", error);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [supabase, step1Form, step2Form, step3Form]);

  // Submit and Save Handlers
  const saveStep1 = async (values: Step1Values) => {
    if (!userId) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: values.fullName,
          phone_number: values.phoneNumber,
          state: values.state,
          lga: values.lga,
          residential_address: values.residentialAddress,
          customer_type: values.customerType,
          onboarding_step: 2,
        })
        .eq("id", userId);

      if (error) throw error;
      setStep(2);
    } catch (err) {
      console.error(err);
      alert("Failed to save contact profile details.");
    } finally {
      setSaving(false);
    }
  };

  const saveStep2 = async (values: Step2Values) => {
    if (!userId) return;
    setSaving(true);
    try {
      // Upsert properties details
      const { error: propError } = await supabase.from("properties").upsert(
        {
          profile_id: userId,
          ownership: values.ownership,
          building_type: values.buildingType,
          number_of_floors: values.numberOfFloors,
          roof_type: values.roofType,
          roof_condition: values.roofCondition,
          roof_accessibility: values.roofAccessibility,
        },
        { onConflict: "profile_id" },
      );

      if (propError) throw propError;

      // Update current step state
      const { error: profError } = await supabase
        .from("profiles")
        .update({ onboarding_step: 3 })
        .eq("id", userId);

      if (profError) throw profError;
      setStep(3);
    } catch (err) {
      console.error(err);
      alert("Failed to save property specifications.");
    } finally {
      setSaving(false);
    }
  };

  const saveStep3 = async (values: Step3Values) => {
    if (!userId) return;
    setSaving(true);
    try {
      // Upsert electricity profile details
      const { error: elecError } = await supabase.from("electricity_profiles").upsert(
        {
          profile_id: userId,
          current_source: values.currentSource,
          phcn_availability: values.phcnAvailability,
          generator_ownership: values.generatorOwnership,
          monthly_fuel_cost: values.monthlyFuelCost,
          average_electricity_bill: values.averageElectricityBill,
          has_existing_inverter: values.hasExistingInverter,
          has_existing_solar: values.hasExistingSolar,
        },
        { onConflict: "profile_id" },
      );

      if (elecError) throw elecError;

      // Update onboarding completion flag
      const { error: profError } = await supabase
        .from("profiles")
        .update({
          onboarding_completed: true,
          onboarding_step: 3,
        })
        .eq("id", userId);

      if (profError) throw profError;

      setSuccess(true);
      setTimeout(() => {
        window.location.assign("/dashboard");
      }, 2000);
    } catch (err) {
      console.error(err);
      alert("Failed to complete onboarding.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[400px] w-full flex-col items-center justify-center space-y-4">
        <Loader2 className="text-primary size-8 animate-spin" />
        <p className="text-muted-foreground text-xs">Loading onboarding profile...</p>
      </div>
    );
  }

  // Completion Percentage
  const progressPercent = step === 1 ? 33 : step === 2 ? 66 : 100;

  return (
    <Card className="border-border bg-card relative w-full max-w-2xl border p-6 shadow-md md:p-8">
      {/* Onboarding Completed overlay */}
      {success && (
        <div className="bg-card/95 animate-in fade-in absolute inset-0 z-50 flex flex-col items-center justify-center space-y-4 rounded-xl duration-200">
          <CheckCircle className="size-16 text-emerald-600" />
          <h2 className="text-foreground text-xl font-bold">Onboarding Complete!</h2>
          <p className="text-muted-foreground text-xs">
            Saving credentials and loading dashboard portal...
          </p>
        </div>
      )}

      {/* Progress Header */}
      <div className="mb-8 space-y-2">
        <div className="text-muted-foreground flex items-center justify-between text-xs">
          <span className="text-primary font-semibold tracking-wider uppercase">
            Onboarding Registration
          </span>
          <span className="text-foreground font-bold">{progressPercent}% Completed</span>
        </div>
        <div className="bg-muted h-2 w-full rounded-full">
          <div
            className="bg-primary h-full rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* STEP 1: CONTACT DETAILS */}
      {step === 1 && (
        <form onSubmit={step1Form.handleSubmit(saveStep1)} className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">Onboarding Profile</h2>
            <p className="text-muted-foreground text-sm">
              Please provide details to build your account verification profile.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="fullName">Full Name / Business Name</Label>
              <Input
                id="fullName"
                placeholder="Adegoke Bello"
                {...step1Form.register("fullName")}
              />
              {step1Form.formState.errors.fullName && (
                <p className="text-destructive mt-1 text-xs">
                  {step1Form.formState.errors.fullName.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                placeholder="+234 80 1234 5678"
                {...step1Form.register("phoneNumber")}
              />
              {step1Form.formState.errors.phoneNumber && (
                <p className="text-destructive mt-1 text-xs">
                  {step1Form.formState.errors.phoneNumber.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="state">State</Label>
              <select
                id="state"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                {...step1Form.register("state")}
              >
                <option value="Lagos">Lagos State</option>
                <option value="Oyo">Oyo State</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="lga">Local Government Area (LGA)</Label>
              <select
                id="lga"
                className="border-input bg-background ring-offset-background placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden disabled:cursor-not-allowed disabled:opacity-50"
                {...step1Form.register("lga")}
              >
                <option value="">Select LGA...</option>
                {lgas.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
              {step1Form.formState.errors.lga && (
                <p className="text-destructive mt-1 text-xs">
                  {step1Form.formState.errors.lga.message}
                </p>
              )}
            </div>

            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="address">Residential / Delivery Address</Label>
              <Input
                id="address"
                placeholder="12, Herbert Macaulay Way, Yaba"
                {...step1Form.register("residentialAddress")}
              />
              {step1Form.formState.errors.residentialAddress && (
                <p className="text-destructive mt-1 text-xs">
                  {step1Form.formState.errors.residentialAddress.message}
                </p>
              )}
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <Label>Customer Profile Type</Label>
              <div className="grid grid-cols-3 gap-3">
                {(["residential", "sme", "commercial"] as const).map((type) => (
                  <label
                    key={type}
                    className={cn(
                      "border-border bg-card hover:bg-muted/20 flex cursor-pointer flex-col items-center justify-center rounded-lg border p-3 text-center transition-all",
                      step1Form.watch("customerType") === type &&
                        "border-primary bg-primary/5 ring-primary ring-1",
                    )}
                  >
                    <span className="text-foreground text-sm font-semibold capitalize">{type}</span>
                    <input
                      type="radio"
                      value={type}
                      className="sr-only"
                      {...step1Form.register("customerType")}
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div className="border-border/60 flex justify-end border-t pt-4">
            <button
              type="submit"
              disabled={saving}
              className={cn(buttonVariants(), "cursor-pointer gap-2")}
            >
              {saving && <Loader2 className="size-4 animate-spin" />}
              Next: Property Details <ArrowRight className="size-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 2: PROPERTY INFO */}
      {step === 2 && (
        <form onSubmit={step2Form.handleSubmit(saveStep2)} className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">Property Information</h2>
            <p className="text-muted-foreground text-sm">
              Provide structural specifications of your property to assist installation sizing.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <Label htmlFor="ownership">Property Ownership</Label>
              <select
                id="ownership"
                className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                {...step2Form.register("ownership")}
              >
                <option value="owner">I own this building</option>
                <option value="tenant">I am a tenant (rental)</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="buildingType">Building Type</Label>
              <select
                id="buildingType"
                className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                {...step2Form.register("buildingType")}
              >
                <option value="bungalow">Bungalow</option>
                <option value="duplex">Duplex (detached)</option>
                <option value="flat">Apartment / Flat</option>
                <option value="office">Office complex</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="floors">Number of Floors</Label>
              <Input
                id="floors"
                type="number"
                min="1"
                {...step2Form.register("numberOfFloors", { valueAsNumber: true })}
              />
              {step2Form.formState.errors.numberOfFloors && (
                <p className="text-destructive mt-1 text-xs">
                  {step2Form.formState.errors.numberOfFloors.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="roofType">Roof Type</Label>
              <select
                id="roofType"
                className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                {...step2Form.register("roofType")}
              >
                <option value="concrete">Concrete flat roof</option>
                <option value="metal_sheet">Aluminum / Metal sheeting</option>
                <option value="shingle">Asphalt Shingles</option>
                <option value="tile">Clay / Concrete tiles</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="roofCondition">Roof Structural Condition</Label>
              <select
                id="roofCondition"
                className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                {...step2Form.register("roofCondition")}
              >
                <option value="excellent">Excellent (New / Rigid)</option>
                <option value="good">Good (Sturdy)</option>
                <option value="fair">Fair (Aged)</option>
                <option value="needs_repair">Needs structural repair</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="roofAccess">Roof Accessibility</Label>
              <select
                id="roofAccess"
                className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                {...step2Form.register("roofAccessibility")}
              >
                <option value="easy">Easy (Stairs / Permanent ladder)</option>
                <option value="difficult">Difficult (requires high ladder)</option>
                <option value="no_access">No safe roof access</option>
              </select>
            </div>
          </div>

          <div className="border-border/60 flex justify-between border-t pt-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={cn(buttonVariants({ variant: "ghost" }), "cursor-pointer gap-2")}
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            <button
              type="submit"
              disabled={saving}
              className={cn(buttonVariants(), "cursor-pointer gap-2")}
            >
              {saving && <Loader2 className="size-4 animate-spin" />}
              Next: Energy Profile <ArrowRight className="size-4" />
            </button>
          </div>
        </form>
      )}

      {/* STEP 3: ELECTRICITY PROFILE */}
      {step === 3 && (
        <form onSubmit={step3Form.handleSubmit(saveStep3)} className="space-y-6">
          <div className="space-y-2 text-center">
            <h2 className="text-xl font-bold tracking-tight md:text-2xl">
              Electricity Configuration
            </h2>
            <p className="text-muted-foreground text-sm">
              Define your current energy dependencies to compute system specifications.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="space-y-1 sm:col-span-2">
              <Label htmlFor="currentSource">Primary Power Source</Label>
              <select
                id="currentSource"
                className="border-input bg-background ring-offset-background focus-visible:ring-ring flex h-10 w-full rounded-md border px-3 py-2 text-sm focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-hidden"
                {...step3Form.register("currentSource")}
              >
                <option value="grid_and_generator">
                  PHCN grid & Backup diesel/petrol generator
                </option>
                <option value="grid_only">PHCN grid only (No generator)</option>
                <option value="generator_only">Diesel/petrol generator only (Off-grid)</option>
                <option value="solar_hybrid">Existing solar hybrid system</option>
              </select>
            </div>

            <div className="space-y-1">
              <Label htmlFor="phcnAvail">Average PHCN Grid Hours per Day</Label>
              <Input
                id="phcnAvail"
                type="number"
                min="0"
                max="24"
                {...step3Form.register("phcnAvailability", { valueAsNumber: true })}
              />
              {step3Form.formState.errors.phcnAvailability && (
                <p className="text-destructive mt-1 text-xs">
                  {step3Form.formState.errors.phcnAvailability.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="fuelCost">Monthly Generator Fuel Cost (₦)</Label>
              <Input
                id="fuelCost"
                type="number"
                min="0"
                {...step3Form.register("monthlyFuelCost", { valueAsNumber: true })}
              />
              {step3Form.formState.errors.monthlyFuelCost && (
                <p className="text-destructive mt-1 text-xs">
                  {step3Form.formState.errors.monthlyFuelCost.message}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="elecBill">Average Monthly Electricity Bill (₦)</Label>
              <Input
                id="elecBill"
                type="number"
                min="0"
                {...step3Form.register("averageElectricityBill", { valueAsNumber: true })}
              />
              {step3Form.formState.errors.averageElectricityBill && (
                <p className="text-destructive mt-1 text-xs">
                  {step3Form.formState.errors.averageElectricityBill.message}
                </p>
              )}
            </div>

            {/* Boolean Checkboxes */}
            <div className="space-y-3 pt-2 sm:col-span-2">
              <Label className="border-border/40 block border-b pb-2">
                Existing Energy Equipment
              </Label>

              <label className="flex cursor-pointer items-center space-x-3">
                <input
                  type="checkbox"
                  className="border-border accent-primary size-4 rounded-sm"
                  {...step3Form.register("generatorOwnership")}
                />
                <span className="text-foreground text-sm">Do you own a power generator?</span>
              </label>

              <label className="flex cursor-pointer items-center space-x-3">
                <input
                  type="checkbox"
                  className="border-border accent-primary size-4 rounded-sm"
                  {...step3Form.register("hasExistingInverter")}
                />
                <span className="text-foreground text-sm">
                  Do you have an existing backup inverter?
                </span>
              </label>

              <label className="flex cursor-pointer items-center space-x-3">
                <input
                  type="checkbox"
                  className="border-border accent-primary size-4 rounded-sm"
                  {...step3Form.register("hasExistingSolar")}
                />
                <span className="text-foreground text-sm">
                  Do you have existing solar panels installed?
                </span>
              </label>
            </div>
          </div>

          <div className="border-border/60 flex justify-between border-t pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className={cn(buttonVariants({ variant: "ghost" }), "cursor-pointer gap-2")}
            >
              <ArrowLeft className="size-4" /> Back
            </button>
            <button
              type="submit"
              disabled={saving}
              className={cn(buttonVariants(), "cursor-pointer gap-2")}
            >
              {saving && <Loader2 className="size-4 animate-spin" />}
              Complete Onboarding <ShieldCheck className="size-4" />
            </button>
          </div>
        </form>
      )}
    </Card>
  );
}
