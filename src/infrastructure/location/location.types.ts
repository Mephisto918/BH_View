import { LocationCoordinates } from "./location.schema";

export interface Location {
  id: number;
  province?: string;
  city?: string;
  country?: string;
  isDeleted: boolean;
  deletedAt: Date | null;
  coordinates: LocationCoordinates[];
}

export const GetLocationSchema = z.object({
  id: z.number().int().positive(),
  coordinates: z.array(z.number()).nonempty(),
  province: z.string().nullable().optional(),
  city: z.string().nullable().optional(),
  country: z.string().nullable().optional(),
  isDeleted: z.boolean(),
  deletedAt: z.string().nullable(),
});
