import { BaseUser, UserRole } from "../user/user.types";
import { Booking } from "../boarding-houses/boarding-house.types";

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