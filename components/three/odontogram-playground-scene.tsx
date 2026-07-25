"use client";

import dynamic from "next/dynamic";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { CanvasErrorBoundary } from "@/components/three/canvas-error-boundary";
import {
  odontogramPlaygroundConditions,
  type PlaygroundConditionKey,
} from "@/lib/odontogram-conditions";

const OdontogramPlaygroundCanvas = dynamic(
  () => import("@/components/three/odontogram-playground-canvas"),
  { ssr: false, loading: () => <LoadingFallback /> }
);

function LoadingFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="animate-pulse-glow size-40 rounded-full bg-gradient-to-br from-teal-glow/30 to-coral-glow/30 blur-2xl" />
    </div>
  );
}

function DomFallbackGrid({
  conditions,
  onToothClick,
}: {
  conditions: PlaygroundConditionKey[];
  onToothClick: (index: number) => void;
}) {
  return (
    <div className="flex h-full w-full flex-wrap items-center justify-center gap-3 px-4">
      {conditions.map((condition, i) => {
        const meta = odontogramPlaygroundConditions.find(
          (c) => c.key === condition
        )!;
        return (
          <button
            key={i}
            type="button"
            onClick={() => onToothClick(i)}
            aria-label={`Tooth ${i + 1}: ${meta.label}. Click to change condition.`}
            className="flex size-12 items-center justify-center rounded-full border-2 text-xs font-semibold transition-transform hover:-translate-y-1 sm:size-14"
            style={{
              borderColor: `var(${meta.colorVar})`,
              backgroundColor:
                condition === "healthy"
                  ? "transparent"
                  : `color-mix(in oklch, var(${meta.colorVar}) 25%, transparent)`,
              color: `var(${meta.colorVar})`,
              opacity: condition === "extraction" ? 0.5 : 1,
            }}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );
}

export function OdontogramPlaygroundScene({
  conditions,
  onToothClick,
}: {
  conditions: PlaygroundConditionKey[];
  onToothClick: (index: number) => void;
}) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <DomFallbackGrid conditions={conditions} onToothClick={onToothClick} />
    );
  }

  return (
    <CanvasErrorBoundary
      fallback={
        <DomFallbackGrid conditions={conditions} onToothClick={onToothClick} />
      }
    >
      <OdontogramPlaygroundCanvas
        conditions={conditions}
        onToothClick={onToothClick}
      />
    </CanvasErrorBoundary>
  );
}
