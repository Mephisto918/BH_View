import { Location } from "../location/location.types";
import { Permit } from "../common/types/permits.types";

// export interface BoardingHouse {
//   id: number;
//   ownerId: number;
//   name: string;
//   address: string;
//   description: string;
//   price: number;
//   amenities: Array<string>;
//   availabilityStatus: boolean;
//   locationId: number;
//   location: Location;
//   properties: Array<string>;
//   createdAt: string;
//   updatedAt: string;
//   bookings: Array<Booking>;
//   boardingHouseImage: Array<BoardingHouseImage>;
//   permits: Array<Permit>;
// }

export interface BoardingHousesState {
  boardingHouses: Array<BoardingHouse>;
  selectedBoardingHouse: BoardingHouse | null;
  isLoading: boolean;
  error: string | null;
}

export interface BoardingHousesIdList {
  id: number;
}
