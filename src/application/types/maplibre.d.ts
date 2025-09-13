import { MapViewProps } from "@maplibre/maplibre-react-native";

declare module "@maplibre/maplibre-react-native" {
  interface MapViewProps {
    styleJSON?: string | object; // Allow styleJSON as string or object
  }
}
