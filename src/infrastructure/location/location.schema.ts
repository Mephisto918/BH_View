import { z } from "zod";

export const GeometryTypeSchema = z.enum(["Point", "LineString", "Polygon"]);

export const BaseLocationSchema = z.object({
  type: z.literal("Point"),
  coordinates: z
    .tuple([
      z.number().min(-180).max(180), // longitude
      z.number().min(-90).max(90), // latitude
    ])
    .refine(([lng, lat]) => lng !== 0 && lat !== 0, {
      message: "Coordinates must be valid and non-zero",
    }),
});

export const CreateLocationSchema = BaseLocationSchema.extend({
  city: z.string().nullable().optional(),
  province: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
});

export const GetLocationSchema = CreateLocationSchema.extend({
  id: z.number(),
  isDeleted: z.boolean().optional(),
  deletedAt: z.string().nullable().optional(),
});

export type GetLocationDto = z.infer<typeof GetLocationSchema>;
export type GeometryType = z.infer<typeof GeometryTypeSchema>;
export type LocationCoordinates = z.infer<typeof BaseLocationSchema>;
export type CreateLocationDto = z.infer<typeof CreateLocationSchema>;
