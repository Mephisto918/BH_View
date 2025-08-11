import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";

import {
  Colors,
  Fontsize,
  GlobalStyle,
  Spacing,
  BorderRadius,
} from "@/constants";

import { VStack } from "@gluestack-ui/themed";
import { useDynamicUserApi } from "@/infrastructure/user/user.hooks";
import Ionicons from "react-native-vector-icons/Ionicons";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import { DEFAULT_REGION } from "@/app/config/map.config";

//* navigation
import { usePropertyNavigation } from "./navigation/properties.navigation.hooks";
import { useRoute } from "@react-navigation/native";

export default function PropertiesGetLocationScreen() {
  const route = useRoute();
  const propertyNavigation = usePropertyNavigation();
  const { onSelect } = route.params;

  const [location, setLocation] = useState<{
    latitude: number;
    longitude: number;
  }>({
    latitude: 0,
    longitude: 0,
  });

  const handleMapPress = (event: MapPressEvent) => {
    const { coordinate } = event.nativeEvent;
    setLocation({ ...coordinate });
  };

  const handleConfirmLocation = () => {
    if (location) {
      onSelect?.(location);
      propertyNavigation.goBack();
    }
  };

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer]}
    >
      <VStack
        style={{
          flex: 1,
        }}
      >
        <MapView
          style={[
            StyleSheet.absoluteFill,
            { flex: 1, borderRadius: 19, borderColor: "red" },
          ]}
          initialRegion={DEFAULT_REGION}
          showsUserLocation={true}
          showsMyLocationButton={true}
          provider="google"
          mapType="hybrid"
          onPress={handleMapPress}
        >
          {location && <Marker coordinate={location} />}
        </MapView>
        {location && (
          <View
            style={{
              position: "absolute",
              bottom: 50,
              left: 10,
              backgroundColor: "white",
              padding: 10,
            }}
          >
            <Text>Latitude: {location.latitude.toFixed(5)}</Text>
            <Text>Longitude: {location.longitude.toFixed(5)}</Text>
            <Pressable
              onPress={() => handleConfirmLocation()}
              style={{
                padding: 10,
                backgroundColor: Colors.PrimaryLight[8],
                borderRadius: BorderRadius.md,
              }}
            >
              <Text style={{ color: Colors.PrimaryLight[1] }}>
                Set Location
              </Text>
            </Pressable>
          </View>
        )}
      </VStack>
    </StaticScreenWrapper>
  );
}
