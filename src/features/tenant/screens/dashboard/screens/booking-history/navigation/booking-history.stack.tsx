import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DashboardBookingHistoryScreen from "../dashboard.booking-history.screen";

type TenantBookingHistoryStackParamList = {
  DashboardBookingHistoryScreen: undefined;
};

// export type

const Stack = createNativeStackNavigator<TenantBookingHistoryStackParamList>();

export default function DashboardStack() {
  return (
    <Stack.Navigator
      initialRouteName="DashboardBookingHistoryScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="DashboardBookingHistoryScreen"
        component={DashboardBookingHistoryScreen}
        // options={backButtonConfig}
      />
    </Stack.Navigator>
  );
}
