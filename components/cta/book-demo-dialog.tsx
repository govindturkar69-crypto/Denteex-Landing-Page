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
import { BookDemoStepDetails } from "@/components/cta/book-demo-step-details";
import { BookDemoStepContact } from "@/components/cta/book-demo-step-contact";
import { BookDemoSuccess } from "@/components/cta/book-demo-success";
import { cn } from "@/lib/utils";
import { clinicSizes, getUpcomingWeekdays } from "@/lib/cta-content";
import { bookDemoSchema } from "@/lib/schemas";

type Status = "form" | "loading" | "success" | "error";

const upcomingDays = getUpcomingWeekdays(5);

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
          <BookDemoSuccess
            weekday={selectedDayLabel?.weekday}
            date={selectedDayLabel?.date}
            time={selectedTime}
            clinicSizeLabel={clinicSizeLabel}
            email={email}
            onDone={() => handleOpenChange(false)}
          />
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
              <BookDemoStepDetails
                upcomingDays={upcomingDays}
                clinicSize={clinicSize}
                onClinicSizeChange={setClinicSize}
                selectedDay={selectedDay}
                onSelectedDayChange={setSelectedDay}
                selectedTime={selectedTime}
                onSelectedTimeChange={setSelectedTime}
                canContinue={step1Valid}
                onNext={() => setWizardStep(2)}
              />
            ) : (
              <BookDemoStepContact
                doctorName={doctorName}
                onDoctorNameChange={setDoctorName}
                clinicName={clinicName}
                onClinicNameChange={setClinicName}
                email={email}
                onEmailChange={setEmail}
                whatsapp={whatsapp}
                onWhatsappChange={setWhatsapp}
                touched={touched}
                fieldErrors={fieldErrors}
                submitting={status === "loading"}
                errorMessage={status === "error" ? errorMessage : null}
                onBack={() => setWizardStep(1)}
                onSubmit={handleSubmit}
              />
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
