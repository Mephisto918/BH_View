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
import PropertyCard from "../../../../components/ui/BoardingHouseItems/PropertyCard";
import { Lists } from "@/components/layout/Lists/Lists";
import {
  BoardingHouse,
  GetBoardingHouse,
} from "@/infrastructure/boarding-houses/boarding-house.schema";
import Container from "@/components/layout/Container/Container";
import FullScreenErrorModal from "@/components/ui/FullScreenErrorModal";
import FullScreenLoaderAnimated from "@/components/ui/FullScreenLoaderAnimated";

export default function DashboardMainScreen() {
  const [refreshing, setRefreshing] = React.useState(false);

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
    refetch: refetchBoardingHouses,
  } = useGetAllQuery({ ownerId: owner.id });

  const iconSize = 25;

  const handleGotoPress = (bhId: number) => {
    navigate.navigate("BoardingHouseDetailsScreen", { id: bhId });
  };

  const handlePageRefresh = () => {
    setRefreshing(true);
    refetchBoardingHouses();
    setRefreshing(false);
  };
  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer, s.StaticScreenWrapper]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer]}
    >
      {boardingHousesError && <FullScreenErrorModal />}
      {boardingHousesLoading && <FullScreenLoaderAnimated />}
      <Container
        refreshing={refreshing}
        onRefresh={handlePageRefresh}
        contentContainerStyle={{
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
          {!boardingHousesLoading &&
            !boardingHousesError &&
            (!boardingHouses || boardingHouses.length === 0) && (
              <Text style={{ color: "white", fontSize: Fontsize.xl }}>
                No boarding houses registered yet.
              </Text>
            )}
          {boardingHouses && (
            <>
              <Lists
                list={boardingHouses}
                containerStyle={[
                  {
                    gap: Spacing.lg,
                  },
                ]}
                renderItem={({ item }) => (
                  <>
                    <PropertyCard data={item}>
                      <Pressable
                        onPress={() => handleGotoPress(item.id)}
                        style={{
                          paddingTop: Spacing.xs,
                          paddingBottom: Spacing.xs,
                          paddingLeft: Spacing.sm,
                          paddingRight: Spacing.sm,
                          borderWidth: 2,
                          borderColor: Colors.PrimaryLight[5],
                          borderRadius: BorderRadius.md,
                          backgroundColor: Colors.PrimaryLight[6],
                        }}
                      >
                        <Text style={{ color: "white" }}>Details</Text>
                      </Pressable>
                    </PropertyCard>
                  </>
                )}
              />
            </>
          )}
        </VStack>
      </Container>
    </StaticScreenWrapper>
  );
}

const s = StyleSheet.create({
  StaticScreenWrapper: {
    padding: 10,
  },
  Hero: {},
  Hero_text1: {
    fontSize: Fontsize.h2,
    fontWeight: "bold",
    color: Colors.TextInverse[2],
  },
  Widget: {
    // borderColor: 'red',
    // borderWidth: 3
    gap: Spacing.md,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignContent: "center",
  },
  Widget_item: {
    borderRadius: BorderRadius.md,
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    alignItems: "center",
    padding: 20,
    width: "20%",
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
