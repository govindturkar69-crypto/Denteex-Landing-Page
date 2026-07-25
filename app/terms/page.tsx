import type { Metadata } from "next";
import { getMarkdownHtml } from "@/lib/markdown";
import { MarkdownPage } from "@/components/shared/markdown-page";

export const metadata: Metadata = {
  title: "Terms of Service — Denteex",
  description: "The subscription and service terms governing use of Denteex.",
};

export default function TermsPage() {
  const html = getMarkdownHtml("terms-of-service.md");
  return <MarkdownPage eyebrow="Legal" title="Terms of Service" html={html} />;
}
