import { z } from "zod";
import { ImageUploadSchema, ImageResponseSchema } from "../image/image.schema";
import { ROOM_FEATURE_TAGS } from "./room.constants";

/* -----------------------------------------
   ENUMS & BASE SCHEMAS
------------------------------------------ */

export const RoomTypeEnumSchema = z.enum([
  "SOLO",
  "DUO",
  "TRIO",
  "SQUAD",
  "FAMILY",
]);

/* -----------------------------------------
   READ / FETCH SCHEMAS
------------------------------------------ */

export const GetRoomSchema = z.object({
  id: z.number(),
  boardingHouseId: z.number(),
  roomNumber: z.string(),
  maxCapacity: z.number(),
  currentCapacity: z.number(),
  price: z.preprocess((val) => Number(val), z.number()),
  gallery: z.array(ImageResponseSchema).optional(),
  thumbnail: z.array(ImageResponseSchema).optional(),
  tags: z.array(z.enum(ROOM_FEATURE_TAGS)).optional(),
  roomType: RoomTypeEnumSchema.optional(),
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
  roomNumber: z.string().min(1, "Room number is required"),
  maxCapacity: z.coerce
    .number()
    .int()
    .positive("Capacity must be a positive number"),
  price: z.coerce.number().positive("Price must be positive"),
  tags: z.array(z.string()).default([]),
  roomType: z.enum(["SOLO", "DUO", "TRIO", "SQUAD", "FAMILY"]),
  gallery: z
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
  roomType: data.roomType ?? "SOLO",
}));

export type CreateRoomInput = z.infer<typeof CreateRoomInputSchema>;
export type CreateRoom = z.infer<typeof CreateRoomSchema>;

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
  })
  .transform((data) => ({
    ...data,
    tags: data.tags ?? [],
    roomType: data.roomType ?? "SOLO",
  }));

export type UnifiedRoomCreate = z.infer<typeof UnifiedRoomCreateSchema>;
