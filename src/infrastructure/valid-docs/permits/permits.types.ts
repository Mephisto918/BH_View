import { z } from "zod";

export enum PermitEnum {
  BIR = "BIR",
  FIRE_CERTIFICATE = "FIRE_CERTIFICATE",
  MAYORS_PERMIT = "MAYORS_PERMIT",
  DTI = "DTI",
  BUSINESS_PERMIT = "BUSINESS_PERMIT",
  SANITARY_PERMIT = "SANITARY_PERMIT",
  SEC = "SEC",
}

export enum FileFormat {
  PDF = "PDF",
  IMAGE = "IMAGE",
  VIDEO = "VIDEO",
  AUDIO = "AUDIO",
  OTHER = "OTHER",
}

export enum PermitStatus {
  PENDING = "PENDING",
  VERIFIED = "VERIFIED",
  APPROVED = "APPROVED",
  REJECTED = "REJECTED",
}

export const GetPermitSchema = z.object({
  id: z.number(),
  ownerId: z.number(),
  fileFormat: z.nativeEnum(FileFormat),
  type: z.nativeEnum(PermitEnum),
  url: z.string().url(),
  expiresAt: z.string().datetime(),
  status: z.nativeEnum(PermitStatus),
  verifiedById: z.number().nullable(),
  verifiedAt: z.string().datetime().nullable(),
  approvedAt: z.string().datetime().nullable(),
  isDeleted: z.boolean(),
  deletedAt: z.string().datetime().nullable(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
  owner: z
    .object({
      firstname: z.string().nullable(),
      lastname: z.string().nullable(),
    })
    .optional(),
});

export type GetPermit = z.infer<typeof GetPermitSchema>;

export const GetPermitVerificationStatusSchema = z.object({
  verified: z.boolean(),
  missingPermits: z.array(z.nativeEnum(PermitEnum)),
  permits: z.array(
    z.object({
      id: z.number(),
      type: z.nativeEnum(PermitEnum),
      status: z.nativeEnum(PermitStatus),
      expiresAt: z.string().datetime(),
      fileFormat: z.nativeEnum(FileFormat),
    })
  ),
});

export type GetPermitVerificationStatus = z.infer<
  typeof GetPermitVerificationStatusSchema
>;

export const CreatePermitSchema = z.object({
  ownerId: z.number().int(),
  fileFormat: z.nativeEnum(FileFormat).optional(),
  type: z.nativeEnum(PermitEnum),
  url: z.string().url().optional(),
  expiresAt: z.string().datetime(), // keep as string to align with ISO 8601
});

export type CreatePermit = z.infer<typeof CreatePermitSchema>;

export const UpdatePermitSchema = z.object({
  fileFormat: z.nativeEnum(FileFormat).optional(),
  type: z.nativeEnum(PermitEnum).optional(),
  url: z.string().url().optional(),
  expiresAt: z.string().datetime().optional(),
});

export type UpdatePermit = z.infer<typeof UpdatePermitSchema>;
