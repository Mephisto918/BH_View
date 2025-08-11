export const AMENITIES = [
  "WiFi",
  "FreeParking",
  "AirConditioner",
  "SwimmingPool",
  "Laundry",
  "CCTV",
  "BreakfastIncluded",
  "Kitchenette",
  "HairDryer",
  "Toiletries",
  "MiniFridge",
  "CoffeeTeaMaker",
  "DeskWorkspace",
  "TV",
  "Heating",
  "Wardrobe",
  "Safe",
  "LuggageRack",
  "Iron",
  "PowerAdapters",
  "GymFitnessCenter",
  "PetFriendly",
  "AirportShuttle",
  "24HourReception",
] as const;

export const PROPERTY_TYPES = ["Private", "Shared", "Mixed"] as const;

export type Amenity = (typeof AMENITIES)[number];
export type PropertyType = (typeof PROPERTY_TYPES)[number];
