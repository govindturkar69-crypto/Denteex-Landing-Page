"use client";

import { motion } from "framer-motion";
import { AlertCircle, ArrowLeft, Loader2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { FormField } from "@/components/cta/form-field";
import { cn } from "@/lib/utils";
import type { BookDemoInput } from "@/lib/schemas";

type FieldErrors = Partial<Record<keyof BookDemoInput, string[]>>;

export function BookDemoStepContact({
  doctorName,
  onDoctorNameChange,
  clinicName,
  onClinicNameChange,
  email,
  onEmailChange,
  whatsapp,
  onWhatsappChange,
  touched,
  fieldErrors,
  submitting,
  errorMessage,
  onBack,
  onSubmit,
}: {
  doctorName: string;
  onDoctorNameChange: (value: string) => void;
  clinicName: string;
  onClinicNameChange: (value: string) => void;
  email: string;
  onEmailChange: (value: string) => void;
  whatsapp: string;
  onWhatsappChange: (value: string) => void;
  touched: boolean;
  fieldErrors: FieldErrors;
  submitting: boolean;
  errorMessage: string | null;
  onBack: () => void;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        id="demo-doctor-name"
        label="Doctor name"
        value={doctorName}
        onChange={onDoctorNameChange}
        placeholder="Dr. Jane Doe"
        touched={touched}
        error={fieldErrors.doctorName?.[0]}
      />
      <FormField
        id="demo-clinic-name"
        label="Clinic name"
        value={clinicName}
        onChange={onClinicNameChange}
        placeholder="Choice Dental Care"
        touched={touched}
        error={fieldErrors.clinicName?.[0]}
      />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          id="demo-email"
          label="Email"
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder="jane@clinic.com"
          touched={touched}
          error={fieldErrors.email?.[0]}
        />
        <FormField
          id="demo-whatsapp"
          label="WhatsApp number"
          type="tel"
          value={whatsapp}
          onChange={onWhatsappChange}
          placeholder="+1 555 010 1234"
          touched={touched}
          error={fieldErrors.whatsapp?.[0]}
        />
      </div>

      {errorMessage && (
        <p className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
          <AlertCircle className="size-3.5 shrink-0" />
          {errorMessage}
        </p>
      )}

      <DialogFooter className="items-center justify-between sm:justify-between">
        <Button type="button" variant="ghost" onClick={onBack}>
          <ArrowLeft className="size-4" />
          Back
        </Button>
        <motion.button
          type="submit"
          disabled={submitting}
          whileTap={submitting ? undefined : { scale: 0.97 }}
          className={cn(buttonVariants())}
        >
          {submitting && <Loader2 className="size-4 animate-spin" />}
          Confirm Demo
        </motion.button>
      </DialogFooter>
    </form>
  );
}
