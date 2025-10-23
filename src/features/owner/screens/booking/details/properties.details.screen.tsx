import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import {
  Colors,
  Spacing,
  GlobalStyle,
  Fontsize,
  BorderRadius,
} from "@/constants";
import { useRoute, RouteProp } from "@react-navigation/native";
import { useNavigationState } from "@react-navigation/native";

// ui components
import ImageCarousel from "@/components/ui/ImageCarousel";
import Button from "@/components/ui/Button";

// laytou
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";

// redux
import { HStack, VStack } from "@gluestack-ui/themed";

import { useGetOneQuery as useGetOneBoardingHouses } from "@/infrastructure/boarding-houses/boarding-house.redux.api";
import { OwnerBookingStackParamList } from "../navigation/booking.types";

// type Props = NativeStackScreenProps<TenantTabsParamList, "Booking">;
type RouteProps = RouteProp<OwnerBookingStackParamList, "BoardingHouseDetails">;

const FullScreenLoader = () => (
  <View style={s.overlay}>
    <Text>Bro is Loading</Text>
  </View>
  //  <Overlay isOpen={true}>
  //   <Spinner size="large" color="$white" />
  // </Overlay>
);

export default function PropertiesDetailsScreen({ navigation }) {
  // const navigateToDetails =
  //   useNavigation<NativeStackNavigationProp<TenantBookingStackParamList>>();
  const route = useRoute<RouteProps>();
  const { id: paramsId, fromMaps } = route.params;

  const {
    data: boardinghouse,
    isLoading: isBoardingHouseLoading,
    isError: isBoardingHouseError,
  } = useGetOneBoardingHouses(paramsId);

  // Optional logging
  useEffect(() => {
    if (boardinghouse) {
      console.log("Boarding house id:", paramsId);
      console.log("Boarding house details", boardinghouse);
    }
  }, [boardinghouse]);

  return (
    <StaticScreenWrapper>
      {isBoardingHouseLoading && <FullScreenLoader />}
      <View style={[GlobalStyle.GlobalsContainer, s.main_container]}>
        <View style={[s.main_item]}>
          <View style={[s.group_main]}>
            <View
              style={{
                minHeight: 250,
                width: "100%",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                zIndex: 5,
                marginBottom: 10,
                // position: 'relative'
                gap: 10,
              }}
            >
              {boardinghouse && (
                <View
                  style={{
                    minHeight: 250,
                    width: "100%",
                    borderTopRightRadius: 10,
                    borderTopLeftRadius: 10,
                    zIndex: 5,
                    marginBottom: 10,
                    gap: 10,
                  }}
                >
                  <Image
                    source={
                      typeof boardinghouse.thumbnail?.[0] === "string" &&
                      boardinghouse.thumbnail[0]
                        ? { uri: boardinghouse.thumbnail[0] }
                        : require("../../../../../assets/housesSample/1.jpg")
                    }
                    style={{
                      margin: "auto",
                      width: "98%",
                      height: 200,
                      borderRadius: BorderRadius.md,
                    }}
                  />

                  <ImageCarousel
                    variant="primary"
                    images={boardinghouse?.gallery ?? []}
                  />
                </View>
              )}
            </View>
            {boardinghouse && (
              <View
                style={{
                  padding: 15,
                  flex: 1,
                  gap: 10,
                  width: "100%",
                }}
              >
                <HStack>
                  <Text style={[s.text_generic_small]}>* * * * *</Text>
                  <Text style={[s.text_generic_small]}>( 4.0 )</Text>
                </HStack>
                <HStack
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                  }}
                >
                  <VStack style={{ width: "75%" }}>
                    <Text style={[s.text_title]}>{boardinghouse?.name}</Text>
                    <Text style={[s.text_address]}>
                      {boardinghouse?.address}
                    </Text>
                  </VStack>
                  <Button
                    containerStyle={{
                      marginTop: 10,
                      marginRight: 0,
                      padding: 10,
                    }}
                  >
                    <Text>Book Now</Text>
                  </Button>
                </HStack>
                <Text style={[s.text_description]}>
                  {boardinghouse?.description}
                </Text>
                <VStack
                  style={{
                    backgroundColor: Colors.PrimaryLight[7],
                    padding: 10,
                    borderRadius: BorderRadius.md,
                  }}
                >
                  <Text style={[s.text_generic_large]}>
                    Additional Information:
                  </Text>
                  <VStack>
                    <Text style={[s.text_generic_medium]}>
                      Price: {boardinghouse?.price}
                    </Text>
                    <VStack
                      style={[
                        s.text_generic_medium,
                        {
                          gap: 5,
                          marginTop: 5,
                          flex: 1,
                        },
                      ]}
                    >
                      {boardinghouse?.amenities?.map((key, index) => (
                        <Text
                          key={index}
                          style={[
                            s.text_generic_medium,
                            {
                              backgroundColor: Colors.PrimaryLight[8],
                              padding: 5,
                              borderRadius: BorderRadius.md,
                            },
                          ]}
                        >
                          {key.replace(/([a-z])([A-Z])/g, "$1 $2")}
                        </Text>
                      ))}
                    </VStack>
                  </VStack>
                </VStack>
              </View>
            )}
          </View>
        </View>
      </View>
    </StaticScreenWrapper>
  );
}

const s = StyleSheet.create({
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)", // semi-transparent dark background
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000, // ensure it's above everything
  },
  main_container: {
    flex: 1,
  },
  main_item: {
    flex: 1,
    width: "100%",
  },

  group_main: {
    flex: 1,
    paddingTop: Spacing.md,
    paddingRight: Spacing.md,
    paddingLeft: Spacing.md,
    backgroundColor: Colors.PrimaryLight[8],
    flexDirection: "column",
    alignItems: "baseline",
  },

  text_title: {
    // borderColor: "red",
    // borderWidth: 3,
    color: Colors.TextInverse[1],
    fontSize: Fontsize.xxl,
    fontWeight: 900,
  },
  text_description: {
    fontSize: Fontsize.lg,
    padding: 5,
    color: Colors.TextInverse[2],
    // borderColor: "white",
    // borderWidth: 3,
  },
  text_ameneties: {
    borderColor: "green",
    borderWidth: 3,
    flexDirection: "column",
  },
  text_ameneties_items: {
    fontSize: Fontsize.lg,
    padding: 5,
    color: Colors.TextInverse[2],
  },
  text_address: {
    fontSize: Fontsize.sm,
    paddingTop: 5,
    color: Colors.TextInverse[2],

    // borderColor: "red",
    // borderWidth: 3,
  },
  text_price: {
    borderColor: "cyan",
    borderWidth: 3,
  },
  text_properties: {
    borderColor: "magenta",
    borderWidth: 3,
  },
  text_generic_small: {
    // borderColor: "magenta",
    // borderWidth: 3,
    fontSize: Fontsize.sm,
    padding: 0,
    color: Colors.TextInverse[1],
  },
  text_generic_medium: {
    // borderColor: "magenta",
    // borderWidth: 3,
    fontSize: Fontsize.md,
    padding: 0,
    color: Colors.TextInverse[1],
  },
  text_generic_large: {
    // borderColor: "green",
    // borderWidth: 3,
    fontSize: Fontsize.lg,
    padding: 0,
    color: Colors.TextInverse[1],
  },
});
