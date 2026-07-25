import type { Metadata } from "next";
import { getMarkdownHtml } from "@/lib/markdown";
import { MarkdownPage } from "@/components/shared/markdown-page";

export const metadata: Metadata = {
  title: "Quick Start Guide — Denteex",
  description:
    "A quick-start guide to the 3D odontogram, scheduling, reminders, and billing in Denteex.",
};

export default function DocsPage() {
  const html = getMarkdownHtml("docs.md");
  return (
    <MarkdownPage eyebrow="Documentation" title="Quick Start Guide" html={html} />
  );
}
