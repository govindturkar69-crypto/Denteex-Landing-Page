"use client";

import {
  BarChart3,
  BellRing,
  CalendarCheck,
  ShieldCheck,
  Smartphone,
  Users,
  type LucideIcon,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/shared/reveal-on-scroll";
import { features } from "@/lib/content";

const iconMap: Record<string, LucideIcon> = {
  Users,
  CalendarCheck,
  BellRing,
  BarChart3,
  ShieldCheck,
  Smartphone,
};

export function Features() {
  return (
    <section id="features" className="py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="Why Denteex"
          title="Everything your front desk needs, in one place"
          description="Six tools that replace a stack of spreadsheets, sticky notes, and phone tag — built specifically for how dental practices actually run."
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = iconMap[feature.icon];
            return (
              <StaggerItem key={feature.title}>
                <div className="group flex h-full flex-col rounded-2xl border border-black/5 bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-white/10">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-4 font-heading text-lg font-semibold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>
      </div>
    </section>
  );
}
