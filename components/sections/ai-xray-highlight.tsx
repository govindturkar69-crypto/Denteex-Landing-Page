"use client";

import { motion } from "framer-motion";
import { Activity, Gauge, Lightbulb, ScanSearch, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { useCtaModals } from "@/components/cta/use-cta-modals";

const features = [
  {
    icon: ScanSearch,
    title: "Instant Cavity Detection",
    description: "Flags likely cavities on a scan in seconds, not minutes.",
  },
  {
    icon: Activity,
    title: "Bone Density Analysis",
    description: "Highlights areas of concern for a closer look.",
  },
  {
    icon: Lightbulb,
    title: "Treatment Suggestions",
    description: "Surfaces relevant treatment options based on findings.",
  },
  {
    icon: Gauge,
    title: "Confidence Scoring",
    description: "Every flag ships with a confidence score, not a verdict.",
  },
];

const badges = ["Cavity flagged", "Bone density: normal"];

function XrayMockup() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="relative aspect-square w-full max-w-sm overflow-hidden rounded-3xl border border-white/10 bg-[#050b12] p-6 sm:p-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 1px 1px, #5fd7c8 1px, transparent 0)",
          backgroundSize: "18px 18px",
        }}
      />

      <svg
        viewBox="0 0 320 220"
        className="relative h-full w-full"
        aria-hidden="true"
      >
        {Array.from({ length: 6 }).map((_, i) => (
          <rect
            key={i}
            x={20 + i * 48}
            y={40 + (i % 2 === 0 ? 0 : 20)}
            width={34}
            height={i % 2 === 0 ? 140 : 100}
            rx={14}
            fill="none"
            stroke="#7fd8e8"
            strokeOpacity={0.55}
            strokeWidth={1.5}
          />
        ))}
        <rect
          x={68}
          y={70}
          width={30}
          height={30}
          rx={8}
          fill="#c2542f"
          fillOpacity={0.35}
          stroke="#c2542f"
          strokeWidth={1.5}
        />
      </svg>

      {!prefersReducedMotion && (
        <motion.div
          aria-hidden="true"
          className="absolute inset-x-6 h-8 bg-gradient-to-b from-teal-glow/0 via-teal-glow/40 to-teal-glow/0 sm:inset-x-8"
          initial={{ top: "5%" }}
          animate={{ top: ["5%", "90%", "5%"] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      )}

      {badges.map((label, i) => (
        <motion.div
          key={label}
          className="absolute rounded-full border border-teal-glow/30 bg-background/80 px-2.5 py-1 text-[10px] font-medium text-teal-glow backdrop-blur-sm sm:text-xs"
          style={i === 0 ? { top: "34%", left: "8%" } : { bottom: "18%", right: "10%" }}
          animate={
            prefersReducedMotion
              ? undefined
              : { opacity: [0.5, 1, 0.5] }
          }
          transition={{
            duration: 2.4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: i * 0.6,
          }}
        >
          {label}
        </motion.div>
      ))}
    </div>
  );
}

export function AIXrayHighlight() {
  const { openBookDemo } = useCtaModals();

  return (
    <section className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[#050b12]"
      >
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-teal-glow/15 blur-[120px]" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-coral-glow/10 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2">
        <RevealOnScroll>
          <Badge className="border-teal-glow/30 bg-teal-glow/10 text-teal-glow">
            <Sparkles className="size-3" />
            AI-Assisted
          </Badge>
          <h2 className="mt-4 font-heading text-3xl font-semibold text-balance text-white sm:text-4xl">
            Meet your AI Dental Assistant
          </h2>
          <p className="mt-4 max-w-lg text-white/70 text-pretty">
            Denteex analyzes digital X-rays as they&apos;re uploaded, flagging
            likely cavities and bone-density concerns so your team can review
            findings faster — never a replacement for clinical judgment.
          </p>

          <div className="mt-6 flex flex-wrap gap-2">
            <Badge variant="secondary">&lt;2s per scan</Badge>
            <Badge variant="secondary">10,000+ scans analyzed</Badge>
          </div>

          <dl className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
            {features.map((feature) => (
              <div key={feature.title} className="flex gap-3">
                <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/5 text-teal-glow">
                  <feature.icon className="size-4" />
                </div>
                <div>
                  <dt className="text-sm font-semibold text-white">
                    {feature.title}
                  </dt>
                  <dd className="mt-0.5 text-xs text-white/60">
                    {feature.description}
                  </dd>
                </div>
              </div>
            ))}
          </dl>

          <p className="mt-6 text-xs text-white/50">
            AI-assisted insights — always confirmed by your dentist.
          </p>

          <Button
            size="lg"
            className="mt-6 h-11 px-6 text-base"
            onClick={() => openBookDemo()}
          >
            See It In Action
          </Button>
        </RevealOnScroll>

        <RevealOnScroll delay={0.15} className="flex justify-center">
          <XrayMockup />
        </RevealOnScroll>
      </div>
    </section>
  );
}
