"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as zod from "zod";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Loader2 } from "lucide-react";

// Schemas for forms
const signInSchema = zod.object({
  email: zod.string().email("Please enter a valid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
});

const signUpSchema = zod.object({
  fullName: zod.string().min(2, "Full name must be at least 2 characters"),
  email: zod.string().email("Please enter a valid email address"),
  password: zod.string().min(6, "Password must be at least 6 characters"),
  role: zod.enum(["customer", "installer"]),
});

const resetSchema = zod.object({
  email: zod.string().email("Please enter a valid email address"),
});

type SignInValues = zod.infer<typeof signInSchema>;
type SignUpValues = zod.infer<typeof signUpSchema>;
type ResetValues = zod.infer<typeof resetSchema>;

export default function AuthForm() {
  const [mode, setMode] = useState<"signin" | "signup" | "reset">("signin");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const supabase = createClient();

  // Sign In Form
  const signInForm = useForm<SignInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: "", password: "" },
  });

  // Sign Up Form
  const signUpForm = useForm<SignUpValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: { fullName: "", email: "", password: "", role: "customer" },
  });

  // Reset Form
  const resetForm = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: { email: "" },
  });

  const handleSignIn = async (values: SignInValues) => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });
      if (error) throw error;
      window.location.assign("/dashboard"); // Use assign() to conform to immutability rules
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (values: SignUpValues) => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const { error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            full_name: values.fullName,
            role: values.role,
          },
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (error) throw error;
      setSuccessMsg("Registration successful! Please check your email for a verification link.");
      signUpForm.reset();
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || "Failed to sign up. Email might already be taken.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (values: ResetValues) => {
    setLoading(true);
    setErrorMsg(null);
    setSuccessMsg(null);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(values.email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      });
      if (error) throw error;
      setSuccessMsg("Password reset link sent! Check your inbox.");
      resetForm.reset();
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || "Failed to send reset link.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Alert Notices */}
      {errorMsg && (
        <div className="border-destructive/20 bg-destructive/10 text-destructive rounded-lg border p-3 text-sm">
          {errorMsg}
        </div>
      )}
      {successMsg && (
        <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-600">
          {successMsg}
        </div>
      )}

      {/* SIGN IN VIEW */}
      {mode === "signin" && (
        <form onSubmit={signInForm.handleSubmit(handleSignIn)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="email">Email Address</Label>
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              {...signInForm.register("email")}
            />
            {signInForm.formState.errors.email && (
              <p className="text-destructive mt-1 text-xs">
                {signInForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <button
                type="button"
                onClick={() => setMode("reset")}
                className="text-primary text-xs font-medium hover:underline"
              >
                Forgot Password?
              </button>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••"
                className="pr-10"
                {...signInForm.register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground absolute top-2.5 right-3"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {signInForm.formState.errors.password && (
              <p className="text-destructive mt-1 text-xs">
                {signInForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(buttonVariants(), "w-full cursor-pointer")}
          >
            {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
            Sign In
          </button>

          <p className="text-muted-foreground mt-4 text-center text-xs">
            Don&apos;t have an account?{" "}
            <button
              type="button"
              onClick={() => setMode("signup")}
              className="text-primary font-bold hover:underline"
            >
              Create Account
            </button>
          </p>
        </form>
      )}

      {/* SIGN UP VIEW */}
      {mode === "signup" && (
        <form onSubmit={signUpForm.handleSubmit(handleSignUp)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="fullName">Full Name / Business Name</Label>
            <Input id="fullName" placeholder="John Doe" {...signUpForm.register("fullName")} />
            {signUpForm.formState.errors.fullName && (
              <p className="text-destructive mt-1 text-xs">
                {signUpForm.formState.errors.fullName.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="regEmail">Email Address</Label>
            <Input
              id="regEmail"
              type="email"
              placeholder="you@example.com"
              {...signUpForm.register("email")}
            />
            {signUpForm.formState.errors.email && (
              <p className="text-destructive mt-1 text-xs">
                {signUpForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <div className="space-y-1">
            <Label htmlFor="regPassword">Password</Label>
            <div className="relative">
              <Input
                id="regPassword"
                type={showPassword ? "text" : "password"}
                placeholder="••••••"
                className="pr-10"
                {...signUpForm.register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-muted-foreground hover:text-foreground absolute top-2.5 right-3"
              >
                {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
              </button>
            </div>
            {signUpForm.formState.errors.password && (
              <p className="text-destructive mt-1 text-xs">
                {signUpForm.formState.errors.password.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <Label>Register As</Label>
            <div className="grid grid-cols-2 gap-4">
              <label className="border-border bg-card hover:bg-muted/30 flex cursor-pointer items-center justify-between rounded-lg border p-3">
                <div className="flex flex-col">
                  <span className="text-foreground text-sm font-semibold">Customer</span>
                  <span className="text-muted-foreground text-[10px]">
                    Find installers & fund project
                  </span>
                </div>
                <input
                  type="radio"
                  value="customer"
                  className="accent-primary"
                  {...signUpForm.register("role")}
                />
              </label>
              <label className="border-border bg-card hover:bg-muted/30 flex cursor-pointer items-center justify-between rounded-lg border p-3">
                <div className="flex flex-col">
                  <span className="text-foreground text-sm font-semibold">Installer</span>
                  <span className="text-muted-foreground text-[10px]">
                    Submit quotes & win leads
                  </span>
                </div>
                <input
                  type="radio"
                  value="installer"
                  className="accent-primary"
                  {...signUpForm.register("role")}
                />
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(buttonVariants(), "w-full cursor-pointer")}
          >
            {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
            Register Account
          </button>

          <p className="text-muted-foreground mt-4 text-center text-xs">
            Already have an account?{" "}
            <button
              type="button"
              onClick={() => setMode("signin")}
              className="text-primary font-bold hover:underline"
            >
              Sign In
            </button>
          </p>
        </form>
      )}

      {/* RESET PASSWORD VIEW */}
      {mode === "reset" && (
        <form onSubmit={resetForm.handleSubmit(handleReset)} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="resetEmail">Email Address</Label>
            <Input
              id="resetEmail"
              type="email"
              placeholder="you@example.com"
              {...resetForm.register("email")}
            />
            {resetForm.formState.errors.email && (
              <p className="text-destructive mt-1 text-xs">
                {resetForm.formState.errors.email.message}
              </p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className={cn(buttonVariants(), "w-full cursor-pointer")}
          >
            {loading && <Loader2 className="mr-2 size-4 animate-spin" />}
            Send Recovery Email
          </button>

          <p className="text-muted-foreground mt-4 text-center text-xs">
            Remember your password?{" "}
            <button
              type="button"
              onClick={() => setMode("signin")}
              className="text-primary font-bold hover:underline"
            >
              Sign In
            </button>
          </p>
        </form>
      )}
    </div>
  );
}
