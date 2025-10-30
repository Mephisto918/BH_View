  export type OwnerDashboardStackParamList = {
    DashboardScreen: undefined;
    BoardingHouseDetailsScreen: {
      id: number | null;
      fromMaps?: boolean;
      [key: string]: any; // allow extra params if needed
    };
    RoomsBookingListsScreen: {
      paramsId: number;
    };
    RoomsDetailsScreen: {
      boardingHouseId: number | undefined;
      roomId: number | undefined;
      fromMaps?: boolean;
      [key: string]: any; // allow extra params if needed
    };
    RoomsCheckoutScreen: undefined;
  };