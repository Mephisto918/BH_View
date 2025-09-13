import { z } from "zod";

export const ImageTypeEnum = z.enum([
  "PFP",
  "THUMBNAIL",
  "MAIN",
  "GALLERY",
  "BANNER",
  "FLOORPLAN",
  "DOCUMENT",
  "QR",
  "MAP",
  "ROOM",
]);
export type ImageType = z.infer<typeof ImageTypeEnum>;

export const ImageQualityEnum = z.enum(["LOW", "MEDIUM", "HIGH"]);
