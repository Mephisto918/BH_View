import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BoardingHouseDetailsScreen from "../boarding-house.details.screen";
import DashboardMainScreen from "../dashboard.main.screen";
import { backButtonConfig } from "@/constants/navigation/screenOptions";

const Stack = createNativeStackNavigator();

export default function DashboardStack() {
  return (
    <Stack.Navigator
      initialRouteName="DashboardMainScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="DashboardMainScreen"
        component={DashboardMainScreen}
      />
      <Stack.Screen
        name="BoardingHouseDetailsScreen"
        options={backButtonConfig}
        component={BoardingHouseDetailsScreen}
      />
    </Stack.Navigator>
  );
}
