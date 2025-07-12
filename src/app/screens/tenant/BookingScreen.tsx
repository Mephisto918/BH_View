import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Spacing, GlobalStyle, Fontsize } from "@/constants";

// ui components
import ImageCarousel from "@/components/ui/ImageCarousel";
import Button from "@/components/ui/Button";

// laytou
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";

// redux
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { HStack, VStack } from "@gluestack-ui/themed";

const Booking = () => {
  const boardingHouseData = useSelector(
    (state: RootState) => state.boardingHouses.selectedBoardingHouse
  );

  return (
    <StaticScreenWrapper>
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
              }}
            >
              <ImageCarousel
                variant="primary"
                images={boardingHouseData?.images ?? []}
              />
            </View>
            {boardingHouseData && (
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
                    <Text style={[s.text_title]}>
                      {boardingHouseData?.name}
                    </Text>
                    <Text style={[s.text_address]}>
                      {boardingHouseData?.address}
                    </Text>
                  </VStack>
                  <Button
                    containerStyle={{
                      width: "20%",
                      marginTop: 10,
                      marginRight: 0,
                    }}
                  >
                    <Text>Book Now</Text>
                  </Button>
                </HStack>
                <Text style={[s.text_description]}>
                  {boardingHouseData?.description}
                </Text>
                <VStack>
                  <Text style={[s.text_generic_large]}>Additional Information:</Text>
                  <VStack>
                    <Text style={[s.text_generic_medium]}>
                      Price: {boardingHouseData?.price}
                    </Text>
                    <View style={[s.text_generic_medium]}>
                      {boardingHouseData?.amenities?.map((key, index) => (
                        <Text key={index} style={[s.text_generic_medium]}>
                          {boardingHouseData.amenities[index]}
                        </Text>
                      ))}
                    </View>
                    {boardingHouseData?.properties &&
                      Object.entries(boardingHouseData.properties).map(
                        ([key, value], index) => (
                          <Text key={index} style={[s.text_generic_medium]}>
                            {key.replace(/_/g, " ")}: {String(value)}
                          </Text>
                        )
                      )}
                  </VStack>
                </VStack>
              </View>
            )}
          </View>
        </View>
      </View>
    </StaticScreenWrapper>
  );
};

const s = StyleSheet.create({
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

export default Booking;
