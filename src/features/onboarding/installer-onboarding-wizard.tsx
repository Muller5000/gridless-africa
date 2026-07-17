"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { createClient } from "@/lib/supabase/client";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Loader2, Briefcase, Users, Award, Upload, Plus, Trash2, CheckCircle } from "lucide-react";

// --- Validation Schemas ---
const step1Schema = zod
  .object({
    companyName: zod.string().min(2, "Company Name must be at least 2 characters."),
    cacRegistration: zod.boolean(),
    rcNumber: zod.string().optional(),
    yearsOfExperience: zod.number().min(0, "Years of experience cannot be negative."),
    operatingStates: zod.array(zod.string()).min(1, "Select at least one operating state."),
    operatingLgas: zod.array(zod.string()).min(1, "Select at least one operating LGA."),
  })
  .refine((data) => !data.cacRegistration || (data.rcNumber && data.rcNumber.trim().length > 0), {
    message: "RC Number is required if company is CAC registered.",
    path: ["rcNumber"],
  });

type Step1Values = zod.infer<typeof step1Schema>;

const step2Schema = zod.object({
  specializations: zod.array(zod.string()).min(1, "Select at least one specialization."),
  techniciansCount: zod.number().min(0, "Count cannot be negative."),
  engineersCount: zod.number().min(0, "Count cannot be negative."),
  supportStaffCount: zod.number().min(0, "Count cannot be negative."),
});

type Step2Values = zod.infer<typeof step2Schema>;

const NIGERIAN_STATES: Record<string, string[]> = {
  Lagos: ["Ikeja", "Lagos Island", "Alimosho", "Lekki", "Victoria Island"],
  Oyo: ["Ibadan North", "Ibadan North-East", "Ibadan South-West", "Akinyele", "Ogbomosho"],
};

const SPECIALIZATION_OPTIONS = [
  { id: "residential", label: "Residential Solar" },
  { id: "commercial", label: "Commercial Systems" },
  { id: "industrial", label: "Industrial Projects" },
  { id: "mini-grid", label: "Mini-grid Installations" },
  { id: "maintenance", label: "System Maintenance & Audit" },
  { id: "battery_replacement", label: "Battery Replacement & Retrofits" },
];

interface MockCert {
  name: string;
  licenseNumber?: string;
  documentUrl: string;
}

interface MockPortfolio {
  title: string;
  description: string;
  systemSizeKva: number;
  imageUrls: string[];
}

export default function InstallerOnboardingWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Lists for Step 3 uploads
  const [certifications, setCertifications] = useState<MockCert[]>([]);
  const [portfolioProjects, setPortfolioProjects] = useState<MockPortfolio[]>([]);

  // Sub Supabase Storage Upload state
  const [uploadingCert, setUploadingCert] = useState(false);
  const [uploadingPortfolio, setUploadingPortfolio] = useState(false);

  const supabase = createClient();

  // Form hooks
  const step1Form = useForm<Step1Values>({
    resolver: zodResolver(step1Schema),
    defaultValues: {
      companyName: "",
      cacRegistration: false,
      rcNumber: "",
      yearsOfExperience: 1,
      operatingStates: [],
      operatingLgas: [],
    },
  });

  const step2Form = useForm<Step2Values>({
    resolver: zodResolver(step2Schema),
    defaultValues: {
      specializations: [],
      techniciansCount: 0,
      engineersCount: 0,
      supportStaffCount: 0,
    },
  });

  // Dynamic LGA options based on selected states
  const watchedStates = step1Form.watch("operatingStates") || [];
  const availableLgas = watchedStates.reduce<string[]>((list, state) => {
    if (NIGERIAN_STATES[state]) {
      list.push(...NIGERIAN_STATES[state]);
    }
    return list;
  }, []);

  // Load user details and existing profiles on mount
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
        setUserEmail(user.email || null);

        // Fetch installer profile details
        const { data: profile } = await supabase
          .from("installer_profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (profile) {
          setStep(profile.onboarding_step || 1);
          step1Form.reset({
            companyName: profile.company_name || "",
            cacRegistration: profile.cac_registration || false,
            rcNumber: profile.rc_number || "",
            yearsOfExperience: Number(profile.years_of_experience) || 1,
            operatingStates: profile.operating_states || [],
            operatingLgas: profile.operating_lgas || [],
          });

          step2Form.reset({
            specializations: profile.specializations || [],
            techniciansCount: Number(profile.technicians_count) || 0,
            engineersCount: Number(profile.engineers_count) || 0,
            supportStaffCount: Number(profile.support_staff_count) || 0,
          });

          // Fetch certifications
          const { data: certs } = await supabase
            .from("installer_certifications")
            .select("*")
            .eq("installer_id", user.id);
          if (certs) {
            setCertifications(
              certs.map((c) => ({
                name: c.name,
                licenseNumber: c.license_number || undefined,
                documentUrl: c.document_url,
              })),
            );
          }

          // Fetch portfolios
          const { data: portfolios } = await supabase
            .from("installer_portfolios")
            .select("*")
            .eq("installer_id", user.id);
          if (portfolios) {
            setPortfolioProjects(
              portfolios.map((p) => ({
                title: p.title,
                description: p.description,
                systemSizeKva: Number(p.system_size_kva),
                imageUrls: p.image_urls || [],
              })),
            );
          }
        }
      } catch (err) {
        console.error("Failed to load installer data", err);
      } finally {
        setLoading(false);
      }
    }

    loadData();
  }, [supabase, step1Form, step2Form]);

  // File Upload Handlers to Supabase Storage
  const handleUploadCertFile = async (
    e: React.ChangeEvent<HTMLInputElement>,
    certIndex: number,
  ) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;
    setUploadingCert(true);
    try {
      const path = `${userId}/certifications/${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from("installers").upload(path, file);
      if (error) throw error;

      const publicUrl = supabase.storage.from("installers").getPublicUrl(path).data.publicUrl;
      // Add or update certification file URL
      setCertifications((prev) => {
        const copy = [...prev];
        if (copy[certIndex]) {
          copy[certIndex].documentUrl = publicUrl;
        }
        return copy;
      });
    } catch (err) {
      console.error(err);
      alert("Failed to upload document. Make sure the storage bucket exists.");
    } finally {
      setUploadingCert(false);
    }
  };

  const handleUploadPortfolioImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    projectIndex: number,
  ) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;
    setUploadingPortfolio(true);
    try {
      const path = `${userId}/portfolios/${Date.now()}_${file.name}`;
      const { error } = await supabase.storage.from("installers").upload(path, file);
      if (error) throw error;

      const publicUrl = supabase.storage.from("installers").getPublicUrl(path).data.publicUrl;
      setPortfolioProjects((prev) => {
        const copy = [...prev];
        if (copy[projectIndex]) {
          copy[projectIndex].imageUrls = [publicUrl];
        }
        return copy;
      });
    } catch (err) {
      console.error(err);
      alert("Failed to upload portfolio photo. Make sure the storage bucket exists.");
    } finally {
      setUploadingPortfolio(false);
    }
  };

  // Step submissions
  const saveStep1 = async (values: Step1Values) => {
    if (!userId) return;
    setSaving(true);
    try {
      // First ensure profile has a record in public.profiles table
      await supabase.from("profiles").upsert(
        {
          id: userId,
          email: userEmail || "",
          onboarding_step: 1,
        },
        { onConflict: "id" },
      );

      const { error } = await supabase.from("installer_profiles").upsert(
        {
          id: userId,
          company_name: values.companyName,
          cac_registration: values.cacRegistration,
          rc_number: values.rcNumber || null,
          operating_states: values.operatingStates,
          operating_lgas: values.operatingLgas,
          years_of_experience: values.yearsOfExperience,
          onboarding_step: 2,
        },
        { onConflict: "id" },
      );

      if (error) throw error;
      setStep(2);
    } catch (err) {
      console.error(err);
      alert("Failed to save business profile details.");
    } finally {
      setSaving(false);
    }
  };

  const saveStep2 = async (values: Step2Values) => {
    if (!userId) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("installer_profiles")
        .update({
          specializations: values.specializations,
          technicians_count: values.techniciansCount,
          engineers_count: values.engineersCount,
          support_staff_count: values.supportStaffCount,
          onboarding_step: 3,
        })
        .eq("id", userId);

      if (error) throw error;
      setStep(3);
    } catch (err) {
      console.error(err);
      alert("Failed to save professional profile details.");
    } finally {
      setSaving(false);
    }
  };

  const saveStep3 = async () => {
    if (!userId) return;
    setSaving(true);
    try {
      // Save certifications
      if (certifications.length > 0) {
        // Delete existing certifications first to prevent duplicate keys
        await supabase.from("installer_certifications").delete().eq("installer_id", userId);

        const { error: certErr } = await supabase.from("installer_certifications").insert(
          certifications.map((c) => ({
            installer_id: userId,
            name: c.name,
            license_number: c.licenseNumber || null,
            document_url: c.documentUrl,
          })),
        );
        if (certErr) throw certErr;
      }

      // Save portfolios
      if (portfolioProjects.length > 0) {
        // Delete existing portfolios first
        await supabase.from("installer_portfolios").delete().eq("installer_id", userId);

        const { error: portErr } = await supabase.from("installer_portfolios").insert(
          portfolioProjects.map((p) => ({
            installer_id: userId,
            title: p.title,
            description: p.description,
            system_size_kva: p.systemSizeKva,
            image_urls: p.imageUrls,
          })),
        );
        if (portErr) throw portErr;
      }

      // Mark onboarding as completed and status under manual admin review
      const { error } = await supabase
        .from("installer_profiles")
        .update({
          onboarding_completed: true,
          verification_status: "under_review",
          onboarding_step: 3,
        })
        .eq("id", userId);

      if (error) throw error;

      router.push("/installer-dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to save documents & portfolios. Please check files and try again.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-[450px] w-full flex-col items-center justify-center space-y-4">
        <Loader2 className="text-primary size-8 animate-spin" />
        <p className="text-muted-foreground text-xs">Loading onboarding registry portal...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-8 md:py-12">
      {/* Step Header */}
      <div className="mb-8 space-y-4 text-center">
        <h2 className="text-foreground text-2xl font-black tracking-tight sm:text-3xl">
          Installer Verification Registry
        </h2>
        <p className="text-muted-foreground mx-auto max-w-sm text-xs">
          Complete company credentials to unlock regional leads geofencing.
        </p>

        {/* Wizard Dots Progress */}
        <div className="flex items-center justify-center space-x-6 pt-2">
          {[1, 2, 3].map((s) => (
            <div key={s} className="flex items-center space-x-2">
              <div
                className={cn(
                  "flex size-7 items-center justify-center rounded-full text-xs font-bold transition-all",
                  step === s
                    ? "bg-primary text-primary-foreground ring-primary/20 ring-4"
                    : step > s
                      ? "bg-emerald-600 text-white"
                      : "bg-muted text-muted-foreground",
                )}
              >
                {step > s ? <CheckCircle className="size-4" /> : s}
              </div>
              <span
                className={cn(
                  "hidden text-[10px] font-semibold tracking-wider uppercase sm:inline",
                  step === s ? "text-primary" : "text-muted-foreground",
                )}
              >
                {s === 1 ? "Business" : s === 2 ? "Professional" : "Credentials"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* STEP 1: BUSINESS PROFILE */}
      {step === 1 && (
        <Card className="border-border bg-card animate-in fade-in border p-6 shadow-md duration-200">
          <form onSubmit={step1Form.handleSubmit(saveStep1)} className="space-y-6">
            <div className="text-primary border-border mb-2 flex items-center space-x-2 border-b pb-3 text-sm font-bold">
              <Briefcase className="size-4" />
              <span>Business Profile Details</span>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="companyName">Company / Installer Name</Label>
                <Input
                  id="companyName"
                  placeholder="e.g. Solace Power Ltd"
                  {...step1Form.register("companyName")}
                />
                {step1Form.formState.errors.companyName && (
                  <p className="text-destructive text-[10px]">
                    {step1Form.formState.errors.companyName.message}
                  </p>
                )}
              </div>

              <div className="flex items-center space-x-2.5 pt-1">
                <input
                  id="cacRegistration"
                  type="checkbox"
                  className="accent-primary size-4 cursor-pointer rounded-sm"
                  {...step1Form.register("cacRegistration")}
                />
                <Label htmlFor="cacRegistration" className="cursor-pointer">
                  Company is CAC Registered
                </Label>
              </div>

              {step1Form.watch("cacRegistration") && (
                <div className="animate-in slide-in-from-top-2 space-y-2 duration-100">
                  <Label htmlFor="rcNumber">RC / Business Registration Number</Label>
                  <Input
                    id="rcNumber"
                    placeholder="e.g. RC-1234567"
                    {...step1Form.register("rcNumber")}
                  />
                  {step1Form.formState.errors.rcNumber && (
                    <p className="text-destructive text-[10px]">
                      {step1Form.formState.errors.rcNumber.message}
                    </p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="yearsOfExperience">Years of Experience</Label>
                  <Input
                    id="yearsOfExperience"
                    type="number"
                    {...step1Form.register("yearsOfExperience", { valueAsNumber: true })}
                  />
                  {step1Form.formState.errors.yearsOfExperience && (
                    <p className="text-destructive text-[10px]">
                      {step1Form.formState.errors.yearsOfExperience.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Operating States Checkboxes */}
              <div className="border-border space-y-2.5 border-t pt-4">
                <Label>Operating States (Matches Leads Inbound)</Label>
                <div className="flex flex-wrap gap-4">
                  {Object.keys(NIGERIAN_STATES).map((state) => (
                    <label
                      key={state}
                      className="text-foreground flex cursor-pointer items-center space-x-2 text-xs"
                    >
                      <input
                        type="checkbox"
                        value={state}
                        checked={watchedStates.includes(state)}
                        className="accent-primary size-3.5"
                        onChange={(e) => {
                          const val = e.target.value;
                          const current = watchedStates;
                          if (e.target.checked) {
                            step1Form.setValue("operatingStates", [...current, val], {
                              shouldValidate: true,
                            });
                          } else {
                            step1Form.setValue(
                              "operatingStates",
                              current.filter((s) => s !== val),
                              { shouldValidate: true },
                            );
                            // Clean LGAs belonging to unchecked state
                            const currentLgas = step1Form.getValues("operatingLgas") || [];
                            const stateLgas = NIGERIAN_STATES[val] || [];
                            step1Form.setValue(
                              "operatingLgas",
                              currentLgas.filter((l) => !stateLgas.includes(l)),
                            );
                          }
                        }}
                      />
                      <span>{state} State</span>
                    </label>
                  ))}
                </div>
                {step1Form.formState.errors.operatingStates && (
                  <p className="text-destructive text-[10px]">
                    {step1Form.formState.errors.operatingStates.message}
                  </p>
                )}
              </div>

              {/* Operating LGAs Grid */}
              {watchedStates.length > 0 && (
                <div className="border-border/60 animate-in slide-in-from-top-2 space-y-2.5 border-t pt-4 duration-100">
                  <Label>Select Covered LGAs</Label>
                  <div className="border-border bg-muted/5 grid max-h-44 grid-cols-2 gap-2 overflow-y-auto rounded-md border p-3 pr-1">
                    {availableLgas.map((lga) => {
                      const watchedLgas = step1Form.watch("operatingLgas") || [];
                      return (
                        <label
                          key={lga}
                          className="hover:bg-muted/10 flex cursor-pointer items-center space-x-2 rounded-sm p-1 text-xs"
                        >
                          <input
                            type="checkbox"
                            value={lga}
                            checked={watchedLgas.includes(lga)}
                            className="accent-primary size-3.5"
                            onChange={(e) => {
                              const val = e.target.value;
                              if (e.target.checked) {
                                step1Form.setValue("operatingLgas", [...watchedLgas, val], {
                                  shouldValidate: true,
                                });
                              } else {
                                step1Form.setValue(
                                  "operatingLgas",
                                  watchedLgas.filter((l) => l !== val),
                                  { shouldValidate: true },
                                );
                              }
                            }}
                          />
                          <span>{lga}</span>
                        </label>
                      );
                    })}
                  </div>
                  {step1Form.formState.errors.operatingLgas && (
                    <p className="text-destructive text-[10px]">
                      {step1Form.formState.errors.operatingLgas.message}
                    </p>
                  )}
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={saving}
              className={cn(buttonVariants({ className: "w-full cursor-pointer" }), "gap-2")}
            >
              {saving && <Loader2 className="size-4 animate-spin" />}
              Save & Continue
            </button>
          </form>
        </Card>
      )}

      {/* STEP 2: PROFESSIONAL PROFILE */}
      {step === 2 && (
        <Card className="border-border bg-card animate-in fade-in border p-6 shadow-md duration-200">
          <form onSubmit={step2Form.handleSubmit(saveStep2)} className="space-y-6">
            <div className="text-primary border-border mb-2 flex items-center space-x-2 border-b pb-3 text-sm font-bold">
              <Users className="size-4" />
              <span>Professional Capabilities & Team</span>
            </div>

            <div className="space-y-5">
              {/* Specializations list */}
              <div className="space-y-3">
                <Label>Areas of Specialization</Label>
                <div className="grid grid-cols-1 gap-3.5 sm:grid-cols-2">
                  {SPECIALIZATION_OPTIONS.map((opt) => {
                    const watchedSpecs = step2Form.watch("specializations") || [];
                    const isChecked = watchedSpecs.includes(opt.id);
                    return (
                      <label
                        key={opt.id}
                        className={cn(
                          "border-border hover:bg-muted/10 flex cursor-pointer items-center space-x-3 rounded-lg border p-3 transition-all",
                          isChecked && "border-primary bg-primary/5 ring-primary ring-1",
                        )}
                      >
                        <input
                          type="checkbox"
                          value={opt.id}
                          checked={isChecked}
                          className="accent-primary size-4"
                          onChange={(e) => {
                            const val = e.target.value;
                            if (e.target.checked) {
                              step2Form.setValue("specializations", [...watchedSpecs, val], {
                                shouldValidate: true,
                              });
                            } else {
                              step2Form.setValue(
                                "specializations",
                                watchedSpecs.filter((s) => s !== val),
                                { shouldValidate: true },
                              );
                            }
                          }}
                        />
                        <span className="text-foreground text-xs font-semibold">{opt.label}</span>
                      </label>
                    );
                  })}
                </div>
                {step2Form.formState.errors.specializations && (
                  <p className="text-destructive text-[10px]">
                    {step2Form.formState.errors.specializations.message}
                  </p>
                )}
              </div>

              {/* Team Information */}
              <div className="border-border space-y-3 border-t pt-4">
                <Label>Team Size & Resources</Label>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <Label
                      htmlFor="techniciansCount"
                      className="text-muted-foreground text-[10px] uppercase"
                    >
                      Technicians
                    </Label>
                    <Input
                      id="techniciansCount"
                      type="number"
                      {...step2Form.register("techniciansCount", { valueAsNumber: true })}
                    />
                    {step2Form.formState.errors.techniciansCount && (
                      <p className="text-destructive text-[9px]">
                        {step2Form.formState.errors.techniciansCount.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="engineersCount"
                      className="text-muted-foreground text-[10px] uppercase"
                    >
                      Engineers
                    </Label>
                    <Input
                      id="engineersCount"
                      type="number"
                      {...step2Form.register("engineersCount", { valueAsNumber: true })}
                    />
                    {step2Form.formState.errors.engineersCount && (
                      <p className="text-destructive text-[9px]">
                        {step2Form.formState.errors.engineersCount.message}
                      </p>
                    )}
                  </div>

                  <div className="space-y-1.5">
                    <Label
                      htmlFor="supportStaffCount"
                      className="text-muted-foreground text-[10px] uppercase"
                    >
                      Support Staff
                    </Label>
                    <Input
                      id="supportStaffCount"
                      type="number"
                      {...step2Form.register("supportStaffCount", { valueAsNumber: true })}
                    />
                    {step2Form.formState.errors.supportStaffCount && (
                      <p className="text-destructive text-[9px]">
                        {step2Form.formState.errors.supportStaffCount.message}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-4 pt-2">
              <button
                type="button"
                onClick={() => setStep(1)}
                className={cn(
                  buttonVariants({ variant: "outline", className: "flex-1 cursor-pointer" }),
                )}
              >
                Back
              </button>
              <button
                type="submit"
                disabled={saving}
                className={cn(buttonVariants({ className: "flex-1 cursor-pointer" }), "gap-2")}
              >
                {saving && <Loader2 className="size-4 animate-spin" />}
                Save & Continue
              </button>
            </div>
          </form>
        </Card>
      )}

      {/* STEP 3: CERTIFICATIONS & PORTFOLIO */}
      {step === 3 && (
        <Card className="border-border bg-card animate-in fade-in space-y-6 border p-6 shadow-md duration-200">
          <div className="text-primary border-border mb-2 flex items-center space-x-2 border-b pb-3 text-sm font-bold">
            <Award className="size-4" />
            <span>Professional Licenses & Portfolios</span>
          </div>

          {/* Certifications audits */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Company Certifications
              </Label>
              <button
                type="button"
                onClick={() =>
                  setCertifications((prev) => [
                    ...prev,
                    { name: "", licenseNumber: "", documentUrl: "" },
                  ])
                }
                className="text-primary flex cursor-pointer items-center gap-1 text-xs font-semibold hover:underline"
              >
                <Plus className="size-3.5" /> Add Certification
              </button>
            </div>

            {certifications.length === 0 ? (
              <p className="text-muted-foreground bg-muted/20 rounded-lg p-4 text-center text-[10px]">
                No certifications registered yet. (Add professional training/licenses).
              </p>
            ) : (
              <div className="space-y-4">
                {certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="border-border/80 bg-muted/5 relative space-y-3 rounded-lg border p-4"
                  >
                    <button
                      type="button"
                      onClick={() => setCertifications((prev) => prev.filter((_, i) => i !== idx))}
                      className="text-muted-foreground hover:text-destructive absolute top-3 right-3 cursor-pointer"
                    >
                      <Trash2 className="size-4" />
                    </button>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-1.5">
                        <Label>License Name</Label>
                        <Input
                          placeholder="e.g. COREN Engineer"
                          value={cert.name}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCertifications((prev) => {
                              const copy = [...prev];
                              if (copy[idx]) copy[idx].name = val;
                              return copy;
                            });
                          }}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>License / Cert ID (Optional)</Label>
                        <Input
                          placeholder="e.g. CN-98765"
                          value={cert.licenseNumber || ""}
                          onChange={(e) => {
                            const val = e.target.value;
                            setCertifications((prev) => {
                              const copy = [...prev];
                              if (copy[idx]) copy[idx].licenseNumber = val;
                              return copy;
                            });
                          }}
                        />
                      </div>
                    </div>

                    {/* File Uploader */}
                    <div className="flex items-center space-x-3 pt-2">
                      <label
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "cursor-pointer gap-1.5 text-xs",
                        )}
                      >
                        <Upload className="size-3.5" />
                        <span>Upload Certificate</span>
                        <input
                          type="file"
                          accept=".pdf,.png,.jpg,.jpeg"
                          className="hidden"
                          onChange={(e) => handleUploadCertFile(e, idx)}
                          disabled={uploadingCert}
                        />
                      </label>
                      {cert.documentUrl ? (
                        <span className="max-w-xs truncate text-[10px] font-semibold text-emerald-600">
                          ✓ File uploaded
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-[10px]">
                          PDF or Image (max 5MB)
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Portfolio Audits */}
          <div className="border-border space-y-4 border-t pt-4">
            <div className="flex items-center justify-between">
              <Label className="text-muted-foreground text-xs font-bold tracking-wider uppercase">
                Completed Project Portfolio
              </Label>
              <button
                type="button"
                onClick={() =>
                  setPortfolioProjects((prev) => [
                    ...prev,
                    { title: "", description: "", systemSizeKva: 5.0, imageUrls: [] },
                  ])
                }
                className="text-primary flex cursor-pointer items-center gap-1 text-xs font-semibold hover:underline"
              >
                <Plus className="size-3.5" /> Add Project
              </button>
            </div>

            {portfolioProjects.length === 0 ? (
              <p className="text-muted-foreground bg-muted/20 rounded-lg p-4 text-center text-[10px]">
                No portfolio installations added yet. (Highly recommended for verification).
              </p>
            ) : (
              <div className="space-y-4">
                {portfolioProjects.map((project, idx) => (
                  <div
                    key={idx}
                    className="border-border/80 bg-muted/5 relative space-y-3 rounded-lg border p-4"
                  >
                    <button
                      type="button"
                      onClick={() =>
                        setPortfolioProjects((prev) => prev.filter((_, i) => i !== idx))
                      }
                      className="text-muted-foreground hover:text-destructive absolute top-3 right-3 cursor-pointer"
                    >
                      <Trash2 className="size-4" />
                    </button>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="space-y-1.5 sm:col-span-2">
                        <Label>Project Title</Label>
                        <Input
                          placeholder="e.g. 10kVa Residential Solar, Ibadan"
                          value={project.title}
                          onChange={(e) => {
                            const val = e.target.value;
                            setPortfolioProjects((prev) => {
                              const copy = [...prev];
                              if (copy[idx]) copy[idx].title = val;
                              return copy;
                            });
                          }}
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label>System Size (kVa)</Label>
                        <Input
                          type="number"
                          step="0.5"
                          placeholder="5.0"
                          value={project.systemSizeKva}
                          onChange={(e) => {
                            const val = Number(e.target.value);
                            setPortfolioProjects((prev) => {
                              const copy = [...prev];
                              if (copy[idx]) copy[idx].systemSizeKva = val;
                              return copy;
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <Label>Description</Label>
                      <textarea
                        rows={2}
                        placeholder="Detail the modules, battery storage type, and client outcome..."
                        className="border-border bg-background text-foreground focus:ring-primary w-full rounded-md border p-2.5 text-xs focus:ring-1 focus:outline-none"
                        value={project.description}
                        onChange={(e) => {
                          const val = e.target.value;
                          setPortfolioProjects((prev) => {
                            const copy = [...prev];
                            if (copy[idx]) copy[idx].description = val;
                            return copy;
                          });
                        }}
                      />
                    </div>

                    {/* Portfolio Image Uploader */}
                    <div className="flex items-center space-x-3 pt-1">
                      <label
                        className={cn(
                          buttonVariants({ variant: "outline", size: "sm" }),
                          "cursor-pointer gap-1.5 text-xs",
                        )}
                      >
                        <Upload className="size-3.5" />
                        <span>Upload Project Photo</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => handleUploadPortfolioImage(e, idx)}
                          disabled={uploadingPortfolio}
                        />
                      </label>
                      {project.imageUrls.length > 0 ? (
                        <span className="max-w-xs truncate text-[10px] font-semibold text-emerald-600">
                          ✓ Image uploaded
                        </span>
                      ) : (
                        <span className="text-muted-foreground text-[10px]">Upload JPG or PNG</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="border-border flex gap-4 border-t pt-4">
            <button
              type="button"
              onClick={() => setStep(2)}
              className={cn(
                buttonVariants({ variant: "outline", className: "flex-1 cursor-pointer" }),
              )}
            >
              Back
            </button>
            <button
              type="button"
              onClick={saveStep3}
              disabled={saving || uploadingCert || uploadingPortfolio}
              className={cn(buttonVariants({ className: "flex-1 cursor-pointer" }), "gap-2")}
            >
              {saving && <Loader2 className="size-4 animate-spin" />}
              Submit Registry For Review
            </button>
          </div>
        </Card>
      )}
    </div>
  );
}
