"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  odontogramConditions,
  type OdontogramConditionKey,
} from "@/lib/tour-content";

const TOOTH_COUNT = 32;
const UPPER_ARCH = Array.from({ length: 16 }, (_, i) => i + 1);
const LOWER_ARCH = Array.from({ length: 16 }, (_, i) => i + 17);

const NEXT_CONDITION: Record<OdontogramConditionKey, OdontogramConditionKey> = {
  healthy: "cavity",
  cavity: "filled",
  filled: "crown",
  crown: "healthy",
};

function createInitialState(): OdontogramConditionKey[] {
  return Array.from({ length: TOOTH_COUNT }, () => "healthy");
}

function Tooth({
  number,
  condition,
  onClick,
}: {
  number: number;
  condition: OdontogramConditionKey;
  onClick: () => void;
}) {
  const meta = odontogramConditions.find((c) => c.key === condition)!;

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={`Tooth ${number}: ${meta.label}. Click to change condition.`}
      className={cn(
        "group flex flex-col items-center gap-1 rounded-lg p-1 transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
      )}
    >
      <span
        className="flex size-7 items-center justify-center rounded-full border-2 text-[10px] font-semibold transition-colors sm:size-8 sm:text-xs"
        style={{
          borderColor: `var(${meta.colorVar})`,
          backgroundColor:
            condition === "healthy"
              ? "transparent"
              : `color-mix(in oklch, var(${meta.colorVar}) 25%, transparent)`,
          color: `var(${meta.colorVar})`,
        }}
      >
        {number}
      </span>
    </button>
  );
}

export function Odontogram() {
  const [teeth, setTeeth] = useState<OdontogramConditionKey[]>(
    createInitialState
  );

  const counts = useMemo(() => {
    const base: Record<OdontogramConditionKey, number> = {
      healthy: 0,
      cavity: 0,
      filled: 0,
      crown: 0,
    };
    teeth.forEach((c) => {
      base[c] += 1;
    });
    return base;
  }, [teeth]);

  const cycleTooth = (index: number) => {
    setTeeth((prev) => {
      const next = [...prev];
      next[index] = NEXT_CONDITION[next[index]];
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <p className="text-sm text-muted-foreground">
        Click any tooth to cycle its condition — this mirrors how a dentist
        charts findings live during a Denteex diagnosis session.
      </p>

      <div className="rounded-2xl border border-black/5 bg-card p-4 dark:border-white/10 sm:p-6">
        <p className="mb-2 text-center text-xs font-medium text-muted-foreground">
          Upper Arch
        </p>
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {UPPER_ARCH.map((n) => (
            <Tooth
              key={n}
              number={n}
              condition={teeth[n - 1]}
              onClick={() => cycleTooth(n - 1)}
            />
          ))}
        </div>

        <div className="my-4 border-t border-dashed border-black/10 dark:border-white/10" />

        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
          {LOWER_ARCH.map((n) => (
            <Tooth
              key={n}
              number={n}
              condition={teeth[n - 1]}
              onClick={() => cycleTooth(n - 1)}
            />
          ))}
        </div>
        <p className="mt-2 text-center text-xs font-medium text-muted-foreground">
          Lower Arch
        </p>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="flex flex-wrap gap-3">
          {odontogramConditions.map((c) => (
            <div key={c.key} className="flex items-center gap-1.5 text-xs">
              <span
                className="size-3 rounded-full border-2"
                style={{ borderColor: `var(${c.colorVar})` }}
              />
              <span className="text-muted-foreground">
                {c.label} ({counts[c.key]})
              </span>
            </div>
          ))}
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setTeeth(createInitialState())}
        >
          <RotateCcw className="size-3.5" />
          Reset Chart
        </Button>
      </div>
    </div>
  );
}
