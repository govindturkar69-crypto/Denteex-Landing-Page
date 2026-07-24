"use client";

import { useCallback, useEffect, useRef, useState, type TouchEvent } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { tourPages } from "@/lib/tour-content";
import { StepNavigator } from "@/components/tour/step-navigator";
import { Page1Hero } from "@/components/tour/pages/page-1-hero";
import { Page2MarketGap } from "@/components/tour/pages/page-2-market-gap";
import { Page3CoreTech } from "@/components/tour/pages/page-3-core-tech";
import { Page4HowItWorks } from "@/components/tour/pages/page-4-how-it-works";
import { Page5Pricing } from "@/components/tour/pages/page-5-pricing";

const PAGES = [
  Page1Hero,
  Page2MarketGap,
  Page3CoreTech,
  Page4HowItWorks,
  Page5Pricing,
];

const SWIPE_THRESHOLD = 60;

function getStepFromHash() {
  if (typeof window === "undefined") return 0;
  const match = window.location.hash.match(/page-(\d+)/);
  if (!match) return 0;
  const n = parseInt(match[1], 10) - 1;
  return n >= 0 && n < PAGES.length ? n : 0;
}

export function TourExperience() {
  const [step, setStep] = useState(0);
  const [direction, setDirection] = useState(1);
  const shouldReduceMotion = useReducedMotion();
  const hydrated = useRef(false);
  const touchStartX = useRef(0);

  useEffect(() => {
    // One-time correction from the URL hash after hydration (deep-linking).
    // SSR always renders step 0, so this can't run during render without
    // causing a hydration mismatch — a post-mount effect is the correct tool.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setStep(getStepFromHash());
    hydrated.current = true;
  }, []);

  useEffect(() => {
    if (!hydrated.current) return;
    window.history.replaceState(null, "", `#page-${step + 1}`);
  }, [step]);

  const goTo = useCallback((next: number) => {
    setStep((current) => {
      const clamped = Math.max(0, Math.min(PAGES.length - 1, next));
      setDirection(clamped >= current ? 1 : -1);
      return clamped;
    });
  }, []);

  const goNext = useCallback(() => {
    setStep((current) => {
      const clamped = Math.min(PAGES.length - 1, current + 1);
      setDirection(1);
      return clamped;
    });
  }, []);

  const goPrev = useCallback(() => {
    setStep((current) => {
      const clamped = Math.max(0, current - 1);
      setDirection(-1);
      return clamped;
    });
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement;
      const isFormField =
        ["INPUT", "TEXTAREA", "SELECT"].includes(target.tagName) ||
        target.isContentEditable;
      if (isFormField) return;
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev]);

  const handleTouchStart = (e: TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: TouchEvent) => {
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (delta <= -SWIPE_THRESHOLD) goNext();
    else if (delta >= SWIPE_THRESHOLD) goPrev();
  };

  const variants: Variants = {
    enter: (dir: number) => ({
      x: shouldReduceMotion ? 0 : dir * 48,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
  };

  const ActivePage = PAGES[step];
  const labels = tourPages.map((p) => p.label);

  return (
    <div
      className="relative min-h-[calc(100vh-5rem)] pb-28"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        key={step}
        custom={direction}
        variants={variants}
        initial="enter"
        animate="center"
        transition={{
          duration: shouldReduceMotion ? 0.15 : 0.35,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <ActivePage />
      </motion.div>

      <StepNavigator
        currentStep={step}
        totalSteps={PAGES.length}
        labels={labels}
        onPrev={goPrev}
        onNext={goNext}
        onJump={goTo}
      />
    </div>
  );
}
