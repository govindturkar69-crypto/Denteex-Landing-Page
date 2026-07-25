import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function MarkdownPage({
  eyebrow,
  title,
  html,
}: {
  eyebrow: string;
  title: string;
  html: string;
}) {
  return (
    <div className="relative overflow-hidden py-20 sm:py-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute top-[-10%] left-1/2 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-teal-glow/15 blur-[120px]" />
        <div className="absolute right-[-10%] bottom-[-10%] h-[24rem] w-[24rem] rounded-full bg-coral-glow/10 blur-[120px]" />
      </div>

      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Denteex
        </Link>

        <span className="mt-6 block text-xs font-semibold tracking-widest text-muted-foreground uppercase">
          {eyebrow}
        </span>
        <h1 className="mt-2 font-heading text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {title}
        </h1>

        <div className="glass glow-ring mt-10 rounded-3xl p-6 sm:p-10">
          <div
            className="prose prose-neutral dark:prose-invert max-w-none prose-headings:font-heading prose-a:text-primary prose-a:no-underline hover:prose-a:underline"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </div>
    </div>
  );
}
