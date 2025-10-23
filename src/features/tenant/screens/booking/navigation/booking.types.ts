export type TenantBookingStackParamList = {
  BoardingHouseLists: undefined;
  BoardingHouseDetails: {
    id: number | null;
    fromMaps?: boolean;
    [key: string]: any; // allow extra params if needed
  };
  RoomsBookingScreen: undefined;
  RoomsDetailsScreen: {
    boardingHouseId: number | undefined;
    roomId: number | undefined;
    fromMaps?: boolean;
    [key: string]: any; // allow extra params if needed
  };
  RoomsCheckoutScreen: undefined;
};

export const TenantBookingStackParamListArrayName = [
  "BoardingHouseLists",
  "BoardingHouseDetails",
  "RoomsBookingScreen",
  "RoomsDetailsScreen",
  "RoomsCheckoutScreen",
];
