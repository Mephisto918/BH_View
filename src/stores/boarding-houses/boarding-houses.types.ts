import { ImageType, ImageQuality } from "@/services/image/types/image.types";
import { Location } from "../location/location.types";

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
  location: Location;
  properties: Array<string>;
  createdAt: string;
  updatedAt: string;
  bookings: Array<Booking>;
  boardingHouseImage: Array<BoardingHouseImage>;
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

export interface BoardingHousesIdList {
  id: number
}