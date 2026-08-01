import { z } from "zod";

/**
 * Strips HTML tags from free-text input. Zod's type/format checks alone
 * don't sanitize content — this is a defense-in-depth layer so nothing
 * resembling markup survives into logs or (if this is ever wired to
 * storage/email later) downstream rendering.
 */
function stripHtml(value: string) {
  return value.replace(/<[^>]*>/g, "").trim();
}

function sanitizedText(min: number, max: number, message: string) {
  return z.string().trim().min(min, message).max(max).transform(stripHtml);
}

const name = sanitizedText(2, 100, "Please enter a name.");
const email = z.string().trim().toLowerCase().email("Please enter a valid email address.").max(200);
const clinicName = sanitizedText(2, 150, "Please enter a clinic name.");

const whatsapp = z
  .string()
  .trim()
  .min(1, "Please enter a WhatsApp number.")
  .max(30)
  .refine((val) => val.replace(/\D/g, "").length >= 7, {
    message: "Please enter a valid phone number.",
  });

export const bookDemoSchema = z.object({
  clinicSize: z.enum(["solo", "multi-doctor", "enterprise"], {
    message: "Please select a clinic size.",
  }),
  date: z.string().trim().min(1, "Please select a date."),
  time: z.string().trim().min(1, "Please select a time."),
  doctorName: name,
  clinicName,
  email,
  whatsapp,
});

export type BookDemoInput = z.infer<typeof bookDemoSchema>;

export const contactSalesSchema = z.object({
  name,
  email,
  clinicName,
  chairs: z.coerce
    .number({ message: "Enter a number greater than 0." })
    .int()
    .positive("Enter a number greater than 0.")
    .max(1000),
  budget: z.string().trim().max(50).optional(),
  integrationNeeds: z
    .string()
    .trim()
    .max(1000)
    .transform(stripHtml)
    .optional(),
});

export type ContactSalesInput = z.infer<typeof contactSalesSchema>;

export const freeTrialSchema = z.object({
  doctorName: name,
  email,
  password: z.string().min(8, "Password must be at least 8 characters.").max(200),
  practiceName: sanitizedText(2, 150, "Please enter your practice name."),
});

export type FreeTrialInput = z.infer<typeof freeTrialSchema>;

export const newsletterSchema = z.object({
  email,
});

export type NewsletterInput = z.infer<typeof newsletterSchema>;
