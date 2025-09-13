import { z } from "zod";
import { ImageQualityEnum, ImageTypeEnum } from "./image.types";

/* ===========================
   INPUT SCHEMA (App → Backend)
   =========================== */

export const ImageUploadSchema = z.object({
  uri: z.string(), // local file path
  name: z.string(), // filename
  type: z.enum(["image/jpeg", "image/jpg", "image/png"]), // MIME type
  quality: z.enum(["low", "medium", "high"]).optional(), // optional quality hint
  size: z
    .number()
    .max(5 * 1024 * 1024, { message: "Image size must not exceed 5MB" }) // 5MB limit
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
