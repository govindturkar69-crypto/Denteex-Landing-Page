/**
 * Rejects cross-origin POSTs to our own API routes. This app has no public
 * API for other sites to consume, so same-origin is the correct default.
 */
export function isSameOrigin(request: Request): boolean {
  const origin = request.headers.get("origin");

  // Same-origin requests from browsers for simple navigations/forms may
  // omit Origin; allow those through and rely on the browser's own
  // same-origin enforcement for fetch() calls, which always sends Origin.
  if (!origin) return true;

  const expected =
    process.env.NEXT_PUBLIC_SITE_URL ?? `http://${request.headers.get("host") ?? ""}`;

  try {
    return new URL(origin).host === new URL(expected).host;
  } catch {
    return false;
  }
}
