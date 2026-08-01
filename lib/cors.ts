/**
 * Rejects cross-origin/forged POSTs to our own API routes — same-origin
 * enforcement doubling as CSRF protection, since this app has no public API
 * for other sites to consume and no session cookies for an attacker's page
 * to ride on regardless.
 *
 * Checks `Origin` first (sent by every browser on same-site fetch/form
 * POSTs), falls back to `Referer` when `Origin` is absent (some proxies or
 * privacy tools strip it), and rejects outright if neither header is
 * present — a real request from this app's own pages always sends at least
 * one of them, so a request with neither is treated as suspicious rather
 * than silently allowed.
 */
export function isSameOrigin(request: Request): boolean {
  const expected =
    process.env.NEXT_PUBLIC_SITE_URL ?? `http://${request.headers.get("host") ?? ""}`;

  let expectedHost: string;
  try {
    expectedHost = new URL(expected).host;
  } catch {
    return false;
  }

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      return new URL(origin).host === expectedHost;
    } catch {
      return false;
    }
  }

  const referer = request.headers.get("referer");
  if (referer) {
    try {
      return new URL(referer).host === expectedHost;
    } catch {
      return false;
    }
  }

  return false;
}
