import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import type { RouteProp } from "@react-navigation/native";
import { backButtonConfig } from "@/constants/navigation/screenOptions";
import DashboardBookmarksScreen from "../dashboard.bookmarks.screen";

type TenantBookingStackParamList = {
  DashboardBookmarksScreen: undefined;
};

// export type

const Stack = createNativeStackNavigator<TenantBookingStackParamList>();

export default function DashboardStack() {
  return (
    <Stack.Navigator
      initialRouteName="DashboardBookmarksScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="DashboardBookmarksScreen"
        component={DashboardBookmarksScreen}
        // options={backButtonConfig}
      />
    </Stack.Navigator>
  );
}
