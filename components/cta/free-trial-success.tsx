"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { dashboardPreviewStats } from "@/lib/cta-content";

export function FreeTrialSuccess({
  practiceName,
  onDone,
}: {
  practiceName: string;
  onDone: () => void;
}) {
  return (
    <div className="flex flex-col items-center py-4 text-center">
      <motion.div
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="flex size-14 items-center justify-center rounded-full bg-teal-glow/15 text-teal-glow"
      >
        <Check className="size-7" />
      </motion.div>
      <h2 className="mt-4 font-heading text-xl font-semibold">
        Your trial is live!
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        {practiceName || "Your practice"} is ready to go. Here&apos;s a peek
        at your new dashboard.
      </p>

      <div className="mt-5 grid w-full grid-cols-3 gap-2 rounded-xl border border-black/5 bg-card p-3 dark:border-white/10">
        {dashboardPreviewStats.map((stat) => (
          <div key={stat.label} className="text-center">
            <p className="font-heading text-lg font-semibold">{stat.value}</p>
            <p className="mt-0.5 text-[10px] text-muted-foreground">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <Button className="mt-6 w-full" onClick={onDone}>
        Done
      </Button>
    </div>
  );
}
