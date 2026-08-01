"use client";

import { useEffect, useMemo, useState, type FormEvent } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FreeTrialForm } from "@/components/cta/free-trial-form";
import { FreeTrialOnboarding } from "@/components/cta/free-trial-onboarding";
import { FreeTrialSuccess } from "@/components/cta/free-trial-success";
import { onboardingSteps } from "@/lib/cta-content";
import { freeTrialSchema } from "@/lib/schemas";

type Status = "form" | "loading" | "success";

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
  const [practiceName, setPracticeName] = useState("");
  const [touched, setTouched] = useState(false);

  const parsed = useMemo(
    () => freeTrialSchema.safeParse({ doctorName, email, password, practiceName }),
    [doctorName, email, password, practiceName]
  );
  const fieldErrors = parsed.success ? {} : parsed.error.flatten().fieldErrors;

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
    if (!parsed.success || status !== "form") return;
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
            <FreeTrialForm
              doctorName={doctorName}
              onDoctorNameChange={setDoctorName}
              email={email}
              onEmailChange={setEmail}
              password={password}
              onPasswordChange={setPassword}
              practiceName={practiceName}
              onPracticeNameChange={setPracticeName}
              touched={touched}
              fieldErrors={fieldErrors}
              onSubmit={handleSubmit}
            />
          </>
        )}

        {status === "loading" && <FreeTrialOnboarding loadingStep={loadingStep} />}

        {status === "success" && (
          <FreeTrialSuccess
            practiceName={practiceName}
            onDone={() => handleOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}
