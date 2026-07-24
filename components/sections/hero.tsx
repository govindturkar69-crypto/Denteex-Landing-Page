"use client";

import Link from "next/link";
import { motion, type Variants } from "framer-motion";
import { ArrowRight, PlayCircle, Star } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { HeroScene } from "@/components/three/hero-scene";
import { brand, hero } from "@/lib/content";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.1 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-20 sm:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-[-10%] left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-teal-glow/20 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-15%] h-[28rem] w-[28rem] rounded-full bg-coral-glow/15 blur-[120px]" />
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={container}
          className="text-center lg:text-left"
        >
          <motion.span
            variants={item}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-xs font-medium text-primary"
          >
            {hero.eyebrow}
          </motion.span>

          <motion.h1
            variants={item}
            className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {hero.headline}
          </motion.h1>

          <motion.p
            variants={item}
            className="mx-auto mt-5 max-w-xl text-lg text-muted-foreground text-pretty lg:mx-0"
          >
            {hero.subheadline}
          </motion.p>

          <motion.div
            variants={item}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Link
              href={hero.primaryCta.href}
              className={cn(
                buttonVariants({ size: "lg" }),
                "h-11 w-full px-6 text-base sm:w-auto"
              )}
            >
              {hero.primaryCta.label}
              <ArrowRight className="size-4" />
            </Link>
            <Link
              href={hero.secondaryCta.href}
              className={cn(
                buttonVariants({ size: "lg", variant: "outline" }),
                "h-11 w-full px-6 text-base sm:w-auto"
              )}
            >
              <PlayCircle className="size-4" />
              {hero.secondaryCta.label}
            </Link>
          </motion.div>

          <motion.div
            variants={item}
            className="mt-8 flex items-center justify-center gap-2 text-sm text-muted-foreground lg:justify-start"
          >
            <span className="flex items-center gap-0.5 text-coral-glow">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="size-4 fill-current" />
              ))}
            </span>
            <span>
              {brand.rating} rating from {brand.reviewCount}+ dental clinics
            </span>
          </motion.div>
        </motion.div>

        <div className="relative mx-auto h-[22rem] w-full max-w-md sm:h-[28rem] lg:h-[32rem]">
          <HeroScene />
        </div>
      </div>
    </section>
  );
}
