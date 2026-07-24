"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/reveal-on-scroll";
import { pricingTiers, type BillingCycle } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useCtaModals } from "@/components/cta/use-cta-modals";

export function Pricing() {
  const [cycle, setCycle] = useState<BillingCycle>("monthly");
  const isAnnual = cycle === "annual";
  const { openBookDemo, openFreeTrial, openContactSales } = useCtaModals();

  const handleTierCta = (tierName: string, cta: string) => {
    if (cta === "Start Free Trial") openFreeTrial(tierName);
    else if (cta === "Contact Sales") openContactSales(tierName);
    else openBookDemo(tierName);
  };

  return (
    <section id="pricing" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Pricing"
          title="Simple pricing that scales with your practice"
          description="Every plan includes core patient management and scheduling. Upgrade as your clinic grows."
        />

        <div className="mt-8 flex items-center justify-center gap-3">
          <span
            className={cn(
              "text-sm font-medium",
              !isAnnual ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Monthly
          </span>
          <Switch
            checked={isAnnual}
            onCheckedChange={(checked) =>
              setCycle(checked ? "annual" : "monthly")
            }
            aria-label="Toggle annual billing"
          />
          <span
            className={cn(
              "flex items-center gap-2 text-sm font-medium",
              isAnnual ? "text-foreground" : "text-muted-foreground"
            )}
          >
            Annual
            <Badge variant="secondary" className="text-teal-glow">
              Save 20%
            </Badge>
          </span>
        </div>

        <StaggerGroup className="mt-12 grid grid-cols-1 items-start gap-6 lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <StaggerItem key={tier.name} className="h-full">
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-200 sm:p-8",
                  tier.featured
                    ? "border-primary/30 bg-primary/[0.04] shadow-xl shadow-primary/10 lg:-translate-y-3"
                    : "border-black/5 bg-card hover:-translate-y-1 hover:shadow-lg dark:border-white/10"
                )}
              >
                {tier.featured && (
                  <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                    Most Popular
                  </Badge>
                )}

                <h3 className="font-heading text-lg font-semibold">
                  {tier.name}
                </h3>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {tier.description}
                </p>

                <div className="mt-5 flex items-baseline gap-1">
                  <span className="font-heading text-4xl font-semibold tabular-nums">
                    ${isAnnual ? tier.annual : tier.monthly}
                  </span>
                  <span className="text-sm text-muted-foreground">/mo</span>
                </div>

                <button
                  type="button"
                  onClick={() => handleTierCta(tier.name, tier.cta)}
                  className={cn(
                    buttonVariants({
                      size: "lg",
                      variant: tier.featured ? "default" : "outline",
                    }),
                    "mt-6 h-11 w-full text-base"
                  )}
                >
                  {tier.cta}
                </button>

                <ul className="mt-8 flex flex-1 flex-col gap-3">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-foreground/80">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
