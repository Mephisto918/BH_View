import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { RouteProp } from "@react-navigation/native";
import DashboardBookingsScreen from "../dashboard.bookings.screen";
import DashboardBookingDetailsScreen from "../dashboard.booking.details.screen";
import { backButtonConfig } from "@/constants/navigation/screenOptions";

export type TenantDashboardBookingStackParamList = {
  DashboardBookingsScreen: undefined;
  DashboardBookingDetailsScreen: {
    bookId: number;
  };
};

// export type

const Stack =
  createNativeStackNavigator<TenantDashboardBookingStackParamList>();

export default function DashboardBookingStack() {
  return (
    <Stack.Navigator
      initialRouteName="DashboardBookingsScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="DashboardBookingsScreen"
        component={DashboardBookingsScreen}
        options={backButtonConfig}
      />
      <Stack.Screen
        name="DashboardBookingDetailsScreen"
        component={DashboardBookingDetailsScreen}
        options={backButtonConfig}
      />
    </Stack.Navigator>
  );
}
