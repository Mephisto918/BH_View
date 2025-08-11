import { z } from "zod";
import { ImageQuality, ImageType as ImageTypeTypes } from "./image.types";

export const ImageSchema = z.object({
  uri: z.string(),
  name: z.string(),
  type: z
    .string()
    .refine((val) => ["image/jpeg", "image/jpg", "image/png"].includes(val), {
      message: "Image type must be jpeg, jpg, or png",
    }),
  quality: z
    .string()
    .refine((val) => ["low", "medium", "high"].includes(val), {
      message: "Quality must be low, medium, or high",
    })
    .optional(), // Make quality optional
  size: z
    .number()
    .max(5 * 1024 * 1024, { message: "Image size must not exceed 5MB" })
    .optional(),
});

export type ImageType = z.infer<typeof ImageSchema>;

export const BoardingHouseImageSchema = z.object({
  id: z.number(),
  // If you don't want circular dependency with BoardingHouse, skip or use z.lazy
  boardingHouseId: z.number(),
  url: z.string().url(),
  type: ImageTypeTypes,
  quality: ImageQuality,
  createdAt: z.string(),
});

export type AppImageFile = {
  uri: string;
  name: string;
  type: string;
  quality: string;
  size?: number;
};
