"use client";

import { ArrowRight } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { ctaBanner } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useCtaModals } from "@/components/cta/use-cta-modals";

export function CTABanner() {
  const { openBookDemo, openContactSales } = useCtaModals();

  return (
    <section className="px-4 py-20 sm:px-6 sm:py-28">
      <RevealOnScroll className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl bg-gradient-to-br from-primary/90 via-primary to-teal-glow px-6 py-16 text-center sm:px-12">
        <div
          aria-hidden="true"
          className="animate-pulse-glow pointer-events-none absolute -top-24 right-0 size-72 rounded-full bg-coral-glow/40 blur-3xl"
        />
        <h2 className="relative font-heading text-3xl font-semibold text-primary-foreground text-balance sm:text-4xl">
          {ctaBanner.headline}
        </h2>
        <p className="relative mx-auto mt-4 max-w-xl text-primary-foreground/80 text-pretty">
          {ctaBanner.subheadline}
        </p>
        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => openBookDemo()}
            className={cn(
              buttonVariants({ size: "lg", variant: "secondary" }),
              "h-11 w-full px-6 text-base sm:w-auto"
            )}
          >
            {ctaBanner.primaryCta.label}
            <ArrowRight className="size-4" />
          </button>
          <button
            type="button"
            onClick={() => openContactSales()}
            className={cn(
              buttonVariants({ size: "lg", variant: "outline" }),
              "h-11 w-full border-primary-foreground/30 bg-transparent px-6 text-base text-primary-foreground hover:bg-primary-foreground/10 sm:w-auto"
            )}
          >
            {ctaBanner.secondaryCta.label}
          </button>
        </div>
      </RevealOnScroll>
    </section>
  );
}
