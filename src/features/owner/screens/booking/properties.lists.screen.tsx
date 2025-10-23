import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";
import { BorderRadius, Colors, Fontsize, GlobalStyle } from "@/constants";
import { Box, Image, Spinner, VStack } from "@gluestack-ui/themed";
import { useGetAllQuery as useGetAllBoardingHouses } from "@/infrastructure/boarding-houses/boarding-house.redux.api";
import {
  GetBoardingHouse,
  QueryBoardingHouse,
} from "@/infrastructure/boarding-houses/boarding-house.schema";
import { ScrollView } from "react-native-gesture-handler";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { OwnerTabsParamList } from "../../navigation/owner.tabs.type";
import { BoardingHouse } from "@/infrastructure/boarding-houses/boarding-house.schema";
import { mockBoardingHouses } from "@/tests/boardingHouseMock";

const FullScreenLoader = () => (
  <View style={styles.overlay}>
    <Spinner size="large" color="$white" />
  </View>
);

export default function PropertiesListScreen() {
  const navigation =
    useNavigation<BottomTabNavigationProp<OwnerTabsParamList>>();

  const [filters, setFilters] = useState<QueryBoardingHouse>({
    minPrice: 1500,
  });
  // const {
  //   data: boardinghouses,
  //   isLoading: isBoardingHousesLoading,
  //   isError: isBoardingHousesError,
  // } = useGetAllBoardingHouses(filters);
  const isBoardingHousesLoading = false;
  const [boardinghouses, setBoardinghouses] = useState<BoardingHouse[]>([]);

  useEffect(() => {
    setBoardinghouses(mockBoardingHouses);
  }, []);

  const handleGotoPress = (id: number) => {
    console.log("handleGotoPress", id);
    navigation.navigate("Books", {
      screen: "PropertiesBookingListsScreen",
      params: { id: id, fromMaps: true },
    });
  };
  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer]}
    >
      {isBoardingHousesLoading && <FullScreenLoader />}
      <VStack>
        <Box>
          <Text
            style={{
              color: Colors.TextInverse[2],
              fontWeight: "bold",
              fontSize: Fontsize.display1,
              marginBottom: 6,
              paddingLeft: 10,
              flexWrap: "wrap",
            }}
          >
            Bookings
          </Text>
        </Box>
        <ScrollView
          style={{ backgroundColor: Colors.PrimaryLight[8], flex: 1 }}
          contentContainerStyle={{
            flexDirection: "column",
            justifyContent: "flex-start",
            gap: 10, // optional, RN 0.71+
            padding: 10,
          }}
        >
          {boardinghouses &&
            boardinghouses.map((boardinghouse: BoardingHouse, index) => {
              // boardinghouses.map((boardinghouse: GetBoardingHouse, index) => {
              return (
                <VStack
                  key={index}
                  style={{
                    backgroundColor: Colors.PrimaryLight[9],
                    padding: 10,
                    borderRadius: BorderRadius.md,
                    gap: 10,
                    flexDirection: "row",
                  }}
                >
                  <Box>
                    <Image
                      source={
                        typeof boardinghouse.thumbnail?.[0] === "string" &&
                        boardinghouse.thumbnail[0]
                          ? { uri: boardinghouse.thumbnail[0] }
                          : require("../../../../assets/housesSample/1.jpg")
                      }
                      style={{
                        // width: 200,
                        height: 150,
                        aspectRatio: 4 / 3,
                        borderRadius: BorderRadius.md,
                      }}
                    />
                  </Box>
                  <VStack style={{ flex: 1 }}>
                    <VStack style={{ flex: 1 }}>
                      <Text
                        style={[styles.Item_Label]}
                        numberOfLines={1}
                        ellipsizeMode="tail"
                      >
                        {boardinghouse.name}
                      </Text>
                      <Text style={[styles.Item_SubLabel]}>
                        {boardinghouse.address}
                      </Text>
                    </VStack>
                    <VStack>
                      <Text style={[styles.Item_SubLabel]}>
                        {boardinghouse.capacity.currentCapacity}/
                        {boardinghouse.capacity.totalCapacity}
                      </Text>
                      <Pressable
                        onPress={() => handleGotoPress(boardinghouse.id)}
                        style={{
                          borderRadius: BorderRadius.sm,
                          padding: 8,
                          backgroundColor: Colors.PrimaryLight[6],
                          marginLeft: "auto",
                        }}
                      >
                        <View>
                          <Text style={[styles.Item_Normal]}>
                            View Booking Requests
                          </Text>
                        </View>
                      </Pressable>
                    </VStack>
                  </VStack>
                </VStack>
              );
            })}
        </ScrollView>
      </VStack>
    </StaticScreenWrapper>
  );
}

const styles = StyleSheet.create({
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
  generic_text: {
    color: Colors.TextInverse[2],
  },
  Item_Label: {
    color: Colors.TextInverse[2],
    fontWeight: "bold",
    fontSize: Fontsize.md,
    marginBottom: 6,
    flexWrap: "wrap",
    // flexShrink: 1,
  },
  Item_SubLabel: {
    color: Colors.TextInverse[2],
    fontWeight: "bold",
    fontSize: Fontsize.md,
    marginBottom: 6,
  },
  Item_Normal: {
    color: Colors.TextInverse[2],
    fontWeight: "bold",
    fontSize: Fontsize.sm,
  },
  Item_Input_Placeholder: {
    color: Colors.TextInverse[2],
    fontSize: Fontsize.sm,
  },
});
