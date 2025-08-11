import { RoomTypeEnum } from "./room.schema";

export interface Room {
  boardingHouseId?: number;
  roomNumber?: string;
  maxCapacity?: number;
  currentCapacity?: number;
  price?: number;
  tags?: Array<string>;
  roomType?: RoomTypeEnum;
  availabilityStatus: boolean;
}
