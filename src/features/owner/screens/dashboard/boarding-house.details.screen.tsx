import { View, Text } from "react-native";
import React from "react";

import BoardingHouseDetailsScreenComponent from "../components/boarding-house.details";
import { RouteProp, useRoute } from "@react-navigation/native";
import { OwnerDashboardStackParamList } from "./navigation/dashboard.types";
import FullScreenErrorModal from "@/components/ui/FullScreenErrorModal";
import StaticScreenWrapper from "@/components/layout/StaticScreenWrapper";

type RouteProps = RouteProp<
  OwnerDashboardStackParamList,
  "BoardingHouseDetailsScreen"
>;

export default function BoardingHouseDetailsScreen() {
  const route = useRoute<RouteProps>();
  const { id: bhId } = route.params;

  if (!bhId)
    return (
      <FullScreenErrorModal message="Boarding House Not Found!"></FullScreenErrorModal>
    );

  //!
  return (
    <StaticScreenWrapper
    >
      <BoardingHouseDetailsScreenComponent
        bhID={bhId}
      ></BoardingHouseDetailsScreenComponent>
    </StaticScreenWrapper>
  );
}
