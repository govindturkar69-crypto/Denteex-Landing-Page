"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ContactSalesSuccess({
  name,
  email,
  clinicName,
  onDone,
}: {
  name: string;
  email: string;
  clinicName: string;
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
        <CheckCircle2 className="size-7" />
      </motion.div>
      <h2 className="mt-4 font-heading text-xl font-semibold">
        Thanks, {name}!
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Our enterprise team will reach out to {email} within 1 business day
        to discuss {clinicName}&apos;s rollout.
      </p>
      <Button className="mt-6" onClick={onDone}>
        Done
      </Button>
    </div>
  );
}
