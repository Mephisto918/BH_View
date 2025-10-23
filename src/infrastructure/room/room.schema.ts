import { z } from "zod";
import { ImageUploadSchema, ImageResponseSchema } from "../image/image.schema";
import { ROOM_FEATURE_TAGS } from "./room.constants";

export const RoomTypeEnumSchema = z.enum([
  "SOLO",
  "DUO",
  "TRIO",
  "SQUAD",
  "FAMILY",
]);

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

export const FindOneRoomSchema = z.object({
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

export type FindOneRoom = z.infer<typeof FindOneRoomSchema>;

export const CreateRoomInputSchema = z.object({
  boardingHouseId: z.number(),
  roomNumber: z.string().min(1, "Room number is required"),
  maxCapacity: z
    .string()
    .min(1)
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0),
  price: z
    .string()
    .min(1)
    .refine((v) => !isNaN(Number(v)) && Number(v) >= 0),
  gallery: z.array(ImageUploadSchema).optional(),
  tags: z.array(z.enum(ROOM_FEATURE_TAGS)).optional(),
  roomType: RoomTypeEnumSchema.optional(),
});

export const CreateRoomSchema = CreateRoomInputSchema.transform((data) => ({
  ...data,
  maxCapacity: parseInt(data.maxCapacity, 10),
  price: parseFloat(data.price),
  tags: data.tags ?? [],
  roomType: data.roomType ?? "SOLO",
}));

export type CreateRoomInput = z.infer<typeof CreateRoomInputSchema>;
export type CreateRoom = z.infer<typeof CreateRoomSchema>;
