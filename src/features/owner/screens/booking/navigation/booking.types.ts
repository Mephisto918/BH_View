export type OwnerBookingStackParamList = {
  PropertiesDetailsScreen: {
    bookId: number | null;
    [key: string]: any; // allow extra params if needed
  };
  PropertiesBookingListsScreen: {
    bhId: number | null;
    [key: string]: any; // allow extra params if needed
  };
  PropertiesListScreen: undefined;
};

export const OwnerBookingStackParamListArrayName = [
  "BoardingHouseLists",
  "BoardingHouseDetails",
];
