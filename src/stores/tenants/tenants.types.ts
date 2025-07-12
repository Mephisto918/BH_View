import { BaseUser, UserRole } from "../types/user.types";
import { Booking } from "../boarding-houses/boarding-houses.types";

export interface Tenant extends BaseUser{
  role?: UserRole.TENANT;
  bookings?: Array<Booking>;
  guardian?: string | null;
}

export interface TenantState {
  selectedUser: Tenant | null;
  filter: string | null;
  loading: boolean;
  error: string | null;
}