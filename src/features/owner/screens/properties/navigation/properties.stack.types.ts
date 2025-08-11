interface LocationShapeInParams {
  latitude: number;
  longitude: number;
}

export type PropertiesStackParamList = {
  PropertiesHome: undefined;
  PropertyCreate: undefined;
  PropertyLocationPicker: { onSelect: (coords: LocationShapeInParams) => void };
};

export const PropertiesStackParamListArrayName = [
  "PropertiesHome",
  "PropertyCreate",
  "PropertyLocationPicker",
];
