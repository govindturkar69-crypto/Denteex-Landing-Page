"use client";

import {
  createContext,
  useCallback,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { BookDemoDialog } from "@/components/cta/book-demo-dialog";
import { FreeTrialDialog } from "@/components/cta/free-trial-dialog";
import { ContactSalesDialog } from "@/components/cta/contact-sales-dialog";

type ModalKind = "demo" | "trial" | "sales" | null;

export type CtaModalsContextValue = {
  openBookDemo: (plan?: string) => void;
  openFreeTrial: (plan?: string) => void;
  openContactSales: (plan?: string) => void;
  close: () => void;
};

export const CtaModalsContext = createContext<CtaModalsContextValue | null>(
  null
);

export function CtaProvider({ children }: { children: ReactNode }) {
  const [activeModal, setActiveModal] = useState<ModalKind>(null);
  const [prefillPlan, setPrefillPlan] = useState<string | undefined>(
    undefined
  );

  const openBookDemo = useCallback((plan?: string) => {
    setPrefillPlan(plan);
    setActiveModal("demo");
  }, []);

  const openFreeTrial = useCallback((plan?: string) => {
    setPrefillPlan(plan);
    setActiveModal("trial");
  }, []);

  const openContactSales = useCallback((plan?: string) => {
    setPrefillPlan(plan);
    setActiveModal("sales");
  }, []);

  const close = useCallback(() => setActiveModal(null), []);

  const value = useMemo(
    () => ({ openBookDemo, openFreeTrial, openContactSales, close }),
    [openBookDemo, openFreeTrial, openContactSales, close]
  );

  return (
    <CtaModalsContext.Provider value={value}>
      {children}
      {activeModal === "demo" && (
        <BookDemoDialog
          open
          onOpenChange={(open) => !open && close()}
          plan={prefillPlan}
        />
      )}
      {activeModal === "trial" && (
        <FreeTrialDialog
          open
          onOpenChange={(open) => !open && close()}
          plan={prefillPlan}
        />
      )}
      {activeModal === "sales" && (
        <ContactSalesDialog
          open
          onOpenChange={(open) => !open && close()}
          plan={prefillPlan}
        />
      )}
    </CtaModalsContext.Provider>
  );
}
