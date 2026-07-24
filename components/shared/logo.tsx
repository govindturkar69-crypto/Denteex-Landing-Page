import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <svg
        width="28"
        height="28"
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="denteex-logo-grad" x1="0" y1="0" x2="32" y2="32">
            <stop offset="0%" stopColor="var(--teal-glow)" />
            <stop offset="100%" stopColor="var(--coral-glow)" />
          </linearGradient>
        </defs>
        <path
          d="M16 3c-3.2 0-5 1.7-7.3 1.7-2.4 0-4.2-1.2-5.2-1.2C2.2 3.5 2 5 2 6.6c0 6 2.6 12 4.4 16.7 1 2.6 1.8 5.2 3.4 5.2 1.9 0 2-4.8 2.6-7.9.4-2.1.9-3.7 3.6-3.7s3.2 1.6 3.6 3.7c.6 3.1.7 7.9 2.6 7.9 1.6 0 2.4-2.6 3.4-5.2C27.4 18.6 30 12.6 30 6.6c0-1.6-.2-3.1-1.5-3.1-1 0-2.8 1.2-5.2 1.2C21 4.7 19.2 3 16 3Z"
          fill="url(#denteex-logo-grad)"
        />
      </svg>
      <span className="font-heading text-lg font-semibold tracking-tight">
        Denteex
      </span>
    </span>
  );
}
