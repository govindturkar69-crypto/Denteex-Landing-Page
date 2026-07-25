import { bookDemoSchema } from "@/lib/schemas";
import { handleValidatedSubmission } from "@/lib/api-handler";

export async function POST(request: Request) {
  return handleValidatedSubmission({
    request,
    schema: bookDemoSchema,
    routeName: "book-demo",
  });
}
