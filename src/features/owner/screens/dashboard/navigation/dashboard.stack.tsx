import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import BoardingHouseDetailsScreen from "../boarding-house.details.screen";
import DashboardMainScreen from "../dashboard.main.screen";
import { backButtonConfig } from "@/constants/navigation/screenOptions";
import VerificationMainScreen from "../verification/verification.main.screen.";
import VerificationSubmitScreen from "../verification/verification-submit.screen";
import VerificationViewScreen from "../verification/verification-view.screen";

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
      <Stack.Screen
        name="VerificationMainScreen"
        options={backButtonConfig}
        component={VerificationMainScreen}
      />
      <Stack.Screen
        name="VerificationSubmitScreen"
        options={backButtonConfig}
        component={VerificationSubmitScreen}
      />
      <Stack.Screen
        name="VerificationViewScreen"
        options={backButtonConfig}
        component={VerificationViewScreen}
      />
    </Stack.Navigator>
  );
}
