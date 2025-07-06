/*
  id           Int
  username     String
  firstname    String
  lastname     String
  email        String
  password     String
  role         UserRole
  isActive     Boolean
  isVerified   Boolean
  createdAt    DateTime
  updatedAt    DateTime
  age          Int
  address      String
  phone_number String
*/

import { BaseUser, UserRole } from "../types/user.types";

export interface Admin extends BaseUser{
  role: UserRole.ADMIN;
}

export interface AdminState {
  selectedUser: Admin | null;
  filter: string;
  loading: boolean;
  error: string | null;
}
