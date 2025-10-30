import { CreateRoom, CreateRoomInput } from "@/infrastructure/room/rooms.schema";

export type PropertiesRoomCreateProps = {
  rooms: CreateRoomInput[];
  setRooms: (rooms: CreateRoomInput[]) => void;
};
