import { LocationCoordinates } from "./location.schema";

export interface Location {
  id: number;
  province?: string;
  city?: string;
  country?: string;
  isDeleted: boolean;
  deletedAt: Date | null;
  coordinates: LocationCoordinates[];
}

