import { z } from "zod";

export const PDFSchema = z.object({
  uri: z.string(),
  name: z.string(),
  type: z.literal("application/pdf"),
  size: z
    .number()
    .max(10 * 1024 * 1024)
    .optional(), // max 10mb
});
