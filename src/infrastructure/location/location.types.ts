export interface Location {
  id: number;
  province?: string;
  city?: string;
  country?: string;
  isDeleted: boolean;
  deletedAt: Date | null;
  coordinates: LocationCoordinates[];
}

export interface LocationCoordinates {
  type: GeometryType;
  coordinates: [number, number]; // [longitude, latitude]
}

export enum GeometryType {
  Point = "Point",
  LineString = "LineString",
  Polygon = "Polygon",
}
