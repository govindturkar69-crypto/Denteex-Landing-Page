"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { buttonVariants } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileDrawer } from "@/components/layout/mobile-drawer";
import { Logo } from "@/components/shared/logo";
import { navLinks, hero } from "@/lib/content";
import { cn } from "@/lib/utils";
import { useCtaModals } from "@/components/cta/use-cta-modals";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { openBookDemo } = useCtaModals();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="sticky top-0 z-50 w-full"
    >
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-4 transition-all duration-300 sm:px-6 ${
          scrolled
            ? "mt-3 rounded-2xl border border-black/5 bg-background/80 py-3 shadow-lg shadow-black/5 backdrop-blur-xl dark:border-white/10"
            : "mt-0 border-transparent bg-transparent py-5"
        }`}
      >
        <Link href="#" aria-label="Denteex home">
          <Logo />
        </Link>

        <nav
          className="hidden items-center gap-8 md:flex"
          aria-label="Primary"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-1.5">
          <ThemeToggle />
          <motion.button
            type="button"
            onClick={() => openBookDemo()}
            whileTap={{ scale: 0.97 }}
            className={cn(buttonVariants(), "hidden sm:inline-flex")}
          >
            {hero.primaryCta.label}
          </motion.button>
          <MobileDrawer />
        </div>
      </div>
    </motion.header>
  );
}
