import type { SVGProps } from "react";

export function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M13.5 21v-7.5h2.5l.4-3H13.5V8.5c0-.87.24-1.46 1.49-1.46H16.5V4.35c-.26-.04-1.15-.11-2.19-.11-2.17 0-3.66 1.32-3.66 3.75v2.51H8.16v3h2.49V21h2.85Z" />
    </svg>
  );
}

export function LinkedinIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M6.94 8.5H4.06V20h2.88V8.5ZM5.5 4a1.67 1.67 0 1 0 0 3.33A1.67 1.67 0 0 0 5.5 4ZM20 20v-6.35c0-3.4-1.82-4.98-4.24-4.98a3.66 3.66 0 0 0-3.32 1.83V8.5H9.56c.04.85 0 11.5 0 11.5h2.88v-6.42c0-.34.02-.69.13-.94.28-.69.9-1.4 1.96-1.4 1.38 0 1.93 1.05 1.93 2.6V20H20Z" />
    </svg>
  );
}

export function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} aria-hidden="true" {...props}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
