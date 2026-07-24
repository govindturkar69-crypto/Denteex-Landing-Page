"use client";

import { useEffect, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { Check, Eye, EyeOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { dashboardPreviewStats, onboardingSteps } from "@/lib/cta-content";

type Status = "form" | "loading" | "success";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function FreeTrialDialog({
  open,
  onOpenChange,
  plan,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan?: string;
}) {
  const [status, setStatus] = useState<Status>("form");
  const [loadingStep, setLoadingStep] = useState(0);
  const [doctorName, setDoctorName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [practiceName, setPracticeName] = useState("");
  const [touched, setTouched] = useState(false);

  const doctorValid = doctorName.trim().length > 1;
  const emailValid = EMAIL_RE.test(email);
  const passwordValid = password.length >= 8;
  const practiceValid = practiceName.trim().length > 1;
  const formValid = doctorValid && emailValid && passwordValid && practiceValid;

  useEffect(() => {
    if (status !== "loading" || loadingStep >= onboardingSteps.length) return;
    const timer = setTimeout(() => {
      setLoadingStep((s) => {
        const next = s + 1;
        if (next >= onboardingSteps.length) setStatus("success");
        return next;
      });
    }, 650);
    return () => clearTimeout(timer);
  }, [status, loadingStep]);

  const reset = () => {
    setStatus("form");
    setLoadingStep(0);
    setDoctorName("");
    setEmail("");
    setPassword("");
    setShowPassword(false);
    setPracticeName("");
    setTouched(false);
  };

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) setTimeout(reset, 200);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!formValid || status !== "form") return;
    setStatus("loading");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        {status === "form" && (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <DialogTitle>Start Your Free Trial</DialogTitle>
                {plan && <Badge variant="secondary">{plan} plan</Badge>}
              </div>
              <DialogDescription>
                No credit card required. Set up your workspace in under a
                minute.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="trial-doctor-name">Doctor name</Label>
                <Input
                  id="trial-doctor-name"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  placeholder="Dr. Jane Doe"
                  aria-invalid={touched && !doctorValid}
                />
                {touched && !doctorValid && (
                  <p className="text-xs text-destructive">
                    Please enter your name.
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="trial-email">Email</Label>
                <Input
                  id="trial-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@clinic.com"
                  aria-invalid={touched && !emailValid}
                />
                {touched && !emailValid && (
                  <p className="text-xs text-destructive">Invalid email.</p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="trial-password">Password</Label>
                <div className="relative">
                  <Input
                    id="trial-password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="At least 8 characters"
                    aria-invalid={touched && !passwordValid}
                    className="pr-9"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-2 flex items-center text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? (
                      <EyeOff className="size-4" />
                    ) : (
                      <Eye className="size-4" />
                    )}
                  </button>
                </div>
                {touched && !passwordValid && (
                  <p className="text-xs text-destructive">
                    Password must be at least 8 characters.
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="trial-practice-name">Practice name</Label>
                <Input
                  id="trial-practice-name"
                  value={practiceName}
                  onChange={(e) => setPracticeName(e.target.value)}
                  placeholder="Choice Dental Care"
                  aria-invalid={touched && !practiceValid}
                />
                {touched && !practiceValid && (
                  <p className="text-xs text-destructive">
                    Please enter your practice name.
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button type="submit" className="w-full">
                  Start Free Trial
                </Button>
              </DialogFooter>
            </form>
          </>
        )}

        {status === "loading" && (
          <div className="flex flex-col items-center py-6 text-center">
            <Loader2 className="size-8 animate-spin text-primary" />
            <h2 className="mt-4 font-heading text-lg font-semibold">
              Setting up your dashboard&hellip;
            </h2>
            <ul className="mt-5 w-full max-w-xs space-y-2.5 text-left">
              {onboardingSteps.map((step, i) => {
                const done = i < loadingStep;
                const active = i === loadingStep;
                return (
                  <li key={step} className="flex items-center gap-2.5 text-sm">
                    <span
                      className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                        done
                          ? "border-teal-glow bg-teal-glow/20 text-teal-glow"
                          : active
                            ? "border-primary text-primary"
                            : "border-black/10 text-muted-foreground dark:border-white/15"
                      }`}
                    >
                      {done ? (
                        <Check className="size-3" />
                      ) : active ? (
                        <Loader2 className="size-3 animate-spin" />
                      ) : null}
                    </span>
                    <span
                      className={
                        done || active
                          ? "text-foreground"
                          : "text-muted-foreground"
                      }
                    >
                      {step}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}

        {status === "success" && (
          <div className="flex flex-col items-center py-4 text-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex size-14 items-center justify-center rounded-full bg-teal-glow/15 text-teal-glow"
            >
              <Check className="size-7" />
            </motion.div>
            <h2 className="mt-4 font-heading text-xl font-semibold">
              Your trial is live!
            </h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {practiceName || "Your practice"} is ready to go. Here&apos;s a
              peek at your new dashboard.
            </p>

            <div className="mt-5 grid w-full grid-cols-3 gap-2 rounded-xl border border-black/5 bg-card p-3 dark:border-white/10">
              {dashboardPreviewStats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="font-heading text-lg font-semibold">
                    {stat.value}
                  </p>
                  <p className="mt-0.5 text-[10px] text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>

            <Button className="mt-6 w-full" onClick={() => handleOpenChange(false)}>
              Done
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
