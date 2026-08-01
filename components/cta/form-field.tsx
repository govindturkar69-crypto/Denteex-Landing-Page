"use client";

import type { ReactNode } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

type BaseProps = {
  id: string;
  label: ReactNode;
  error?: string;
  touched?: boolean;
  optional?: boolean;
  className?: string;
};

type InputFieldProps = BaseProps & {
  as?: "input";
  type?: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  min?: number;
  /** Extra control rendered inside the input, e.g. a password show/hide toggle. */
  rightSlot?: ReactNode;
};

type TextareaFieldProps = BaseProps & {
  as: "textarea";
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  rows?: number;
};

type FormFieldProps = InputFieldProps | TextareaFieldProps;

/**
 * Label + Input/Textarea + conditional error message, shared across the
 * Book a Demo, Contact Sales, and Free Trial dialogs — collapses what used
 * to be ~15 near-identical field blocks across those three files into one
 * component.
 */
export function FormField(props: FormFieldProps) {
  const { id, label, error, touched, optional, className } = props;
  const showError = Boolean(touched && error);

  return (
    <div className={cn("space-y-1.5", className)}>
      <Label htmlFor={id}>
        {label}
        {optional && (
          <span className="text-muted-foreground"> (optional)</span>
        )}
      </Label>

      {props.as === "textarea" ? (
        <Textarea
          id={id}
          value={props.value}
          onChange={(e) => props.onChange(e.target.value)}
          placeholder={props.placeholder}
          rows={props.rows}
          aria-invalid={showError}
        />
      ) : (
        <div className={props.rightSlot ? "relative" : undefined}>
          <Input
            id={id}
            type={props.type ?? "text"}
            value={props.value}
            onChange={(e) => props.onChange(e.target.value)}
            placeholder={props.placeholder}
            min={props.min}
            aria-invalid={showError}
            className={props.rightSlot ? "pr-9" : undefined}
          />
          {props.rightSlot}
        </div>
      )}

      {showError && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
