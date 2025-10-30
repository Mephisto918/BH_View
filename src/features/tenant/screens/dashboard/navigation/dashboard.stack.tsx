import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { RouteProp } from "@react-navigation/native";
import DashboardMainScreen from "../screens/dashboard.main.screen";
import { backButtonConfig } from "@/constants/navigation/screenOptions";
import DashboardBookingStack from "../screens/bookings/navigation/bookings.stack";

export type TenantDashboardStackParamList = {
  DashboardMainScreen: undefined;
  DashboardBookingStack: undefined;
  DashboardBookingRequestScreen: undefined;
  DashboardBookingHistoryScreen: undefined;
  DashboardBookmarksScreen: undefined;
};

// export type

const Stack = createNativeStackNavigator<TenantDashboardStackParamList>();

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
        // options={backButtonConfig}
      />
      <Stack.Screen
        name="DashboardBookingStack"
        component={DashboardBookingStack}
        // options={backButtonConfig}
      />
    </Stack.Navigator>
  );
}
