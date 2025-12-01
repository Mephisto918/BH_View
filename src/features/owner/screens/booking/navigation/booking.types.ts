export type OwnerBookingStackParamList = {
  PropertiesDetailsScreen: {
    bookId: number | null;
    [key: string]: any; // allow extra params if needed
  };
  PropertiesBookingListsScreen: {
    bhId: number | null;
    [key: string]: any; // allow extra params if needed
  };
  PropertiesBookingMainScreen: undefined;
};

export const OwnerBookingStackParamListArrayName = [
  "BoardingHouseLists",
  "BoardingHouseDetails",
];
