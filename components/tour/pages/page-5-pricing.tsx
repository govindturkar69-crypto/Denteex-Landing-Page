"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { page5Pricing } from "@/lib/tour-content";
import { DemoRequestDialog } from "@/components/tour/demo-request-dialog";

export function Page5Pricing() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string>(
    page5Pricing.tiers[0].name
  );

  const openDemoRequest = (planName: string) => {
    setSelectedPlan(planName);
    setDialogOpen(true);
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-16 sm:py-20">
      <div className="text-center">
        <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          {page5Pricing.eyebrow}
        </span>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {page5Pricing.title}
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {page5Pricing.tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "relative flex h-full flex-col rounded-2xl border p-6 transition-all duration-200 sm:p-8",
              tier.featured
                ? "border-primary/30 bg-primary/[0.04] shadow-xl shadow-primary/10"
                : "border-black/5 bg-card hover:-translate-y-1 hover:shadow-lg dark:border-white/10"
            )}
          >
            {tier.featured && (
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">
                Recommended
              </Badge>
            )}

            <h3 className="font-heading text-lg font-semibold">{tier.name}</h3>

            <div className="mt-4 flex items-baseline gap-1">
              <span className="font-heading text-4xl font-semibold tabular-nums">
                {tier.price}
              </span>
              <span className="text-sm text-muted-foreground">
                {tier.cadence}
              </span>
            </div>

            <ul className="mt-6 flex flex-1 flex-col gap-3">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2.5 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                  <span className="text-foreground/80">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              size="lg"
              variant={tier.featured ? "default" : "outline"}
              className="mt-6 h-11 w-full text-base"
              onClick={() => openDemoRequest(tier.name)}
            >
              Get Started
            </Button>
          </div>
        ))}
      </div>

      <p className="mt-10 text-center font-medium text-muted-foreground">
        {page5Pricing.footerLine}
      </p>

      <DemoRequestDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        plan={selectedPlan}
      />
    </div>
  );
}
