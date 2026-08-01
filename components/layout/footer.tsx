"use client";

import { useMemo, useState, type FormEvent } from "react";
import Link from "next/link";
import { AlertCircle, Loader2, Mail, MapPin, Phone, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Logo } from "@/components/shared/logo";
import { FacebookIcon, InstagramIcon, LinkedinIcon } from "@/components/shared/social-icons";
import { brand, footerLinks, socials, contact } from "@/lib/content";
import { newsletterSchema } from "@/lib/schemas";

const socialIcons = {
  Facebook: FacebookIcon,
  Linkedin: LinkedinIcon,
  Instagram: InstagramIcon,
} as const;

type Status = "idle" | "loading" | "success" | "error";

function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [touched, setTouched] = useState(false);

  const parsed = useMemo(() => newsletterSchema.safeParse({ email }), [email]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setTouched(true);
    if (!parsed.success || status === "loading") return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (!res.ok) {
        setStatus("error");
        return;
      }
      setStatus("success");
      setEmail("");
    } catch {
      setStatus("error");
    }
  };

  const busy = status === "loading" || status === "success";

  return (
    <div className="w-full max-w-sm">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="email"
          placeholder="you@clinic.com"
          aria-label="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={busy}
          aria-invalid={touched && !parsed.success}
        />
        <Button type="submit" disabled={busy} className="shrink-0">
          {status === "loading" && <Loader2 className="size-4 animate-spin" />}
          {status === "success" && <Check className="size-4" />}
          {(status === "idle" || status === "error") && "Subscribe"}
          {status === "success" && "Subscribed"}
        </Button>
      </form>
      {touched && status === "idle" && !parsed.success && (
        <p className="mt-1.5 text-xs text-destructive">
          Please enter a valid email address.
        </p>
      )}
      {status === "error" && (
        <p className="mt-1.5 flex items-center gap-1 text-xs text-destructive">
          <AlertCircle className="size-3 shrink-0" />
          Something went wrong. Please try again.
        </p>
      )}
    </div>
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
