import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BoardingHouseDetailsScreen from "../details/boarding-house.details.screen";
import BookingListsScreen from "../booking.lists.screen";
import { backButtonConfig } from "@/constants/navigation/screenOptions";

const Stack = createNativeStackNavigator();

export default function BookingStack() {
  return (
    <Stack.Navigator
      initialRouteName="BoardingHouseLists"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="BoardingHouseDetails"
        component={BoardingHouseDetailsScreen}
        options={backButtonConfig}
      />
      <Stack.Screen
        name="BoardingHouseLists"
        component={BookingListsScreen}
        // options={backButtonConfig}
      />
    </Stack.Navigator>
  );
}
