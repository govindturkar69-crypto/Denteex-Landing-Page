"use client";

import { useMemo, useState } from "react";
import { RotateCcw } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { OdontogramPlaygroundScene } from "@/components/three/odontogram-playground-scene";
import {
  nextPlaygroundCondition,
  odontogramPlaygroundConditions,
  PLAYGROUND_TOOTH_COUNT,
  type PlaygroundConditionKey,
} from "@/lib/odontogram-conditions";

function createInitialConditions(): PlaygroundConditionKey[] {
  return Array.from({ length: PLAYGROUND_TOOTH_COUNT }, () => "healthy");
}

export function OdontogramPlayground() {
  const [conditions, setConditions] = useState<PlaygroundConditionKey[]>(
    createInitialConditions
  );

  const handleToothClick = (index: number) => {
    setConditions((prev) => {
      const next = [...prev];
      next[index] = nextPlaygroundCondition(next[index]);
      return next;
    });
  };

  const counts = useMemo(() => {
    const base: Record<PlaygroundConditionKey, number> = {
      healthy: 0,
      cavity: 0,
      crown: 0,
      extraction: 0,
    };
    conditions.forEach((c) => {
      base[c] += 1;
    });
    return base;
  }, [conditions]);

  return (
    <section id="playground" className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Try It Yourself"
          title="Click a tooth. Chart a condition. In 3D."
          description="This mirrors the interactive odontogram dentists use inside Denteex — click any tooth below to cycle through Healthy, Cavity, Crown, and Extracted."
        />

        <RevealOnScroll delay={0.1} className="mt-12">
          <div className="glass glow-ring overflow-hidden rounded-3xl">
            <div className="h-72 w-full sm:h-96">
              <OdontogramPlaygroundScene
                conditions={conditions}
                onToothClick={handleToothClick}
              />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 border-t border-black/5 p-4 dark:border-white/10 sm:p-6">
              <div className="flex flex-wrap gap-3">
                {odontogramPlaygroundConditions.map((c) => (
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
              <button
                type="button"
                onClick={() => setConditions(createInitialConditions())}
                className="flex items-center gap-1.5 text-xs font-medium text-primary hover:underline"
              >
                <RotateCcw className="size-3.5" />
                Reset chart
              </button>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
