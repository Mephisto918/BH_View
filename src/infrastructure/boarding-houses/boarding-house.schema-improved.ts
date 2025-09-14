// boarding-house.schema.ts
import { z } from "zod";
import {
  CreateRoomInputSchema,
  GetRoomSchema,
} from "../room/room.schema";
import {
  BaseLocationSchema,
  GetLocationSchema,
} from "../location/location.schema";
import { ImageResponseSchema, ImageUploadSchema } from "../image/image.schema";
// import { GetBookingSchema } from "../booking/booking.schema"; // if you really need it on read
import { PDFSchema } from "../valid-docs/pdf/pdf.schema";
import { AMENITIES } from "./boarding-house.constants";

/**
 * Make AMENITIES a literal tuple:
 * export const AMENITIES = ["wifi","parking","aircon"] as const;
 */
export const AmenityEnum = z.enum(AMENITIES);
export type Amenity = z.infer<typeof AmenityEnum>;

const Timestamps = z.object({
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const SoftDelete = z.object({
  isDeleted: z.boolean().default(false),
  deletedAt: z.string().datetime().nullable().optional(),
});

const MediaSchema = z.object({
  thumbnail: z.array(ImageResponseSchema).optional(),
  gallery: z.array(ImageResponseSchema).optional(),
  // If you truly need PDFs on the BH entity:
  permits: z.array(PDFSchema).optional(),
});

const CapacitySchema = z.object({
  totalCapacity: z.number().int().nonnegative(),
  currentCapacity: z.number().int().nonnegative(),
}).refine(
  (c) => c.currentCapacity <= c.totalCapacity,
  { message: "currentCapacity must be ≤ totalCapacity", path: ["currentCapacity"] }
);

// Core “entity” fields (no relations/timestamps)
const BoardingHouseCore = z.object({
  id: z.number().int().positive(),
  ownerId: z.number().int().positive(),
  name: z.string().min(1),
  address: z.string().min(1),
  description: z.string().optional(),
  amenities: z.array(AmenityEnum).default([]),
  availabilityStatus: z.boolean(),
  // If BH itself has a price, uncomment across the file for consistency:
  // price: z.number().nonnegative().optional(),
});

// Relations (when reading)
const BoardingHouseRelations = z.object({
  locationId: z.number().int().positive().optional(), // sometimes present on read
  location: GetLocationSchema,                         // resolved relation
  rooms: z.array(GetRoomSchema).optional(),
  capacity: CapacitySchema,                            // if you compute/store capacity on BH
  // bookings: z.array(GetBookingSchema).optional(),   // include only if you need it here
});

// ---------- READ SCHEMA (Get/List/FindOne) ----------
export const BoardingHouseReadSchema = BoardingHouseCore
  .merge(MediaSchema)
  .merge(Timestamps)
  .merge(SoftDelete)
  .merge(BoardingHouseRelations)
  .strict();

export type BoardingHouse = z.infer<typeof BoardingHouseReadSchema>;

// Keep these aliases if you like the old names:
export const GetBoardingHouseSchema = BoardingHouseReadSchema;
export type GetBoardingHouse = z.infer<typeof GetBoardingHouseSchema>;

export const FindOneBoardingHouseSchema = BoardingHouseReadSchema;
export type FindOneBoardingHouse = z.infer<typeof FindOneBoardingHouseSchema>;

// ---------- CREATE INPUT ----------
export const CreateBoardingHouseInputSchema = z.object({
  ownerId: z.number().int().positive({ message: "Owner ID must be a positive number" }),
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  description: z.string().optional(),
  amenities: z.array(AmenityEnum).default([]),
  availabilityStatus: z.boolean().default(true),
  location: BaseLocationSchema,                       // create/attach a location
  rooms: z.array(CreateRoomInputSchema).optional(),   // nested create
  thumbnail: z.array(ImageUploadSchema).optional(),
  gallery: z.array(ImageUploadSchema).optional(),
  // price: z.number().nonnegative().optional(),      // add if BH-level price is needed
});

export type CreateBoardingHouseInput = z.infer<typeof CreateBoardingHouseInputSchema>;

// If you want a transformed “create output” (e.g., after normalizing room input):
export const CreateBoardingHouseOutputSchema = CreateBoardingHouseInputSchema.transform((data) => ({
  ...data,
  rooms: data.rooms ?? [], // keep it predictable if your service expects []
}));

export type CreateBoardingHouse = z.infer<typeof CreateBoardingHouseOutputSchema>;

// ---------- QUERY / FILTER ----------
export const QueryBoardingHouseSchema = z.object({
  id: z.coerce.number().int().positive().optional(),
  ownerId: z.coerce.number().int().positive().optional(),
  name: z.string().optional(),
  address: z.string().optional(),
  availabilityStatus: z.coerce.boolean().optional(),
  // If BH-level price exists; otherwise compute on the service:
  minPrice: z.coerce.number().nonnegative().optional(),
  maxPrice: z.coerce.number().nonnegative().optional(),
  sortBy: z.enum(["name", "createdAt", "updatedAt"/*, "price"*/]).optional(),
  sortOrder: z.enum(["asc", "desc"]).optional(),
  page: z.coerce.number().int().positive().default(1).optional(),
  limit: z.coerce.number().int().positive().max(100).default(20).optional(),
  // Keep these only if you truly use them; “offset” and “page/limit” usually conflict:
  offset: z.coerce.number().int().nonnegative().optional(),
  createdAt: z.string().datetime().optional(),
  updatedAt: z.string().datetime().optional(),
  isDeleted: z.coerce.boolean().optional(),
  deletedAt: z.string().datetime().optional(), // keep .nullable() if you search for nulls specifically
})
.refine(
  (q) => !(q.minPrice && q.maxPrice) || q.minPrice <= q.maxPrice,
  { message: "maxPrice must be ≥ minPrice", path: ["maxPrice"] }
)
.refine(
  (q) => !(q.page && q.offset), // prefer page/limit or limit/offset, not both
  { message: "Use either page/limit or offset/limit, not both", path: ["offset"] }
);
export type QueryBoardingHouse = z.infer<typeof QueryBoardingHouseSchema>;
