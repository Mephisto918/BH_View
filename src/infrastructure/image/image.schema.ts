import { z } from "zod";
import { ImageQualityEnum, ImageTypeEnum } from "./image.types";

/* ===========================
   INPUT SCHEMA (App → Backend)
   =========================== */

export const ImageUploadSchema = z.object({
  uri: z.string().url().or(z.string()), // local or remote paths
  name: z.string(),

  // Type narrowing for MIME type
  type: z
    .string()
    .transform((t) => t.toLowerCase())
    .refine(
      (t) => ["image/jpeg", "image/jpg", "image/png"].includes(t),
      "Unsupported image type"
    ),

  // Type narrowing for quality
  quality: z
    .string()
    .transform((q) => q.toLowerCase())
    .refine((q) => ["low", "medium", "high"].includes(q), "Invalid quality")
    .optional(),

  // Size validation
  size: z
    .number()
    .max(5 * 1024 * 1024, { message: "Image size must not exceed 5MB" })
    .optional(),
});

export type AppImageFile = z.infer<typeof ImageUploadSchema>;

/* ===========================
   OUTPUT SCHEMA (Backend → App)
   =========================== */

export const ImageResponseSchema = z.object({
  id: z.number(),
  url: z.string().url(),
  fileFormat: z.literal("IMAGE"), // backend always returns "IMAGE"
  type: ImageTypeEnum, // e.g. "GALLERY", "THUMBNAIL"
  quality: ImageQualityEnum, // e.g. "LOW", "MEDIUM", "HIGH"
  createdAt: z.string().datetime(),
  isDeleted: z.boolean(),
  deletedAt: z.string().nullable(),
  entityType: z.string(), // e.g. "ROOM" | "BOARDING_HOUSE"
  entityId: z.number(),
});

export type BackendImage = z.infer<typeof ImageResponseSchema>;

export const BoardingHouseImageSchema = z.object({
  id: z.number(),
  // If you don't want circular dependency with BoardingHouse, skip or use z.lazy
  boardingHouseId: z.number(),
  url: z.string().url(),
  type: ImageTypeEnum.optional(),
  quality: ImageQualityEnum.optional(),
  createdAt: z.string(),
});
