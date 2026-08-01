"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Logo } from "@/components/shared/logo";
import { navLinks, hero } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useCtaModals } from "@/components/cta/use-cta-modals";

export function MobileDrawer() {
  const [open, setOpen] = useState(false);
  const { openBookDemo } = useCtaModals();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon"
            aria-label="Open menu"
            className="md:hidden"
          />
        }
      >
        <Menu className="size-5" />
      </SheetTrigger>
      <SheetContent side="right" className="w-3/4 sm:max-w-xs">
        <SheetHeader>
          <SheetTitle>
            <Logo />
          </SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-4" aria-label="Mobile">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-3 text-base font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-2 p-4">
          <motion.button
            type="button"
            onClick={() => {
              setOpen(false);
              openBookDemo();
            }}
            whileTap={{ scale: 0.97 }}
            className={cn(buttonVariants(), "w-full")}
          >
            {hero.primaryCta.label}
          </motion.button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
