import { View, Text, StyleSheet, Dimensions, Pressable } from "react-native";
import { Box, HStack } from "@gluestack-ui/themed";
import React, { useState } from "react";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";
import Button from "@/components/ui/Button";

import {
  Colors,
  Fontsize,
  GlobalStyle,
  Spacing,
  BorderRadius,
} from "@/constants";
import { VStack } from "@gluestack-ui/themed";

//redux
import { Ionicons } from "@expo/vector-icons";
import { Owner } from "@/infrastructure/owner/owner.types";
import { useGetAllQuery } from "@/infrastructure/boarding-houses/boarding-house.redux.api";
import { useDynamicUserApi } from "@/infrastructure/user/user.hooks";
import { useNavigation } from "@react-navigation/native";
import { OwnerDashboardStackParamList } from "./navigation/dashboard.types";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import ScreenHeaderComponent from "@/components/layout/ScreenHeaderComponent";
import HeaderSearch from "@/components/layout/HeaderSearch";
import PropertyCard from "./components/PropertyCard";

export default function DashboardMainScreen() {
  const navigate =
    useNavigation<NativeStackNavigationProp<OwnerDashboardStackParamList>>();
  const { selectedUser: data } = useDynamicUserApi();
  const user = data as Owner;

  const [isGrid, setIsGrid] = useState(false);

  const { selectedUser: userData } = useDynamicUserApi();
  const owner = userData as Owner;

  const {
    data: boardingHouses,
    isLoading: boardingHousesLoading,
    isError: boardingHousesError,
  } = useGetAllQuery({ ownerId: owner.id });

  const iconSize = 50;

  const handleGotoPress = (bhId: number) => {
    navigate.navigate("BoardingHouseDetailsScreen", { id: bhId });
  };
  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer, s.StaticScreenWrapper]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer]}
    >
      <VStack
        style={{
          gap: Spacing.lg,
        }}
      >
        <ScreenHeaderComponent text={{ textValue: "Dashboard" }} />
        <VStack style={[s.Widget]}>
          <Box style={[s.Widget_item]}>
            <Ionicons name="home" color="white" size={iconSize} />
            <Text style={[s.generic_text_lg]}>
              {user.boardingHouses.length ?? 0}
            </Text>
          </Box>
          <Box style={[s.Widget_item]}>
            <Ionicons name="people" color="white" size={iconSize} />
            <Text style={[s.generic_text_lg]}>{0}</Text>
          </Box>
          <Box style={[s.Widget_item]}>
            <Ionicons name="book" color="white" size={iconSize} />
            <Text style={[s.generic_text_lg]}>{0}</Text>
          </Box>
          <Box style={[s.Widget_item]}>
            <Ionicons name="server" color="white" size={iconSize} />
            <Text style={[s.generic_text_lg]}>{0}</Text>
          </Box>
        </VStack>

        <HStack
          style={{
            width: "100%",
            backgroundColor: Colors.PrimaryLight[6],
            borderColor: Colors.PrimaryLight[4],
            borderWidth: 1,
            borderRadius: BorderRadius.lg,
            justifyContent: "space-between",
            margin: 0,
            padding: 0,
          }}
        >
          <HeaderSearch
            value=""
            setValue={() => {}}
            containerStyle={{ flex: 1 }}
          />
          <Button
            onPressAction={() => setIsGrid(!isGrid)}
            containerStyle={{
              backgroundColor: Colors.PrimaryLight[9],
              aspectRatio: 1,
              height: 50,
              // width: 10,
              margin: Spacing.md,
              // margin: Spacing.md,
              borderWidth: 1,
              padding: 0,
              borderRadius: BorderRadius.lg,
            }}
          >
            <Ionicons
              name={isGrid ? "grid" : "reorder-four"}
              color="white"
              size={20}
            />
          </Button>
        </HStack>
        <VStack
          style={{
            gap: 10,
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            alignContent: "flex-start",
          }}
        >
          {boardingHousesLoading && <Text>Loading boarding houses...</Text>}
          {boardingHousesError && <Text>Failed to load boarding houses.</Text>}
          {!boardingHousesLoading &&
            !boardingHousesError &&
            (!boardingHouses || boardingHouses.length === 0) && (
              <Text style={{ color: "white", fontSize: Fontsize.xl }}>
                No boarding houses registered yet.
              </Text>
            )}
          {!boardingHousesLoading &&
            !boardingHousesError &&
            boardingHouses?.map((house) => (
              <Pressable
                onPress={() => handleGotoPress(house.id)}
                key={house.id}
                style={{
                  borderRadius: BorderRadius.md,
                  flexDirection: "column",
                  aspectRatio: 1,
                  height: 200,
                  padding: 10,
                  backgroundColor: Colors.PrimaryLight[9],
                  // backgroundColor: Colors.PrimaryLight[2],
                }}
              >
                <PropertyCard data={house} />
              </Pressable>
            ))}
        </VStack>
      </VStack>
    </StaticScreenWrapper>
  );
}

const s = StyleSheet.create({
  StaticScreenWrapper: {
    // backgroundColor: Colors.PrimaryLight[8],
    padding: 10,
  },
  Hero: {
    // borderColor: "red",
    // borderWidth: 3,
  },
  Hero_text1: {
    fontSize: Fontsize.h2,
    fontWeight: "bold",
    color: Colors.TextInverse[2],
  },
  Widget: {
    // borderColor: 'red',
    // borderWidth: 3
    gap: 10,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
  },
  Widget_item: {
    // borderColor: '',
    // borderWidth: 3,
    borderRadius: BorderRadius.md,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    padding: 20,
    // height: 50,
    // width: Dimensions.get("window").width / 2,
    width: "40%",
    backgroundColor: Colors.PrimaryLight[9],
  },

  generic_text_sm: {
    fontSize: Fontsize.sm,
    color: Colors.TextInverse[1],
  },
  generic_text_md: {
    fontSize: Fontsize.md,
    color: Colors.TextInverse[1],
  },
  generic_text_lg: {
    fontSize: Fontsize.lg,
    color: Colors.TextInverse[2],
  },
});
