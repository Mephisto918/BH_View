/*
  id             Int             @id @default(autoincrement())
  username       String          @unique
  firstname      String
  lastname       String
  email          String          @unique
  password       String
  role           UserRole        @default(OWNER)
  isActive       Boolean         @default(true)
  isVerified     Boolean         @default(false)
  createdAt      DateTime        @default(now())
  updatedAt      DateTime        @updatedAt
  age            Int             @default(0)
  address        String
  phone_number   String
  boardingHouses BoardingHouse[]
  permits        Permit[] // permit relation

  id        Int        @id @default(autoincrement())
  ownerId   Int
  type      PermitType
  fileUrl   String // Link to file or pathnp
  expiresAt DateTime
  owner     Owner      @relation(fields: [ownerId], references: [id])
*/

import { BaseUser, UserRole } from "../user/user.types";
import { BoardingHousesIdList } from "../boarding-houses/boarding-house.types";

export enum PermitEnum {
  BIR = "BIR", // Bureau of Internal Revenue
  FIRE_CERTIFICATE = "FIRE_CERTIFICATE", // Fire Certificate
  MAYORS_PERMIT = "MAYORS_PERMIT", // Mayor's Permit
  DTI = "DTI", // Department of Trade and Industry
  BUSINESS_PERMIT = "BUSINESS_PERMIT", // Business Permit
}

export interface Permit {
  id: number;
  ownerId: number;
  type: PermitEnum;
  fileUrl: string;
  expiresAt: Date;
  owner: Owner;
}

export interface Owner extends BaseUser {
  role?: UserRole.OWNER;
  boardingHouses?: Array<BoardingHousesIdList>;
  permits?: Array<Permit>;
}

export interface OwnerState {
  selectedUser: Owner | null;
  filter: string | null;
  loading: boolean;
  error: string | null;
}
