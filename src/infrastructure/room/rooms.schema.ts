import { z } from "zod";
import {
  ImageUploadSchema,
  ImageResponseSchema,
  AppImageFile,
} from "../image/image.schema";
import { ROOM_FEATURE_TAGS } from "./rooms.constants";

/* -----------------------------------------
   ENUMS & BASE SCHEMAS
------------------------------------------ */
export enum RoomType {
  STUDIO = "STUDIO",
  SINGLE = "SINGLE",
  DOUBLE = "DOUBLE",
  BED_SPACER = "BED_SPACER",
  APARTMENT = "APARTMENT",
}

export const RoomTypeLabels: Record<RoomType, string> = {
  [RoomType.STUDIO]: "Studio Room",
  [RoomType.SINGLE]: "Single Room (Private Room)",
  [RoomType.DOUBLE]: "Double Room",
  [RoomType.BED_SPACER]: "Bed Spacer / Shared Room",
  [RoomType.APARTMENT]: "Apartment / Shared Room",
};

export const RoomTypeEnumSchema = z.nativeEnum(RoomType);

export enum RoomFurnishingType {
  UNFURNISHED = "UNFURNISHED",
  SEMI_FURNISHED = "SEMI_FURNISHED",
  FULLY_FURNISHED = "FULLY_FURNISHED",
}

export const RoomFurnishingLabels: Record<RoomFurnishingType, string> = {
  [RoomFurnishingType.UNFURNISHED]: "Unfurnished",
  [RoomFurnishingType.SEMI_FURNISHED]: "Semi-Furnished",
  [RoomFurnishingType.FULLY_FURNISHED]: "Fully Furnished",
};

export const RoomFurnishingEnumSchema = z.nativeEnum(RoomFurnishingType);

/* -----------------------------------------
   READ / FETCH SCHEMAS
------------------------------------------ */

export const GetRoomSchema = z.object({
  id: z.number(),
  boardingHouseId: z.number(),
  roomNumber: z.string(),
  description: z.string(),
  maxCapacity: z.number(),
  currentCapacity: z.number(),
  price: z.preprocess((val) => Number(val), z.number()),
  gallery: z.array(ImageUploadSchema).optional(),
  thumbnail: z.array(ImageUploadSchema).optional(),
  tags: z.array(z.enum(ROOM_FEATURE_TAGS)).optional(),
  roomType: RoomTypeEnumSchema.optional(),
  furnishingType: RoomFurnishingEnumSchema.optional(),
  availabilityStatus: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
  isDeleted: z.boolean(),
  deletedAt: z.string().nullable(),
});

export type GetRoom = z.infer<typeof GetRoomSchema>;

export const FindOneRoomSchema = GetRoomSchema; // ✅ identical schema, no duplication
export type FindOneRoom = z.infer<typeof FindOneRoomSchema>;

/* -----------------------------------------
   CREATE (STANDALONE)
------------------------------------------ */

export const CreateRoomInputSchema = z.object({
  roomNumber: z.string(),
  description: z.string().optional(),
  maxCapacity: z.union([z.string(), z.number()]),
  price: z.union([z.string(), z.number()]),
  roomType: RoomTypeEnumSchema,
  furnishingType: RoomFurnishingEnumSchema.optional(),
  tags: z.array(z.string()).default([]),
  gallery: z
    .array(
      z.object({
        uri: z.string(),
        name: z.string().optional(),
        type: z.string().optional(),
      })
    )
    .default([]),
  thumbnail: z
    .array(
      z.object({
        uri: z.string(),
        name: z.string().optional(),
        type: z.string().optional(),
      })
    )
    .default([]),
});

export const CreateRoomSchema = CreateRoomInputSchema.transform((data) => ({
  ...data,
  maxCapacity: data.maxCapacity,
  price: data.price,
  tags: data.tags ?? [],
}));

export type CreateRoomInput = z.infer<typeof CreateRoomInputSchema>;
export type CreateRoom = z.input<typeof CreateRoomSchema>;

/* -----------------------------------------
   CREATE (UNIFIED WITH BOARDING HOUSE)
------------------------------------------ */

// ✅ Used when rooms are created inline during Boarding House creation
export const UnifiedRoomCreateSchema = z
  .object({
    roomNumber: z.string().min(1, "Room number is required"),
    maxCapacity: z.coerce
      .number()
      .min(1)
      .refine((v) => !isNaN(Number(v)) && Number(v) > 0, {
        message: "Max capacity must be a positive number",
      }),
    price: z.coerce
      .number()
      .min(1)
      .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, {
        message: "Price must be a valid number",
      }),
    gallery: z.array(ImageUploadSchema).optional(),
    tags: z.array(z.enum(ROOM_FEATURE_TAGS)).optional(),
    roomType: RoomTypeEnumSchema.optional(),
    furnishingType: RoomFurnishingEnumSchema.optional(),
  })
  .transform((data) => ({
    ...data,
    tags: data.tags ?? [],
    roomType: data.roomType ?? RoomType.STUDIO,
    furnishingType: data.furnishingType ?? RoomFurnishingType.UNFURNISHED,
  }));

export type UnifiedRoomCreate = z.output<typeof UnifiedRoomCreateSchema>;
