import { z } from "zod";
import { ROOM_FEATURE_TAGS } from "./room.constants";
import { ImageSchema } from "../image/image.schema";

export const RoomTypeEnumSchema = z.enum([
  "SOLO",
  "DUO",
  "TRIO",
  "SQUAD",
  "FAMILY",
]);

export const GetRoomSchema = z.object({
  id: z.number(), // response usually includes an ID
  roomNumber: z.string(),
  maxCapacity: z.number(),
  currentCapacity: z.number(),
  price: z.preprocess((val) => Number(val), z.number()),
  gallery: z.array(ImageSchema).optional(),
  thumbnail: z.array(ImageSchema).optional(),
  tags: z.array(z.enum(ROOM_FEATURE_TAGS)).optional(),
  roomType: RoomTypeEnumSchema.optional(),
  availabilityStatus: z.boolean(),
  createdAt: z.string(), // ISO date strings if coming from server
  updatedAt: z.string(),
  isDeleted: z.boolean(),
  deletedAt: z.string().nullable(),
});

export type GetRoomType = z.infer<typeof GetRoomSchema>;

export const CreateRoomInputSchema = z.object({
  roomNumber: z.string().min(1, "Room number is required"),
  maxCapacity: z
    .string()
    .min(1, "Max capacity is required")
    .refine((v) => !isNaN(Number(v)) && Number(v) > 0, {
      message: "Max capacity must be a positive number",
    }),
  price: z
    .string()
    .min(1, "Price is required")
    .refine((v) => !isNaN(Number(v)) && Number(v) >= 0, {
      message: "Price must be a non-negative number",
    }),
  gallery: z.array(ImageSchema).optional(),
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
export type RoomTypeEnum = z.infer<typeof RoomTypeEnumSchema>;
