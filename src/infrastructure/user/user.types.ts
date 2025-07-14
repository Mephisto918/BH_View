export interface BaseUser {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  role?: UserRole; // Assuming your UserRole enum resolves like this
  isActive?: boolean;
  isVerified?: boolean;
  createdAt?: string; // Prisma will return ISO string
  updatedAt?: string;
  age: number;
  address: string;
  phone_number: string;
}

export enum UserRole {
  TENANT = "TENANT",
  OWNER = "OWNER",
  ADMIN = "ADMIN",
  GUEST = "GUEST",
}

export const roleToSliceMap = {
  TENANT: "tenants",
  OWNER: "owners",
  ADMIN: "admins",
  GUEST: "GUEST",
} as const;
