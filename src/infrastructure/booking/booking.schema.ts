import { z } from "zod";
import { GetTenantSchema } from "../tenants/tenant.types";
import { ImageUploadSchema } from "../image/image.schema";
import { GetRoomSchema } from "../room/rooms.schema";

// BookingType enum
export const BookingTypeEnum = z.enum([
  "RESERVATION",
  "SOLO",
  "DUO",
  "TRIO",
  "SQUAD",
  "FAMILY",
]);

// BookingStatus enum
export const BookingStatusEnum = z.enum([
  "PENDING", //🟡 Tenant requested booking
  "AWAITING_PAYMENT", //🟠 Owner approved, waiting for tenant to upload proof
  "PAYMENT_VERIFIED",
  "CONFIRMED", //🟢 Owner confirmed after proof of payment
  "CANCELLED", //🔴
  "COMPLETED", //⚫
  "REJECTED",
]);

// PaymentStatus enum
export const PaymentStatusEnum = z.enum([
  "NONE",
  "PENDING", // tenant uploaded proof
  "REJECTED",
  "VERIFIED",
  "FAILED",
]);

export const bookingSchema = z.object({
  id: z.number(),
  reference: z.string(),
  tenantId: z.number(),
  roomId: z.number(),
  room: GetRoomSchema.pick({
    roomNumber: true,
  }),
  bookingType: BookingTypeEnum,
  dateBooked: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  checkInDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  checkOutDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  status: BookingStatusEnum,
  paymentStatus: PaymentStatusEnum,
  paymentProofUrl: z.string().optional(),
  totalAmount: z.string().optional(), // decimal represented as string in frontend
  currency: z.string().optional(),
  ownerMessage: z.string().optional(),
  tenantMessage: z.string().optional(),
  expiresAt: z
    .string()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date",
    })
    .optional(),
  createdAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  updatedAt: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  isDeleted: z.boolean(),
  deletedAt: z
    .string()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date",
    })
    .optional(),
});

// Base schema for a Booking entity
export const BaseBookingSchema = bookingSchema; // reuse the schema you already have

// For query / find one endpoints
export const GetBookingSchema = BaseBookingSchema.pick({
  id: true,
  reference: true,
  tenantId: true,
  roomId: true,
  bookingType: true,
  checkInDate: true,
  checkOutDate: true,
  status: true,
  paymentStatus: true,
  totalAmount: true,
  currency: true,
  createdAt: true,
  updatedAt: true,
  ownerMessage: true,
  tenantMessage: true,
  paymentProofUrl: true,
}).extend({
  tenant: GetTenantSchema.optional(), // include full tenant schema
});
export type GetBooking = z.infer<typeof GetBookingSchema>;

// query
export const QueryBookingSchema = z.object({
  tenantId: z.number().optional(),
  roomId: z.number().optional(),
  boardingHouseId: z.number().optional(),
  status: BookingStatusEnum.optional(),
  paymentStatus: PaymentStatusEnum.optional(),
  bookingType: BookingTypeEnum.optional(),
  fromCheckIn: z.string().optional(),
  toCheckIn: z.string().optional(),
  page: z.number().optional().default(1),
  offset: z.number().optional().default(10),
});
export type QueryBooking = z.infer<typeof QueryBookingSchema>;

//* Create Booking DTO
export const createBookingSchema = z.object({
  tenantId: z.number(),
  startDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  endDate: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date" }),
  note: z.string().optional(),
});
export const CreateBookingInputSchema = createBookingSchema;
export type CreateBookingInput = z.infer<typeof CreateBookingInputSchema>;

//* Patch Tenant Booking DTO
export const patchTenantBookingSchema = z.object({
  tenantId: z.number(),
  newStartDate: z
    .string()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date",
    })
    .optional(),
  newEndDate: z
    .string()
    .refine((val) => !val || !isNaN(Date.parse(val)), {
      message: "Invalid date",
    })
    .optional(),
  cancelReason: z.string().optional(),
});
export const PatchTenantBookingInputSchema = patchTenantBookingSchema;
export type PatchTenantBookingInput = z.infer<
  typeof PatchTenantBookingInputSchema
>;

//* Approve Booking
export const patchApproveBookingSchema = z.object({
  ownerId: z.number(),
  message: z.string().optional(),
});
export const PatchApproveBookingInputSchema = patchApproveBookingSchema;
export type PatchApproveBookingInput = z.infer<
  typeof PatchApproveBookingInputSchema
>;

//* Reject Booking
export const patchRejectBookingSchema = z.object({
  ownerId: z.number(),
  reason: z.string(),
});
export const PatchRejectBookingInputSchema = patchRejectBookingSchema;
export type PatchRejectBookingInput = z.infer<
  typeof PatchRejectBookingInputSchema
>;

//* Create Payment Proof
export const createPaymentProofSchema = z.object({
  tenantId: z.number(),
  note: z.string().optional(),
  paymentImage: ImageUploadSchema,
});
export const CreatePaymentProofInputSchema = createPaymentProofSchema;
export type CreatePaymentProofInput = z.infer<
  typeof CreatePaymentProofInputSchema
>;

//* Verify Payment
export const patchVerifyPaymentSchema = z.object({
  ownerId: z.number(),
  remarks: z.string().optional(),
  newStatus: BookingStatusEnum.optional(),
});
export const PatchVerifyPaymentInputSchema = patchVerifyPaymentSchema;
export type PatchVerifyPaymentInput = z.infer<
  typeof PatchVerifyPaymentInputSchema
>;

//* Cancel Booking
export const cancelBookingSchema = z.object({
  userId: z.number(),
  role: z.enum(["TENANT", "OWNER"]),
  reason: z.string().optional(),
});
export const CancelBookingInputSchema = cancelBookingSchema;
export type CancelBookingInput = z.infer<typeof CancelBookingInputSchema>;
