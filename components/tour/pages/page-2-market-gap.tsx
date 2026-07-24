import { AlertTriangle, Sparkles, Zap, type LucideIcon } from "lucide-react";
import { page2MarketGap } from "@/lib/tour-content";

const iconMap: Record<string, LucideIcon> = {
  AlertTriangle,
  Zap,
  Sparkles,
};

export function Page2MarketGap() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:py-20">
      <div className="text-center">
        <span className="text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          {page2MarketGap.eyebrow}
        </span>
        <h2 className="mt-3 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {page2MarketGap.title}
        </h2>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
        {page2MarketGap.cards.map((card) => {
          const Icon = iconMap[card.icon];
          return (
            <div
              key={card.title}
              className="flex h-full flex-col rounded-2xl border border-black/5 bg-card p-6 shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-xl dark:border-white/10"
            >
              <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <Icon className="size-5" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold">
                {card.title}
              </h3>
              <p className="mt-2 text-sm text-muted-foreground">
                {card.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
