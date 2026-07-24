"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function StepNavigator({
  currentStep,
  totalSteps,
  labels,
  onPrev,
  onNext,
  onJump,
}: {
  currentStep: number;
  totalSteps: number;
  labels: readonly string[];
  onPrev: () => void;
  onNext: () => void;
  onJump: (index: number) => void;
}) {
  return (
    <div className="fixed inset-x-0 bottom-4 z-40 flex justify-center px-4 sm:bottom-6">
      <div className="glass glow-ring flex items-center gap-1 rounded-full px-2 py-2 sm:gap-2 sm:px-3">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Previous page"
          disabled={currentStep === 0}
          onClick={onPrev}
        >
          <ChevronLeft className="size-4" />
        </Button>

        <div className="flex flex-col items-center gap-1 px-1">
          <div className="flex items-center gap-1.5" role="tablist" aria-label="Pitch deck pages">
            {labels.map((label, i) => (
              <button
                key={label}
                type="button"
                role="tab"
                aria-selected={i === currentStep}
                aria-label={`Go to page ${i + 1}: ${label}`}
                onClick={() => onJump(i)}
                className={cn(
                  "h-2 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  i === currentStep
                    ? "w-5 bg-primary"
                    : "w-2 bg-muted-foreground/30 hover:bg-muted-foreground/60"
                )}
              />
            ))}
          </div>
          <span
            className="text-xs font-medium whitespace-nowrap text-muted-foreground"
            aria-live="polite"
          >
            Page {currentStep + 1} of {totalSteps} · {labels[currentStep]}
          </span>
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Next page"
          disabled={currentStep === totalSteps - 1}
          onClick={onNext}
        >
          <ChevronRight className="size-4" />
        </Button>
      </div>
    </div>
  );
}
