import { z } from "zod";
import {
  CreateRoomInputSchema,
  CreateRoomSchema,
  GetRoomSchema,
} from "../room/room.schema";
import { AMENITIES } from "./boarding-house.constants";
import {
  BaseLocationSchema,
  GetLocationSchema,
} from "../location/location.schema";
import {
  BoardingHouseImageSchema,
  ImageUploadSchema,
} from "../image/image.schema";
import { GetBookingSchema } from "../booking/booking.schema";
import { PDFSchema } from "../valid-docs/pdf/pdf.schema";

export const BaseBoardingHouseSchema = z.object({
  id: z.number(),
  ownerId: z.number(),
  name: z.string(),
  address: z.string(),
  description: z.string(),
  price: z.number(),
  amenities: z.array(z.string()),
  availabilityStatus: z.boolean(),
  locationId: z.number(),

  // ✅ This must be a Zod schema, not a TypeScript interface
  location: GetLocationSchema,

  properties: z.array(z.string()),
  createdAt: z.string(),
  updatedAt: z.string(),

  bookings: z.array(GetBookingSchema), // or CreateBookingSchema if needed
  boardingHouseImage: z.array(BoardingHouseImageSchema),
  permits: z.array(PDFSchema),
  thumbnail: z.array(ImageUploadSchema).optional(),
  gallery: z.array(ImageUploadSchema).optional(),
});

export type BoardingHouse = z.infer<typeof BaseBoardingHouseSchema>;

export const GetBoardingHouseSchema = z.object({
  id: z.number(),
  ownerId: z.number(),
  name: z.string(),
  address: z.string(),
  description: z.string().optional(),
  amenities: z.array(z.enum(AMENITIES)),
  availabilityStatus: z.boolean(),
  locationId: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isDeleted: z.boolean(),
  deletedAt: z.string().nullable(),
  thumbnail: z.array(ImageUploadSchema).optional(),
  gallery: z.array(ImageUploadSchema).optional(),
  location: GetLocationSchema,
  rooms: z.array(GetRoomSchema).optional(),
  capacity: z.object({
    totalCapacity: z.number(),
    currentCapacity: z.number(),
  }),
});
export type GetBoardingHouse = z.infer<typeof GetBoardingHouseSchema>;

export const QueryBoardingHouseSchema = z.object({
  id: z.number().optional(),
  ownerId: z.number().optional(),
  name: z.string().optional(),
  address: z.string().optional(),
  availabilityStatus: z.boolean().optional(),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
  isDeleted: z.boolean().optional(),
  deletedAt: z.string().optional(),
  location: GetLocationSchema.optional(),
  thumbnail: z.array(ImageUploadSchema).optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  sortBy: z.string().optional(),
  page: z.number().optional(),
  offset: z.number().optional(),
  capacity: z
    .object({
      totalCapacity: z.number(),
      currentCapacity: z.number(),
    })
    .optional(),
});
export type QueryBoardingHouse = z.infer<typeof QueryBoardingHouseSchema>;

export const FindOneBoardingHouseSchema = z.object({
  id: z.number(),
  ownerId: z.number(),
  name: z.string(),
  address: z.string(),
  description: z.string().optional(),
  amenities: z.array(z.enum(AMENITIES)),
  availabilityStatus: z.boolean(),
  locationId: z.number().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isDeleted: z.boolean(),
  deletedAt: z.string().nullable(),
  location: GetLocationSchema,
  thumbnail: z.array(ImageUploadSchema).optional(),
  gallery: z.array(ImageUploadSchema).optional(),
  rooms: z.array(GetRoomSchema).optional(),
  capacity: z.object({
    totalCapacity: z.number(),
    currentCapacity: z.number(),
  }),
});
export type FindOneBoardingHouse = z.infer<typeof FindOneBoardingHouseSchema>;

// Input schema for boarding house
export const CreateBoardingHouseInputSchema = z.object({
  ownerId: z
    .number()
    .positive({ message: "Owner ID must be a positive number" }),
  name: z.string().min(1, "Name is required"),
  address: z.string().min(1, "Address is required"),
  description: z.string().optional(),
  amenities: z.array(z.enum(AMENITIES)),
  availabilityStatus: z.boolean(),
  thumbnail: z.array(ImageUploadSchema).optional(),
  gallery: z.array(ImageUploadSchema).optional(),
  location: BaseLocationSchema,
  rooms: z.array(CreateRoomInputSchema).optional(),
});

// Output schema with transformations
export const CreateBoardingHouseSchema =
  CreateBoardingHouseInputSchema.transform((data) => ({
    ...data,
    rooms: data.rooms
      ? data.rooms.map(
          (room) => CreateRoomSchema.parse(room) // Transform each room to output type
        )
      : undefined,
  }));

export type CreateBoardingHouseInput = z.infer<
  typeof CreateBoardingHouseInputSchema
>;
export type CreateBoardingHouse = z.infer<typeof CreateBoardingHouseSchema>;
