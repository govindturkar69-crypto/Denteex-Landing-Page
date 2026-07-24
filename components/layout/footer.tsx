"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Loader2, Mail, MapPin, Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared/logo";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/shared/social-icons";
import { brand, footerLinks, socials, contact } from "@/lib/content";

const socialIcons = {
  Facebook: FacebookIcon,
  Linkedin: LinkedinIcon,
  Instagram: InstagramIcon,
} as const;

type Status = "idle" | "loading" | "success";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || status === "loading") return;
    setStatus("loading");
    await new Promise((resolve) => setTimeout(resolve, 900));
    setStatus("success");
    setEmail("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm gap-2">
      <Input
        type="email"
        required
        placeholder="you@clinic.com"
        aria-label="Email address"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={status !== "idle"}
      />
      <Button type="submit" disabled={status !== "idle"} className="shrink-0">
        {status === "loading" && <Loader2 className="size-4 animate-spin" />}
        {status === "success" && <Check className="size-4" />}
        {status === "idle" && "Subscribe"}
        {status === "success" && "Subscribed"}
      </Button>
    </form>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-black/5 bg-secondary/40 dark:border-white/10 dark:bg-black/20">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <Logo />
            <p className="mt-3 max-w-xs text-sm text-muted-foreground">
              {brand.tagline}
            </p>
            <div className="mt-5 flex flex-col gap-2 text-sm text-muted-foreground">
              <span className="flex items-center gap-2">
                <Mail className="size-4 shrink-0" aria-hidden="true" />
                {contact.email}
              </span>
              <span className="flex items-center gap-2">
                <Phone className="size-4 shrink-0" aria-hidden="true" />
                {contact.phone}
              </span>
              <span className="flex items-center gap-2">
                <MapPin className="size-4 shrink-0" aria-hidden="true" />
                {contact.address}
              </span>
            </div>
          </div>

          <FooterColumn title="Product" links={footerLinks.product} />
          <FooterColumn title="Company" links={footerLinks.company} />
          <FooterColumn title="Resources" links={footerLinks.resources} />
        </div>

        <div className="mt-12 flex flex-col gap-6 border-t border-black/5 pt-8 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
          <div>
            <p className="text-sm font-medium">Stay in the loop</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Product updates, no spam. Unsubscribe anytime.
            </p>
            <div className="mt-3">
              <NewsletterForm />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {socials.map((social) => {
              const Icon = socialIcons[social.icon as keyof typeof socialIcons];
              return (
                <Link
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex size-9 items-center justify-center rounded-full border border-black/5 text-muted-foreground transition-colors hover:border-primary/30 hover:text-primary dark:border-white/10"
                >
                  <Icon className="size-4" />
                </Link>
              );
            })}
          </div>
        </div>

        <div className="mt-8 flex flex-col-reverse items-center gap-4 border-t border-black/5 pt-6 text-xs text-muted-foreground sm:flex-row sm:justify-between dark:border-white/10">
          <p>© {year} {brand.name}. All rights reserved.</p>
          <div className="flex gap-4">
            {footerLinks.legal.map((link) => (
              <Link key={link.href + link.label} href={link.href} className="hover:text-foreground">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <p className="text-sm font-semibold">{title}</p>
      <ul className="mt-4 flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.href + link.label}>
            <Link
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
