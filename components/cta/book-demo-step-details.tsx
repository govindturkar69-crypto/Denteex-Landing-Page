"use client";

import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { clinicSizes, timeSlots } from "@/lib/cta-content";

type Day = { iso: string; weekday: string; date: string };

export function BookDemoStepDetails({
  upcomingDays,
  clinicSize,
  onClinicSizeChange,
  selectedDay,
  onSelectedDayChange,
  selectedTime,
  onSelectedTimeChange,
  canContinue,
  onNext,
}: {
  upcomingDays: Day[];
  clinicSize: string | null;
  onClinicSizeChange: (id: string) => void;
  selectedDay: string | null;
  onSelectedDayChange: (iso: string) => void;
  selectedTime: string | null;
  onSelectedTimeChange: (time: string) => void;
  canContinue: boolean;
  onNext: () => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-sm font-medium">Clinic size</p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          {clinicSizes.map((size) => (
            <button
              key={size.id}
              type="button"
              onClick={() => onClinicSizeChange(size.id)}
              className={cn(
                "rounded-xl border p-3 text-left transition-all hover:-translate-y-0.5",
                clinicSize === size.id
                  ? "border-primary/40 bg-primary/[0.06] ring-1 ring-primary/30"
                  : "border-black/5 dark:border-white/10"
              )}
            >
              <p className="text-sm font-semibold">{size.label}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {size.description}
              </p>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Pick a date</p>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {upcomingDays.map((day) => (
            <button
              key={day.iso}
              type="button"
              onClick={() => onSelectedDayChange(day.iso)}
              className={cn(
                "flex shrink-0 flex-col items-center rounded-lg border px-3 py-2 text-xs transition-colors",
                selectedDay === day.iso
                  ? "border-primary/40 bg-primary/[0.06] text-primary"
                  : "border-black/5 text-muted-foreground hover:text-foreground dark:border-white/10"
              )}
            >
              <span className="font-medium">{day.weekday}</span>
              <span>{day.date}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <p className="mb-2 text-sm font-medium">Pick a time</p>
        <div className="grid grid-cols-3 gap-2">
          {timeSlots.map((time) => (
            <button
              key={time}
              type="button"
              onClick={() => onSelectedTimeChange(time)}
              className={cn(
                "rounded-lg border px-2 py-1.5 text-xs font-medium transition-colors",
                selectedTime === time
                  ? "border-primary/40 bg-primary/[0.06] text-primary"
                  : "border-black/5 text-muted-foreground hover:text-foreground dark:border-white/10"
              )}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      <DialogFooter>
        <motion.button
          type="button"
          disabled={!canContinue}
          onClick={onNext}
          whileTap={canContinue ? { scale: 0.97 } : undefined}
          className={cn(buttonVariants(), "w-full sm:w-auto")}
        >
          Next
        </motion.button>
      </DialogFooter>
    </div>
  );
}
