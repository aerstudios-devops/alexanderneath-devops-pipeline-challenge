import { z } from "zod";

export const contactPayloadSchema = z.object({
  name: z.string().min(1, "name is required"),
  email: z.string().email("email must be valid"),
  message: z.string().min(1, "message is required")
});

export type ContactPayload = z.infer<typeof contactPayloadSchema>;