"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { productHighlights } from "@/lib/content";

const chartBars = [42, 68, 55, 80, 64, 90, 72];

export function ProductShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), {
    stiffness: 150,
    damping: 20,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), {
    stiffness: 150,
    damping: 20,
  });

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handlePointerLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section id="product" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Product Tour"
          title="Your entire practice, on one dashboard"
          description="Live appointment load, revenue, and patient satisfaction — updated in real time, accessible from any device."
        />

        <RevealOnScroll className="mt-14" delay={0.1}>
          <div
            ref={ref}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
            style={{ perspective: 1200 }}
            className="mx-auto max-w-4xl"
          >
            <motion.div
              style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
              className="glass glow-ring rounded-3xl p-6 sm:p-8"
            >
              <div className="flex items-center justify-between border-b border-black/5 pb-4 dark:border-white/10">
                <span className="text-sm font-medium text-muted-foreground">
                  Practice Overview
                </span>
                <span className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary">
                  <span className="size-1.5 animate-pulse rounded-full bg-primary" />
                  Live
                </span>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                {productHighlights.map((stat) => (
                  <div
                    key={stat.label}
                    className="rounded-xl bg-background/60 p-4 dark:bg-white/[0.03]"
                  >
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="mt-1 font-heading text-2xl font-semibold">
                      {stat.value}
                    </p>
                    <p className="mt-1 flex items-center gap-1 text-xs font-medium text-teal-glow">
                      <TrendingUp className="size-3" />
                      {stat.trend}
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-6 flex h-28 items-end gap-2 rounded-xl bg-background/60 p-4 dark:bg-white/[0.03]">
                {chartBars.map((height, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-t-md bg-gradient-to-t from-teal-glow/70 to-coral-glow/70"
                    style={{ height: `${height}%` }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
