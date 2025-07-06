import { UserRole } from "../types/user.types";

export interface AuthUser {
  id: number | null;
  username: string;
  email: string;
  role: UserRole;
  isActive: boolean;
  isVerified: boolean;
}

export interface AuthState {
  token: string | null;
  userData: AuthUser | null;
}

export interface LoginResults {
  access_token: string;
  user: AuthUser;
}