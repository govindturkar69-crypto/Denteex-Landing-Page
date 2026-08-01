import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const DEFAULT_LIMIT = 5;
const DEFAULT_WINDOW_MS = 60_000;

// --- Optional Upstash-backed limiter -------------------------------------
// Activates only if both env vars are set. When they aren't (the default —
// no Redis instance is configured for this project), every call falls
// through to the in-memory sliding-window limiter below instead. This is
// the real fix for the "not shared across serverless instances" gap
// documented in SECURITY.md, available the moment someone provisions a
// free Upstash database and sets the two env vars — nothing else to wire.
//
// Caveat: the Upstash limiter's window is fixed at module init to the
// defaults below. Every current caller uses the defaults, so this doesn't
// matter in practice, but a future caller passing a custom limit/window
// would only see it honored by the in-memory fallback, not Upstash.
const upstashUrl = process.env.UPSTASH_REDIS_REST_URL;
const upstashToken = process.env.UPSTASH_REDIS_REST_TOKEN;

const upstashLimiter =
  upstashUrl && upstashToken
    ? new Ratelimit({
        redis: new Redis({ url: upstashUrl, token: upstashToken }),
        limiter: Ratelimit.slidingWindow(DEFAULT_LIMIT, `${DEFAULT_WINDOW_MS / 1000} s`),
        analytics: false,
        prefix: "denteex",
      })
    : null;

// --- In-memory sliding-window fallback -----------------------------------
// Keeps a trailing log of request timestamps per key instead of resetting
// a counter at a fixed window boundary — avoids the classic fixed-window
// bug where a client can send `limit` requests right before a boundary and
// another `limit` right after, briefly doubling the effective rate.
// Per-process only; resets on cold start. See SECURITY.md.
const requestLog = new Map<string, number[]>();

function checkInMemory(key: string, limit: number, windowMs: number) {
  const now = Date.now();
  const windowStart = now - windowMs;
  const timestamps = (requestLog.get(key) ?? []).filter((t) => t > windowStart);

  if (timestamps.length >= limit) {
    requestLog.set(key, timestamps);
    return { allowed: false, remaining: 0, resetAt: timestamps[0] + windowMs };
  }

  timestamps.push(now);
  requestLog.set(key, timestamps);
  return {
    allowed: true,
    remaining: limit - timestamps.length,
    resetAt: now + windowMs,
  };
}

export async function checkRateLimit(
  key: string,
  limit = DEFAULT_LIMIT,
  windowMs = DEFAULT_WINDOW_MS
): Promise<{ allowed: boolean; remaining: number; resetAt: number }> {
  if (upstashLimiter) {
    const result = await upstashLimiter.limit(key);
    return {
      allowed: result.success,
      remaining: result.remaining,
      resetAt: result.reset,
    };
  }
  return checkInMemory(key, limit, windowMs);
}

export function getClientKey(request: Request): string {
  const forwardedFor = request.headers.get("x-forwarded-for");
  if (forwardedFor) return forwardedFor.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}
