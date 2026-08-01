"use client";

import { Check, Loader2 } from "lucide-react";
import { onboardingSteps } from "@/lib/cta-content";

export function FreeTrialOnboarding({ loadingStep }: { loadingStep: number }) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <Loader2 className="size-8 animate-spin text-primary" />
      <h2 className="mt-4 font-heading text-lg font-semibold">
        Setting up your dashboard&hellip;
      </h2>
      <ul className="mt-5 w-full max-w-xs space-y-2.5 text-left">
        {onboardingSteps.map((step, i) => {
          const done = i < loadingStep;
          const active = i === loadingStep;
          return (
            <li key={step} className="flex items-center gap-2.5 text-sm">
              <span
                className={`flex size-5 shrink-0 items-center justify-center rounded-full border ${
                  done
                    ? "border-teal-glow bg-teal-glow/20 text-teal-glow"
                    : active
                      ? "border-primary text-primary"
                      : "border-black/10 text-muted-foreground dark:border-white/15"
                }`}
              >
                {done ? (
                  <Check className="size-3" />
                ) : active ? (
                  <Loader2 className="size-3 animate-spin" />
                ) : null}
              </span>
              <span
                className={done || active ? "text-foreground" : "text-muted-foreground"}
              >
                {step}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
