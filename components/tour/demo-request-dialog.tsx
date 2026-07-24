"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Status = "idle" | "loading" | "success";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function DemoRequestDialog({
  open,
  onOpenChange,
  plan,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState(false);

  const nameValid = name.trim().length > 1;
  const emailValid = EMAIL_RE.test(email);
  const clinicValid = clinicName.trim().length > 1;
  const formValid = nameValid && emailValid && clinicValid;

  const reset = () => {
    setName("");
    setEmail("");
    setClinicName("");
    setStatus("idle");
    setTouched(false);
  };

  const handleOpenChange = (next: boolean) => {
    onOpenChange(next);
    if (!next) {
      setTimeout(reset, 200);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!formValid || status === "loading") return;
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className="max-w-md">
        {status === "success" ? (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="size-5 text-teal-glow" />
                <DialogTitle>Request received</DialogTitle>
              </div>
              <DialogDescription>
                Thanks, {name} — our team will reach out to {email} about the{" "}
                {plan} plan shortly.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter>
              <Button onClick={() => handleOpenChange(false)}>Done</Button>
            </DialogFooter>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Request a Demo</DialogTitle>
              <DialogDescription>
                Tell us where to reach you and we&apos;ll set up a walkthrough
                of the <strong>{plan}</strong> plan.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="demo-name">Full name</Label>
                <Input
                  id="demo-name"
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
                <Label htmlFor="demo-email">Work email</Label>
                <Input
                  id="demo-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jane@clinic.com"
                  aria-invalid={touched && !emailValid}
                />
                {touched && !emailValid && (
                  <p className="text-xs text-destructive">
                    Please enter a valid email address.
                  </p>
                )}
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="demo-clinic">Clinic name</Label>
                <Input
                  id="demo-clinic"
                  value={clinicName}
                  onChange={(e) => setClinicName(e.target.value)}
                  placeholder="Choice Dental Care"
                  aria-invalid={touched && !clinicValid}
                />
                {touched && !clinicValid && (
                  <p className="text-xs text-destructive">
                    Please enter your clinic name.
                  </p>
                )}
              </div>
              <DialogFooter>
                <Button type="submit" disabled={status === "loading"}>
                  {status === "loading" && (
                    <Loader2 className="size-4 animate-spin" />
                  )}
                  Request Demo for {plan}
                </Button>
              </DialogFooter>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
