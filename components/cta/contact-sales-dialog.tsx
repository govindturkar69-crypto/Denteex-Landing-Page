"use client";

import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Loader2 } from "lucide-react";
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

type Status = "form" | "loading" | "success";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

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
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [chairs, setChairs] = useState("");
  const [budget, setBudget] = useState<string | undefined>(undefined);
  const [integrationNeeds, setIntegrationNeeds] = useState("");
  const [touched, setTouched] = useState(false);

  const nameValid = name.trim().length > 1;
  const emailValid = EMAIL_RE.test(email);
  const clinicValid = clinicName.trim().length > 1;
  const chairsValid = chairs !== "" && Number(chairs) > 0;
  const formValid = nameValid && emailValid && clinicValid && chairsValid;

  const reset = () => {
    setStatus("form");
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
    if (!formValid || status === "loading") return;
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
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
                    aria-invalid={touched && !nameValid}
                  />
                  {touched && !nameValid && (
                    <p className="text-xs text-destructive">
                      Please enter your name.
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
                    aria-invalid={touched && !emailValid}
                  />
                  {touched && !emailValid && (
                    <p className="text-xs text-destructive">Invalid email.</p>
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
                    aria-invalid={touched && !clinicValid}
                  />
                  {touched && !clinicValid && (
                    <p className="text-xs text-destructive">
                      Please enter a clinic name.
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
                    aria-invalid={touched && !chairsValid}
                  />
                  {touched && !chairsValid && (
                    <p className="text-xs text-destructive">
                      Enter a number greater than 0.
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
