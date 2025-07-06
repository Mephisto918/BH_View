import { ImageType, ImageQuality } from "@/services/image/types/image.types";
/*
model BoardingHouse {
  id                 Int                  @id @default(autoincrement())
  ownerId            Int
  owner              Owner                @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  name               String
  address            String?
  description        String?
  price              Decimal?             @db.Decimal(10, 2)
  amenities          Json? // Typo fixed from 'ameneties'
  availabilityStatus Boolean              @default(true) // Consider using an Enum later if you want more states
  locationId         Int
  location           Location             @relation(fields: [locationId], references: [id])
  properties         Json
  createdAt          DateTime             @default(now())
  updatedAt          DateTime             @updatedAt
  bookings           Booking[]
  BoardingHouseImage BoardingHouseImage[]
}

 id              Int           @id @default(autoincrement())
  tenantId        Int
  boardingHouseId Int
  tenant          Tenant        @relation(fields: [tenantId], references: [id], onDelete: Restrict)
  boardingHouse   BoardingHouse @relation(fields: [boardingHouseId], references: [id], onDelete: Restrict)
  dateBooked      DateTime
  checkInDate     DateTime
  checkOutDate    DateTime
  status          BookingStatus @default(PENDING)
  createdAt       DateTime      @default(now())
  updatedAt       DateTime      @updatedAt
*/

export interface Booking {
  id: number;
  tenantId: number;
  boardingHouseId: number;
  tenant: string;
  boardingHouse: string;
  dateBooked: string;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface BoardingHouseLocation {
  latitude: number;
  longitude: number;
  region?: string;
  barangay?: string;
}

export interface BoardingHouse {
  id: number;
  owner_id: number;
  name: string;
  address: string;
  description: string;
  price: number;
  amenities: Array<string>;
  availability_status: boolean;
  locationId: number;
  location: BoardingHouseLocation;
  properties: Array<string>;
  createdAt: string;
  updatedAt: string;
  bookings: Array<Booking>;
  boardingHouseImage: Array<string>;
}

export interface BoardingHousesState {
  boardingHouses: Array<BoardingHouse>;
  selectedBoardingHouse: BoardingHouse | null;
  isLoading: boolean;
  error: string | null;
}

export interface BoardingHouseImage {
  id: number;
  boardingHouse: BoardingHouse;
  boardingHouseId: number;
  url: string;
  type: ImageType;
  quality: ImageQuality;
  createdAt: string;
}
