"use client";

import { useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { budgetRanges } from "@/lib/cta-content";
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
          <div className="flex flex-col items-center py-4 text-center">
            <motion.div
              initial={{ scale: 0.6, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="flex size-14 items-center justify-center rounded-full bg-teal-glow/15 text-teal-glow"
            >
              <CheckCircle2 className="size-7" />
            </motion.div>
            <h2 className="mt-4 font-heading text-xl font-semibold">
              Thanks, {name}!
            </h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              Our enterprise team will reach out to {email} within 1 business
              day to discuss {clinicName}&apos;s rollout.
            </p>
            <Button className="mt-6" onClick={() => handleOpenChange(false)}>
              Done
            </Button>
          </div>
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
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="sales-name">Full name</Label>
                  <Input
                    id="sales-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Dr. Jane Doe"
                    aria-invalid={touched && !!fieldErrors.name}
                  />
                  {touched && fieldErrors.name && (
                    <p className="text-xs text-destructive">
                      {fieldErrors.name[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sales-email">Work email</Label>
                  <Input
                    id="sales-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@clinic.com"
                    aria-invalid={touched && !!fieldErrors.email}
                  />
                  {touched && fieldErrors.email && (
                    <p className="text-xs text-destructive">
                      {fieldErrors.email[0]}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-1.5">
                  <Label htmlFor="sales-clinic">Clinic / group name</Label>
                  <Input
                    id="sales-clinic"
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                    placeholder="Choice Dental Group"
                    aria-invalid={touched && !!fieldErrors.clinicName}
                  />
                  {touched && fieldErrors.clinicName && (
                    <p className="text-xs text-destructive">
                      {fieldErrors.clinicName[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="sales-chairs">Number of chairs</Label>
                  <Input
                    id="sales-chairs"
                    type="number"
                    min={1}
                    value={chairs}
                    onChange={(e) => setChairs(e.target.value)}
                    placeholder="12"
                    aria-invalid={touched && !!fieldErrors.chairs}
                  />
                  {touched && fieldErrors.chairs && (
                    <p className="text-xs text-destructive">
                      {fieldErrors.chairs[0]}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="sales-budget">Budget range</Label>
                <Select
                  value={budget}
                  onValueChange={(value) => setBudget(value ?? undefined)}
                >
                  <SelectTrigger id="sales-budget" className="w-full">
                    <SelectValue placeholder="Select a range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetRanges.map((range) => (
                      <SelectItem key={range} value={range}>
                        {range}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="sales-integration">
                  Custom integration needs{" "}
                  <span className="text-muted-foreground">(optional)</span>
                </Label>
                <Textarea
                  id="sales-integration"
                  value={integrationNeeds}
                  onChange={(e) => setIntegrationNeeds(e.target.value)}
                  placeholder="e.g. existing EHR migration, insurance API, custom SSO..."
                  rows={3}
                />
              </div>

              {status === "error" && (
                <p className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
                  <AlertCircle className="size-3.5 shrink-0" />
                  {errorMessage}
                </p>
              )}

              <DialogFooter>
                <Button type="submit" disabled={status === "loading"} className="w-full">
                  {status === "loading" && (
                    <Loader2 className="size-4 animate-spin" />
                  )}
                  Submit Inquiry
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
