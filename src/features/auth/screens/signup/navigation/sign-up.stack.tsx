import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import SignUpSelectUserTypeScreen from "../sign-up.select-user-type.screen";
import SignUpTenantScreen from "../sign-up.tenant.screen";
import SignUpOwnerScreen from "../sign-up.owner.screen";
import SignUpSuccessScreen from "../sign-up.success.screen";

import { backButtonConfig } from "@/constants/navigation/screenOptions";

export default function AuthSignUpStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignUpSelectUserType"
      screenOptions={
        {
          // headerShown: false
        }
      }
    >
      <Stack.Screen
        name="SignUpSelectUserType"
        component={SignUpSelectUserTypeScreen}
        options={backButtonConfig}
      />
      <Stack.Screen
        name="SignUpTenant"
        component={SignUpTenantScreen}
        options={backButtonConfig}
      />
      <Stack.Screen
        name="SignUpOwner"
        component={SignUpOwnerScreen}
        options={backButtonConfig}
      />
      <Stack.Screen
        name="SignUpSuccess"
        component={SignUpSuccessScreen}
        options={backButtonConfig}
      />
    </Stack.Navigator>
  );
}
