import { z } from "zod";

export const BaseBookingSchema = z.object({
  tenantId: z.number(),
  boardingHouseId: z.number(),
  tenant: z.string(), // Can be tenant name or ID reference string
  boardingHouse: z.string(), // Same for this — adjust as needed
  dateBooked: z.string(), // ISO 8601 string preferred
  checkInDate: z.string(),
  checkOutDate: z.string(),
  status: z.enum(["pending", "confirmed", "cancelled", "completed"]), // Optional enum enforcement
});

export const GetBookingSchema = BaseBookingSchema.extend({
  id: z.number(),
  createdAt: z.string(),
  updatedAt: z.string(),
});
export type GetBookingDto = z.infer<typeof GetBookingSchema>;


export const CreateBookingSchema = BaseBookingSchema;
export type CreateBookingDto = z.infer<typeof CreateBookingSchema>;
export const UpdateBookingSchema = BaseBookingSchema.partial();
export type UpdateBookingDto = z.infer<typeof UpdateBookingSchema>;
