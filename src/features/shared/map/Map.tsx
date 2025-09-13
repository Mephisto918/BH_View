import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import {
  MapView,
  Camera,
  UserLocation,
  MarkerView,
} from "@maplibre/maplibre-react-native";
import { BoardingHouse } from "@/infrastructure/boarding-houses/boarding-house.schema-improved";
import { Text, View } from "@gluestack-ui/themed";
import * as Location from "expo-location"; // ✅ import Location

const DEFAULT_COORDS: [number, number] = [124.6095, 11.0008519]; // [lng, lat]

interface MapProps {
  data: BoardingHouse[];
  isBoardingHousesLoading?: boolean;
}

export default function Map({ data, isBoardingHousesLoading }: MapProps) {
  // Request location permission on mount
  const [locationGranted, setLocationGranted] = React.useState(false);
  const [errorMsg, setErrorMsg] = React.useState<string | null>(null);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setLocationGranted(status === "granted");
    };
    requestPermission();
  }, []);

  useEffect(() => {
    if (errorMsg) {
      console.log(errorMsg);
    }
  }, [errorMsg]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        mapStyle="https://tiles.openfreemap.org/styles/liberty"
        logoEnabled={false}
        attributionEnabled={true}
      >
        {/* Center + zoom */}
        <Camera
          centerCoordinate={DEFAULT_COORDS}
          zoomLevel={14}
          animationDuration={0}
        />

        {/* Show user location, causes some `Index: 2, Size: 1` error */}
        {/* {locationGranted ? (
          <UserLocation visible={true} />
        ) : (
          <Text style={styles.errorText}>
            {errorMsg || "Location unavailable"}
          </Text>
        )} */}
        {locationGranted && <UserLocation visible={true} />}

        {/* Markers */}
        {!isBoardingHousesLoading &&
          (data ?? []).map((house: BoardingHouse, i) => {
            const location = house.location;
            if (
              !location ||
              !location.coordinates ||
              location.coordinates.length !== 2
            )
              return null;

            const [lng, lat] = location.coordinates;
            console.log('long, lat', lng, lat);

            return (
              <MarkerView key={i} coordinate={[lng, lat]}>
                <View
                  style={{
                    backgroundColor: "white",
                    paddingHorizontal: 8,
                    paddingVertical: 4,
                    borderRadius: 6,
                    borderWidth: 1,
                    borderColor: "gray",
                    flexShrink: 0, // important
                    minWidth: 50, // give enough space
                  }}
                >
                  <Text style={{ fontSize: 12 }}>{house.name}</Text>
                  <Text style={{ fontSize: 12 }}>{house.description}</Text>
                  <Text style={{ fontSize: 12 }}>{house.ownerId}</Text>
                  <Text style={{ fontSize: 12 }}>{house.amenities}</Text>
                </View>
              </MarkerView>
            );
          })}

        {/* Example marker */}
        {/* <MarkerView coordinate={[124.6095, 11.0008519]}>
          <View
            style={{
              backgroundColor: "red",
              padding: 0,
              borderRadius: 0,
              borderWidth: 0,
              borderColor: "gray",
            }}
          >
            <Text style={{ fontSize: 12 }}>ABC</Text>
          </View>
        </MarkerView> */}
      </MapView>
      <View style={styles.attributionContainer}>
        <Text style={styles.attributionText}>
          ©{" "}
          <Text
            style={{ color: "blue" }}
            onPress={() =>
              Linking.openURL("https://www.openstreetmap.org/copyright")
            }
          >
            OpenStreetMap
          </Text>{" "}
          contributors
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  markerContainer: {
    backgroundColor: "red",
    padding: 4,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "gray",
  },
  // markerText: {
  //   fontSize: 12,
  // },
  errorText: {
    position: "absolute",
    top: 10,
    alignSelf: "center",
    color: "red",
    fontSize: 14,
  },
  attributionContainer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 4,
    borderRadius: 4,
  },
  attributionText: {
    fontSize: 10,
  },
});
