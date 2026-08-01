"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ConfettiBurst } from "@/components/cta/confetti-burst";

function AnimatedCheckmark() {
  return (
    <svg viewBox="0 0 52 52" className="size-16 text-teal-glow">
      <motion.circle
        cx="26"
        cy="26"
        r="24"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      />
      <motion.path
        d="M15 27l7 7 15-15"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.4, delay: 0.4, ease: "easeOut" }}
      />
    </svg>
  );
}

export function BookDemoSuccess({
  weekday,
  date,
  time,
  clinicSizeLabel,
  email,
  onDone,
}: {
  weekday?: string;
  date?: string;
  time: string | null;
  clinicSizeLabel?: string;
  email: string;
  onDone: () => void;
}) {
  return (
    <div className="relative flex flex-col items-center py-4 text-center">
      <ConfettiBurst />
      <AnimatedCheckmark />
      <h2 className="mt-4 font-heading text-xl font-semibold">
        Demo Confirmed!
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        We&apos;ll see you on{" "}
        <strong>
          {weekday}, {date}
        </strong>{" "}
        at <strong>{time}</strong> for your {clinicSizeLabel} demo. A
        calendar invite is on its way to {email}.
      </p>
      <Button className="mt-6" onClick={onDone}>
        Done
      </Button>
    </div>
  );
}
