"use client";

import { useMemo, useState, type FormEvent } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ContactSalesForm } from "@/components/cta/contact-sales-form";
import { ContactSalesSuccess } from "@/components/cta/contact-sales-success";
import { contactSalesSchema } from "@/lib/schemas";

type Status = "form" | "loading" | "success" | "error";

export function ContactSalesDialog({
  open,
  onOpenChange,
  plan,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan?: string;
}) {
  const [status, setStatus] = useState<Status>("form");
  const [errorMessage, setErrorMessage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [chairs, setChairs] = useState("");
  const [budget, setBudget] = useState<string | undefined>(undefined);
  const [integrationNeeds, setIntegrationNeeds] = useState("");
  const [touched, setTouched] = useState(false);

  const parsed = useMemo(
    () =>
      contactSalesSchema.safeParse({
        name,
        email,
        clinicName,
        chairs: chairs === "" ? undefined : chairs,
        budget,
        integrationNeeds,
      }),
    [name, email, clinicName, chairs, budget, integrationNeeds]
  );

  const fieldErrors = parsed.success ? {} : parsed.error.flatten().fieldErrors;

  const reset = () => {
    setStatus("form");
    setErrorMessage("");
    setName("");
    setEmail("");
    setClinicName("");
    setChairs("");
    setBudget(undefined);
    setIntegrationNeeds("");
    setTouched(false);
  };

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) setTimeout(reset, 200);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!parsed.success || status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      const json = await res.json().catch(() => null);
      if (!res.ok) {
        setErrorMessage(
          json?.error ?? "Something went wrong. Please try again."
        );
        setStatus("error");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMessage("Network error. Please check your connection and try again.");
      setStatus("error");
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        {status === "success" ? (
          <ContactSalesSuccess
            name={name}
            email={email}
            clinicName={clinicName}
            onDone={() => handleOpenChange(false)}
          />
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <DialogTitle>Contact Sales</DialogTitle>
                {plan && <Badge variant="secondary">{plan} plan</Badge>}
              </div>
              <DialogDescription>
                Tell us about your practice and we&apos;ll tailor a rollout
                plan.
              </DialogDescription>
            </DialogHeader>
            <ContactSalesForm
              name={name}
              onNameChange={setName}
              email={email}
              onEmailChange={setEmail}
              clinicName={clinicName}
              onClinicNameChange={setClinicName}
              chairs={chairs}
              onChairsChange={setChairs}
              budget={budget}
              onBudgetChange={setBudget}
              integrationNeeds={integrationNeeds}
              onIntegrationNeedsChange={setIntegrationNeeds}
              touched={touched}
              fieldErrors={fieldErrors}
              submitting={status === "loading"}
              errorMessage={status === "error" ? errorMessage : null}
              onSubmit={handleSubmit}
            />
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
