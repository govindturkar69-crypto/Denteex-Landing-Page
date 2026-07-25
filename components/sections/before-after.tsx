"use client";

import { useCallback, useRef, useState, type PointerEvent } from "react";
import { Check, ChevronsLeftRight, X } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";

const beforePoints = [
  "4 disconnected software tools",
  "Paper charts, easy to lose or misfile",
  "High no-show rates, no reminders",
  "Manual billing, delayed invoices",
];

const afterPoints = [
  "One unified cloud platform",
  "Interactive 3D tooth chart mapping",
  "Automated WhatsApp & SMS reminders",
  "Instant invoicing in under 30 seconds",
];

export function BeforeAfter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const draggingRef = useRef(false);
  const [position, setPosition] = useState(50);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPosition(Math.min(100, Math.max(0, pct)));
  }, []);

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    draggingRef.current = true;
    updateFromClientX(e.clientX);
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!draggingRef.current) return;
    updateFromClientX(e.clientX);
  };

  const stopDragging = () => {
    draggingRef.current = false;
  };

  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="See the Difference"
          title="Paper practice vs. Denteex 3D Practice OS"
          description="Drag the handle to compare the old way of running a dental practice with the Denteex way."
        />

        <RevealOnScroll delay={0.1} className="mt-12">
          <div
            ref={containerRef}
            className="relative aspect-[3/4] w-full touch-none rounded-3xl border border-black/5 select-none dark:border-white/10 sm:aspect-[16/9]"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={stopDragging}
            onPointerCancel={stopDragging}
          >
            <div className="absolute inset-0 flex flex-col justify-center overflow-hidden rounded-3xl bg-gradient-to-br from-primary/15 via-background to-teal-glow/10 p-6 sm:p-10">
              <span className="text-xs font-semibold tracking-widest text-teal-glow uppercase">
                Denteex 3D Practice OS
              </span>
              <ul className="mt-4 space-y-3">
                {afterPoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm sm:text-base"
                  >
                    <Check className="mt-0.5 size-4 shrink-0 text-teal-glow" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              className="absolute inset-0 flex flex-col justify-center overflow-hidden rounded-3xl bg-secondary/70 p-6 dark:bg-black/50 sm:p-10"
              style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
            >
              <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                Traditional Paper Practice
              </span>
              <ul className="mt-4 space-y-3">
                {beforePoints.map((point) => (
                  <li
                    key={point}
                    className="flex items-start gap-2.5 text-sm text-muted-foreground sm:text-base"
                  >
                    <X className="mt-0.5 size-4 shrink-0 text-destructive/70" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div
              aria-hidden="true"
              className="absolute top-0 bottom-0 z-10 w-0.5 bg-background/80"
              style={{ left: `${position}%` }}
            >
              <div className="absolute top-1/2 left-1/2 flex size-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-black/10 bg-background shadow-lg dark:border-white/20">
                <ChevronsLeftRight className="size-4 text-foreground" />
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
