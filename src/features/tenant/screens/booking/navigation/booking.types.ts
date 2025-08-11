export type TenantBookingStackParamList = {
  BoardingHouseLists: undefined;
  BoardingHouseDetails: {
    id: number | null;
    fromMaps?: boolean;
    [key: string]: any; // allow extra params if needed
  };
};

export const TenantBookingStackParamListArrayName = [
  "BoardingHouseLists",
  "BoardingHouseDetails",
];
