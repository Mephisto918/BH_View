import { View, Text, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { Colors, Spacing, GlobalStyle } from "@/constants";

import { useRoute } from "@react-navigation/native";

// ui components
import ImageCarousel from "@/components/ui/ImageCarousel";

// laytou
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";

// types
import { useGetOneQuery } from "@/stores/boarding-houses/boarding-houses";

// redux
import { useSelector } from "react-redux";
import { RootState } from "@/stores";

const Booking = () => {
  const route = useRoute();
  const [id, setId] = useState<number | null>(null);

  useEffect(() => {
    if (route.params && route.params.id) {
      // console.log("Route param id received:", route.params.id);
      setId(route.params.id);
    }
  }, [route.params]);

  const boardingHouseData = useSelector(
    (state: RootState) => state.boardingHouses.selectedBoardingHouse
  );
  console.log("boardingHouseData", boardingHouseData);

  const { data, isLoading, isError } = useGetOneQuery(id, {
    skip: !id,
  });

  // if (isLoading) return <Text>Loading...</Text>;
  // if (isError) return <Text>Error loading boarding house</Text>;
  // if (!boardingHouseData) return <Text>No data found</Text>;

  return (
    <StaticScreenWrapper>
      <View style={[GlobalStyle.Globals, s.main_container]}>
        <View style={[s.main_item]}>
          <View style={[s.group_main]}>
            <View
              style={{
                minHeight: 300,
                width: "100%",
                borderTopRightRadius: 10,
                borderTopLeftRadius: 10,
                zIndex: 5,
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
                  // zIndex: -1,
                  marginTop: -10,
                  padding: 10,
                  flex: 1,
                  // borderColor: 'red',
                  // borderWidth: 10,
                  width: "100%",
                }}
              >
                <Text style={[s.text_title]}>{boardingHouseData?.name}</Text>
                <Text style={[s.text_description]}>
                  {boardingHouseData?.description}
                </Text>
                <Text style={[s.text_address]}>
                  {boardingHouseData?.address}
                </Text>
                <Text style={[s.text_price]}>
                  Price: {boardingHouseData?.price}
                </Text>
                <View style={[s.text_ameneties]}>
                  {boardingHouseData?.amenities?.map((key, index) => (
                    <Text key={index}>
                      Hello?
                      {boardingHouseData.amenities[index]}
                    </Text>
                  ))}
                </View>
                {boardingHouseData?.properties &&
                  Object.entries(boardingHouseData.properties).map(
                    ([key, value], index) => (
                      <Text key={index}>
                        {key.replace(/_/g, " ")}: {String(value)}
                      </Text>
                    )
                  )}
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
    borderColor: "red",
    borderWidth: 3,
  },
  text_description: {
    borderColor: "white",
    borderWidth: 3,
  },
  text_ameneties: {
    borderColor: "green",
    borderWidth: 3,
  },
  text_address: {
    borderColor: "orange",
    borderWidth: 3,
  },
  text_price: {
    borderColor: "cyan",
    borderWidth: 3,
  },
  text_properties: {
    borderColor: "magenta",
    borderWidth: 3,
  },
});

export default Booking;
