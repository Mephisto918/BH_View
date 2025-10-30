import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import PropertiesDetailsScreen from "../details/properties.details.screen";
import PropertiesBookingListsScreen from "../properties.booking.lists.screen";
import PropertiesListScreen from "../properties.lists.screen";
import { backButtonConfig } from "@/constants/navigation/screenOptions";

const Stack = createNativeStackNavigator();

export default function BookingStack() {
  return (
    <Stack.Navigator
      initialRouteName="PropertiesListScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="PropertiesListScreen"
        component={PropertiesListScreen}
        // options={backButtonConfig}
      />
      <Stack.Screen
        name="PropertiesDetailsScreen"
        component={PropertiesDetailsScreen}
        options={backButtonConfig}
      />
      <Stack.Screen
        name="PropertiesBookingListsScreen"
        component={PropertiesBookingListsScreen}
        options={backButtonConfig}
      />
    </Stack.Navigator>
  );
}
