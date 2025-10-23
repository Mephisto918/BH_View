import { mockBoardingHouses } from "../../../../../tests/boardingHouseMock";

export interface MockBookingRequest {
  id: number;
  boardingHouseId: number;
  roomId: number;
  userId: number;
  userName: string;
  checkIn: string;
  checkOut: string;
  totalPrice: number;
  status:
    | "PENDING"
    | "AWAITING_PAYMENT"
    | "CONFIRMED"
    | "COMPLETED"
    | "DECLINED";
  createdAt: string;
}

export const mockBookingRequests: MockBookingRequest[] = [
  // 🏠 Sunset Haven (BH ID: 1)
  {
    id: 1,
    boardingHouseId: mockBoardingHouses[0].id,
    roomId: mockBoardingHouses[0].rooms[0].id, // A101
    userId: 501,
    userName: "John Doe",
    checkIn: "2025-12-01T14:00:00Z",
    checkOut: "2025-12-05T11:00:00Z",
    totalPrice: 10000,
    status: "PENDING",
    createdAt: "2025-11-10T10:00:00Z",
  },
  {
    id: 2,
    boardingHouseId: mockBoardingHouses[0].id,
    roomId: mockBoardingHouses[0].rooms[1].id, // A102
    userId: 502,
    userName: "Jane Smith",
    checkIn: "2025-11-20T15:00:00Z",
    checkOut: "2025-11-23T11:00:00Z",
    totalPrice: 12000,
    status: "AWAITING_PAYMENT",
    createdAt: "2025-11-09T09:00:00Z",
  },
  {
    id: 3,
    boardingHouseId: mockBoardingHouses[0].id,
    roomId: mockBoardingHouses[0].rooms[1].id,
    userId: 503,
    userName: "Chris Evans",
    checkIn: "2025-12-10T14:00:00Z",
    checkOut: "2025-12-15T11:00:00Z",
    totalPrice: 20000,
    status: "CONFIRMED",
    createdAt: "2025-11-14T13:00:00Z",
  },

  // 🏙️ Cityscape Lodge (BH ID: 2)
  {
    id: 4,
    boardingHouseId: mockBoardingHouses[1].id,
    roomId: mockBoardingHouses[1].rooms[0].id, // B201
    userId: 504,
    userName: "Maria Garcia",
    checkIn: "2025-12-05T12:00:00Z",
    checkOut: "2025-12-06T12:00:00Z",
    totalPrice: 1800,
    status: "PENDING",
    createdAt: "2025-11-25T09:00:00Z",
  },
  {
    id: 5,
    boardingHouseId: mockBoardingHouses[1].id,
    roomId: mockBoardingHouses[1].rooms[1].id, // B202
    userId: 505,
    userName: "Liam Johnson",
    checkIn: "2025-12-07T15:00:00Z",
    checkOut: "2025-12-10T11:00:00Z",
    totalPrice: 7800,
    status: "CONFIRMED",
    createdAt: "2025-11-22T10:00:00Z",
  },

  // 🌲 Mountain Breeze (BH ID: 3)
  {
    id: 6,
    boardingHouseId: mockBoardingHouses[2].id,
    roomId: mockBoardingHouses[2].rooms[0].id, // C301
    userId: 506,
    userName: "Sophie Turner",
    checkIn: "2025-12-12T13:00:00Z",
    checkOut: "2025-12-15T11:00:00Z",
    totalPrice: 9600,
    status: "DECLINED",
    createdAt: "2025-11-27T14:00:00Z",
  },
  {
    id: 7,
    boardingHouseId: mockBoardingHouses[2].id,
    roomId: mockBoardingHouses[2].rooms[0].id,
    userId: 507,
    userName: "Peter Parker",
    checkIn: "2025-12-18T14:00:00Z",
    checkOut: "2025-12-20T11:00:00Z",
    totalPrice: 6400,
    status: "PENDING",
    createdAt: "2025-11-29T11:00:00Z",
  },
];
