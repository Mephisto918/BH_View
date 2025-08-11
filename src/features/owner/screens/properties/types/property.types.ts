import { CreateRoomInput } from "@/infrastructure/room/room.schema";

export type PropertiesRoomCreateProps = {
  rooms: CreateRoomInput[];
  setRooms: (rooms: CreateRoomInput[]) => void;
};
