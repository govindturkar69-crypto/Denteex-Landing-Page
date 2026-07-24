"use client";

import { useContext } from "react";
import { CtaModalsContext } from "@/components/cta/cta-provider";

export function useCtaModals() {
  const ctx = useContext(CtaModalsContext);
  if (!ctx) {
    throw new Error("useCtaModals must be used within a CtaProvider");
  }
  return ctx;
}
