import type { Metadata } from "next";
import { getMarkdownHtml } from "@/lib/markdown";
import { MarkdownPage } from "@/components/shared/markdown-page";

export const metadata: Metadata = {
  title: "FAQ — Denteex",
  description: "Comprehensive answers about Denteex, from setup to security to billing.",
};

export default function FaqPage() {
  const html = getMarkdownHtml("faq.md");
  return (
    <MarkdownPage
      eyebrow="Support"
      title="Frequently Asked Questions"
      html={html}
    />
  );
}
