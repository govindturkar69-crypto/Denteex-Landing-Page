"use client";

import { motion } from "framer-motion";
import { AlertCircle, Loader2 } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DialogFooter } from "@/components/ui/dialog";
import { FormField } from "@/components/cta/form-field";
import { cn } from "@/lib/utils";
import { budgetRanges } from "@/lib/cta-content";
import type { ContactSalesInput } from "@/lib/schemas";

type FieldErrors = Partial<Record<keyof ContactSalesInput, string[]>>;

export function ContactSalesForm({
  name,
  onNameChange,
  email,
  onEmailChange,
  clinicName,
  onClinicNameChange,
  chairs,
  onChairsChange,
  budget,
  onBudgetChange,
  integrationNeeds,
  onIntegrationNeedsChange,
  touched,
  fieldErrors,
  submitting,
  errorMessage,
  onSubmit,
}: {
  name: string;
  onNameChange: (value: string) => void;
  email: string;
  onEmailChange: (value: string) => void;
  clinicName: string;
  onClinicNameChange: (value: string) => void;
  chairs: string;
  onChairsChange: (value: string) => void;
  budget: string | undefined;
  onBudgetChange: (value: string | undefined) => void;
  integrationNeeds: string;
  onIntegrationNeedsChange: (value: string) => void;
  touched: boolean;
  fieldErrors: FieldErrors;
  submitting: boolean;
  errorMessage: string | null;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          id="sales-name"
          label="Full name"
          value={name}
          onChange={onNameChange}
          placeholder="Dr. Jane Doe"
          touched={touched}
          error={fieldErrors.name?.[0]}
        />
        <FormField
          id="sales-email"
          label="Work email"
          type="email"
          value={email}
          onChange={onEmailChange}
          placeholder="jane@clinic.com"
          touched={touched}
          error={fieldErrors.email?.[0]}
        />
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <FormField
          id="sales-clinic"
          label="Clinic / group name"
          value={clinicName}
          onChange={onClinicNameChange}
          placeholder="Choice Dental Group"
          touched={touched}
          error={fieldErrors.clinicName?.[0]}
        />
        <FormField
          id="sales-chairs"
          label="Number of chairs"
          type="number"
          min={1}
          value={chairs}
          onChange={onChairsChange}
          placeholder="12"
          touched={touched}
          error={fieldErrors.chairs?.[0]}
        />
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="sales-budget">Budget range</Label>
        <Select value={budget} onValueChange={(value) => onBudgetChange(value ?? undefined)}>
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

      <FormField
        as="textarea"
        id="sales-integration"
        label="Custom integration needs"
        optional
        rows={3}
        value={integrationNeeds}
        onChange={onIntegrationNeedsChange}
        placeholder="e.g. existing EHR migration, insurance API, custom SSO..."
      />

      {errorMessage && (
        <p className="flex items-center gap-1.5 rounded-lg bg-destructive/10 px-3 py-2 text-xs text-destructive">
          <AlertCircle className="size-3.5 shrink-0" />
          {errorMessage}
        </p>
      )}

      <DialogFooter>
        <motion.button
          type="submit"
          disabled={submitting}
          whileTap={submitting ? undefined : { scale: 0.97 }}
          className={cn(buttonVariants(), "w-full")}
        >
          {submitting && <Loader2 className="size-4 animate-spin" />}
          Submit Inquiry
        </motion.button>
      </DialogFooter>
    </form>
  );
}
