"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { FormField } from "@/components/cta/form-field";
import { cn } from "@/lib/utils";
import type { FreeTrialInput } from "@/lib/schemas";

type FieldErrors = Partial<Record<keyof FreeTrialInput, string[]>>;

export function FreeTrialForm({
  doctorName,
  onDoctorNameChange,
  email,
  onEmailChange,
  password,
  onPasswordChange,
  practiceName,
  onPracticeNameChange,
  touched,
  fieldErrors,
  onSubmit,
}: {
  doctorName: string;
  onDoctorNameChange: (value: string) => void;
  email: string;
  onEmailChange: (value: string) => void;
  password: string;
  onPasswordChange: (value: string) => void;
  practiceName: string;
  onPracticeNameChange: (value: string) => void;
  touched: boolean;
  fieldErrors: FieldErrors;
  onSubmit: (e: React.FormEvent) => void;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <FormField
        id="trial-doctor-name"
        label="Doctor name"
        value={doctorName}
        onChange={onDoctorNameChange}
        placeholder="Dr. Jane Doe"
        touched={touched}
        error={fieldErrors.doctorName?.[0]}
      />
      <FormField
        id="trial-email"
        label="Email"
        type="email"
        value={email}
        onChange={onEmailChange}
        placeholder="jane@clinic.com"
        touched={touched}
        error={fieldErrors.email?.[0]}
      />
      <FormField
        id="trial-password"
        label="Password"
        type={showPassword ? "text" : "password"}
        value={password}
        onChange={onPasswordChange}
        placeholder="At least 8 characters"
        touched={touched}
        error={fieldErrors.password?.[0]}
        rightSlot={
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
        }
      />
      <FormField
        id="trial-practice-name"
        label="Practice name"
        value={practiceName}
        onChange={onPracticeNameChange}
        placeholder="Choice Dental Care"
        touched={touched}
        error={fieldErrors.practiceName?.[0]}
      />
      <DialogFooter>
        <motion.button
          type="submit"
          whileTap={{ scale: 0.97 }}
          className={cn(buttonVariants(), "w-full")}
        >
          Start Free Trial
        </motion.button>
      </DialogFooter>
    </form>
  );
}
