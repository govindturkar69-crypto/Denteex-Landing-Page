import { NextResponse } from "next/server";
import type { z } from "zod";
import { checkRateLimit, getClientKey } from "@/lib/rate-limit";
import { isSameOrigin } from "@/lib/cors";

export async function handleValidatedSubmission<T extends z.ZodTypeAny>({
  request,
  schema,
  routeName,
  limit = 5,
  windowMs = 60_000,
}: {
  request: Request;
  schema: T;
  routeName: string;
  limit?: number;
  windowMs?: number;
}) {
  if (!isSameOrigin(request)) {
    return NextResponse.json(
      { success: false, error: "Cross-origin requests are not allowed." },
      { status: 403 }
    );
  }

  const clientKey = getClientKey(request);
  const { allowed, resetAt } = await checkRateLimit(
    `${routeName}:${clientKey}`,
    limit,
    windowMs
  );
  if (!allowed) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please try again shortly." },
      {
        status: 429,
        headers: {
          "Retry-After": Math.ceil((resetAt - Date.now()) / 1000).toString(),
        },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { success: false, error: "Invalid request body." },
      { status: 400 }
    );
  }

  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      {
        success: false,
        error: "Please check the highlighted fields.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 400 }
    );
  }

  // No email/CRM service is configured for this project — log server-side
  // instead of pretending to send an email. See SECURITY.md.
  console.log(`[api/${routeName}] new submission from ${clientKey}`, parsed.data);

  return NextResponse.json({ success: true });
}
