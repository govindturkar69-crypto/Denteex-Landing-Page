"use client";

import { useMemo, useState } from "react";
import { DollarSign, Clock } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealOnScroll } from "@/components/shared/reveal-on-scroll";
import { AnimatedNumber } from "@/components/shared/animated-number";
import { Slider } from "@/components/ui/slider";
import { calculateRoi, roiAssumptions } from "@/lib/roi";

const formatCurrency = (n: number) => `$${Math.round(n).toLocaleString()}`;
const formatHours = (n: number) => Math.round(n).toLocaleString();

export function ROICalculator() {
  const [patientsPerDay, setPatientsPerDay] = useState(20);
  const [dentists, setDentists] = useState(3);

  const { monthlyRevenueBoost, hoursSaved } = useMemo(
    () => calculateRoi(patientsPerDay, dentists),
    [patientsPerDay, dentists]
  );

  return (
    <section id="roi-calculator" className="py-20 sm:py-28">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="ROI Calculator"
          title="See what Denteex is worth to your practice"
          description="Drag the sliders to match your practice — the numbers update live."
        />

        <RevealOnScroll delay={0.1} className="mt-12">
          <div className="glass glow-ring grid grid-cols-1 gap-8 rounded-3xl p-6 sm:p-10 lg:grid-cols-2">
            <div className="space-y-8">
              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label htmlFor="patients-slider" className="text-sm font-medium">
                    Patients per day
                  </label>
                  <span className="font-heading text-lg font-semibold tabular-nums text-primary">
                    {patientsPerDay}
                  </span>
                </div>
                <Slider
                  id="patients-slider"
                  value={[patientsPerDay]}
                  onValueChange={(val) =>
                    setPatientsPerDay(Array.isArray(val) ? val[0] : val)
                  }
                  min={5}
                  max={60}
                  step={1}
                  aria-label="Patients per day"
                />
              </div>

              <div>
                <div className="mb-3 flex items-center justify-between">
                  <label htmlFor="dentists-slider" className="text-sm font-medium">
                    Number of dentists
                  </label>
                  <span className="font-heading text-lg font-semibold tabular-nums text-primary">
                    {dentists}
                  </span>
                </div>
                <Slider
                  id="dentists-slider"
                  value={[dentists]}
                  onValueChange={(val) =>
                    setDentists(Array.isArray(val) ? val[0] : val)
                  }
                  min={1}
                  max={15}
                  step={1}
                  aria-label="Number of dentists"
                />
              </div>

              <p className="text-xs text-muted-foreground">
                Estimate assumes a ${roiAssumptions.avgRevenuePerVisit}{" "}
                average revenue per visit, a{" "}
                {Math.round(roiAssumptions.baselineNoShowRate * 100)}% baseline
                no-show rate reduced by{" "}
                {Math.round(roiAssumptions.noShowReduction * 100)}% with
                Denteex, and {roiAssumptions.workingDaysPerMonth} working days
                per month. Illustrative, not a guarantee.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <div className="rounded-2xl border border-black/5 bg-card p-6 dark:border-white/10">
                <div className="flex size-10 items-center justify-center rounded-xl bg-teal-glow/15 text-teal-glow">
                  <DollarSign className="size-5" />
                </div>
                <p className="mt-4 font-heading text-3xl font-semibold tabular-nums sm:text-4xl">
                  <AnimatedNumber value={monthlyRevenueBoost} format={formatCurrency} />
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Estimated monthly revenue recovered from fewer no-shows
                </p>
              </div>

              <div className="rounded-2xl border border-black/5 bg-card p-6 dark:border-white/10">
                <div className="flex size-10 items-center justify-center rounded-xl bg-coral-glow/15 text-coral-glow">
                  <Clock className="size-5" />
                </div>
                <p className="mt-4 font-heading text-3xl font-semibold tabular-nums sm:text-4xl">
                  <AnimatedNumber value={hoursSaved} format={formatHours} /> hrs
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Admin hours saved per month across your team
                </p>
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
