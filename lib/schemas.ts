import { z } from "zod";

const name = z.string().trim().min(2, "Please enter a name.").max(100);
const email = z.string().trim().toLowerCase().email("Please enter a valid email address.").max(200);
const clinicName = z.string().trim().min(2, "Please enter a clinic name.").max(150);

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
  integrationNeeds: z.string().trim().max(1000).optional(),
});

export type ContactSalesInput = z.infer<typeof contactSalesSchema>;

export const freeTrialSchema = z.object({
  doctorName: name,
  email,
  password: z.string().min(8, "Password must be at least 8 characters.").max(200),
  practiceName: z.string().trim().min(2, "Please enter your practice name.").max(150),
});

export type FreeTrialInput = z.infer<typeof freeTrialSchema>;
