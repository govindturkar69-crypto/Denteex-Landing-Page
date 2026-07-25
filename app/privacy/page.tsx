import type { Metadata } from "next";
import { getMarkdownHtml } from "@/lib/markdown";
import { MarkdownPage } from "@/components/shared/markdown-page";

export const metadata: Metadata = {
  title: "Privacy Policy — Denteex",
  description:
    "How Denteex collects, uses, and protects clinic and patient data, including our HIPAA and GDPR posture.",
};

export default function PrivacyPage() {
  const html = getMarkdownHtml("privacy-policy.md");
  return <MarkdownPage eyebrow="Legal" title="Privacy Policy" html={html} />;
}
