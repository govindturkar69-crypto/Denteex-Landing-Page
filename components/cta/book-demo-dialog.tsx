"use client";

import { useMemo, useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
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
import { ConfettiBurst } from "@/components/cta/confetti-burst";
import { cn } from "@/lib/utils";
import { clinicSizes, getUpcomingWeekdays, timeSlots } from "@/lib/cta-content";
import { bookDemoSchema } from "@/lib/schemas";

type Status = "form" | "loading" | "success" | "error";

const upcomingDays = getUpcomingWeekdays(5);

function AnimatedCheckmark() {
  return (
    <svg viewBox="0 0 52 52" className="size-16 text-teal-glow">
      <motion.circle
        cx="26"
        cy="26"
        r="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.path
        d="M15 27l7 7 15-15"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
      />
    </svg>
  );
}

export function BookDemoDialog({
  open,
  onOpenChange,
  plan,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  plan?: string;
}) {
  const [wizardStep, setWizardStep] = useState<1 | 2>(1);
  const [status, setStatus] = useState<Status>("form");
  const [errorMessage, setErrorMessage] = useState("");
  const [clinicSize, setClinicSize] = useState<string | null>(null);
  const [selectedDay, setSelectedDay] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [doctorName, setDoctorName] = useState("");
  const [clinicName, setClinicName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [touched, setTouched] = useState(false);

  const parsed = useMemo(
    () =>
      bookDemoSchema.safeParse({
        clinicSize,
        date: selectedDay,
        time: selectedTime,
        doctorName,
        clinicName,
        email,
        whatsapp,
      }),
    [clinicSize, selectedDay, selectedTime, doctorName, clinicName, email, whatsapp]
  );

  const fieldErrors = parsed.success ? {} : parsed.error.flatten().fieldErrors;
  const step1Valid =
    !fieldErrors.clinicSize && !fieldErrors.date && !fieldErrors.time;

  const selectedDayLabel = upcomingDays.find((d) => d.iso === selectedDay);
  const clinicSizeLabel = clinicSizes.find((c) => c.id === clinicSize)?.label;

  const reset = () => {
    setWizardStep(1);
    setStatus("form");
    setErrorMessage("");
    setClinicSize(null);
    setSelectedDay(null);
    setSelectedTime(null);
    setDoctorName("");
    setClinicName("");
    setEmail("");
    setWhatsapp("");
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
      const res = await fetch("/api/book-demo", {
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
      <DialogContent className="max-w-lg sm:max-w-xl">
        {status === "success" ? (
          <div className="relative flex flex-col items-center py-4 text-center">
            <ConfettiBurst />
            <AnimatedCheckmark />
            <h2 className="mt-4 font-heading text-xl font-semibold">
              Demo Confirmed!
            </h2>
            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
              We&apos;ll see you on <strong>{selectedDayLabel?.weekday}, {selectedDayLabel?.date}</strong> at{" "}
              <strong>{selectedTime}</strong> for your {clinicSizeLabel} demo.
              A calendar invite is on its way to {email}.
            </p>
            <Button className="mt-6" onClick={() => handleOpenChange(false)}>
              Done
            </Button>
          </div>
        ) : (
          <>
            <DialogHeader>
              <div className="flex items-center gap-2">
                <DialogTitle>Book a Demo</DialogTitle>
                {plan && <Badge variant="secondary">{plan} plan</Badge>}
              </div>
              <DialogDescription>
                Step {wizardStep} of 2 —{" "}
                {wizardStep === 1
                  ? "Tell us about your practice and pick a time."
                  : "How should we reach you?"}
              </DialogDescription>
              <div className="flex gap-1.5 pt-1" aria-hidden="true">
                <span
                  className={cn(
                    "h-1.5 flex-1 rounded-full",
                    wizardStep >= 1 ? "bg-primary" : "bg-muted"
                  )}
                />
                <span
                  className={cn(
                    "h-1.5 flex-1 rounded-full",
                    wizardStep >= 2 ? "bg-primary" : "bg-muted"
                  )}
                />
              </div>
            </DialogHeader>

            {wizardStep === 1 ? (
              <div className="space-y-5">
                <div>
                  <p className="mb-2 text-sm font-medium">Clinic size</p>
                  <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                    {clinicSizes.map((size) => (
                      <button
                        key={size.id}
                        type="button"
                        onClick={() => setClinicSize(size.id)}
                        className={cn(
                          "rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5",
                          clinicSize === size.id
                            ? "border-primary/40 bg-primary/[0.06] ring-1 ring-primary/30"
                            : "border-black/5 dark:border-white/10"
                        )}
                      >
                        <p className="text-sm font-semibold">{size.label}</p>
                        <p className="mt-0.5 text-xs text-muted-foreground">
                          {size.description}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">Pick a date</p>
                  <div className="flex gap-2 overflow-x-auto pb-1">
                    {upcomingDays.map((day) => (
                      <button
                        key={day.iso}
                        type="button"
                        onClick={() => setSelectedDay(day.iso)}
                        className={cn(
                          "flex shrink-0 flex-col items-center rounded-lg border px-3 py-2 text-xs transition-colors",
                          selectedDay === day.iso
                            ? "border-primary/40 bg-primary/[0.06] text-primary"
                            : "border-black/5 text-muted-foreground hover:text-foreground dark:border-white/10"
                        )}
                      >
                        <span className="font-medium">{day.weekday}</span>
                        <span>{day.date}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="mb-2 text-sm font-medium">Pick a time</p>
                  <div className="grid grid-cols-3 gap-2">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={cn(
                          "rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors",
                          selectedTime === time
                            ? "border-primary/40 bg-primary/[0.06] text-primary"
                            : "border-black/5 text-muted-foreground hover:text-foreground dark:border-white/10"
                        )}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>

                <DialogFooter>
                  <Button
                    disabled={!step1Valid}
                    onClick={() => setWizardStep(2)}
                    className="w-full sm:w-auto"
                  >
                    Next
                  </Button>
                </DialogFooter>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <Label htmlFor="demo-doctor-name">Doctor name</Label>
                  <Input
                    id="demo-doctor-name"
                    value={doctorName}
                    onChange={(e) => setDoctorName(e.target.value)}
                    placeholder="Dr. Jane Doe"
                    aria-invalid={touched && !!fieldErrors.doctorName}
                  />
                  {touched && fieldErrors.doctorName && (
                    <p className="text-xs text-destructive">
                      {fieldErrors.doctorName[0]}
                    </p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="demo-clinic-name">Clinic name</Label>
                  <Input
                    id="demo-clinic-name"
                    value={clinicName}
                    onChange={(e) => setClinicName(e.target.value)}
                    placeholder="Choice Dental Care"
                    aria-invalid={touched && !!fieldErrors.clinicName}
                  />
                  {touched && fieldErrors.clinicName && (
                    <p className="text-xs text-destructive">
                      {fieldErrors.clinicName[0]}
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-1.5">
                    <Label htmlFor="demo-email">Email</Label>
                    <Input
                      id="demo-email"
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
                  <div className="space-y-1.5">
                    <Label htmlFor="demo-whatsapp">WhatsApp number</Label>
                    <Input
                      id="demo-whatsapp"
                      type="tel"
                      value={whatsapp}
                      onChange={(e) => setWhatsapp(e.target.value)}
                      placeholder="+1 555 010 1234"
                      aria-invalid={touched && !!fieldErrors.whatsapp}
                    />
                    {touched && fieldErrors.whatsapp && (
                      <p className="text-xs text-destructive">
                        {fieldErrors.whatsapp[0]}
                      </p>
                    )}
                  </div>
                </div>

                {status === "error" && (
                  <p className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
                    <AlertCircle className="size-3.5 shrink-0" />
                    {errorMessage}
                  </p>
                )}

                <DialogFooter className="items-center justify-between sm:justify-between">
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => setWizardStep(1)}
                  >
                    <ArrowLeft className="size-4" />
                    Back
                  </Button>
                  <Button type="submit" disabled={status === "loading"}>
                    {status === "loading" && (
                      <Loader2 className="size-4 animate-spin" />
                    )}
                    Confirm Demo
                  </Button>
                </DialogFooter>
              </form>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
