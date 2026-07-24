import {
  CalendarPlus,
  ClipboardCheck,
  RefreshCw,
  ScanSearch,
  type LucideIcon,
} from "lucide-react";
import { page4HowItWorks } from "@/lib/tour-content";

const iconMap: Record<string, LucideIcon> = {
  CalendarPlus,
  ScanSearch,
  ClipboardCheck,
  RefreshCw,
};

export function Page4HowItWorks() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:py-20">
      <div className="text-center">
        <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          {page4HowItWorks.eyebrow}
        </span>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {page4HowItWorks.title}
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {page4HowItWorks.steps.map((step, i) => {
          const Icon = iconMap[step.icon];
          const isLast = i === page4HowItWorks.steps.length - 1;
          return (
            <div key={step.number} className="relative">
              <div className="flex h-full flex-col rounded-2xl border border-black/5 bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-white/10">
                <div className="flex items-center justify-between">
                  <span className="font-heading text-2xl font-bold text-primary/30">
                    {step.number}
                  </span>
                  <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    <Icon className="size-4" />
                  </div>
                </div>
                <h3 className="mt-4 font-heading text-lg font-semibold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>
              {!isLast && (
                <div
                  aria-hidden="true"
                  className="absolute top-1/2 -right-3 hidden h-px w-6 bg-gradient-to-r from-primary/40 to-transparent lg:block"
                />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
