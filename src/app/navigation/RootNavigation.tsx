import { StatusBar } from "react-native";
import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AuthStack from "@/features/auth/navigation/auth.stack";
import AdminTabs from "@/features/admin/navigation/admin.tabs";
import TenantTabs from "@/features/tenant/navigation/tenant.tabs";
import OwnerTabs from "@/features/owner/navigation/owner.tabs";

import { RootStackParamList } from "../../features/types/navigation";
import { Colors } from "@/constants";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {

  return (
    <>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Colors.PrimaryLight[8]}
      />
      <RootStack.Navigator
        // initialRouteName='TenantTabs'
        initialRouteName="Auth"
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name="Auth" component={AuthStack} />
        <RootStack.Screen name="Admin" component={AdminTabs} />
        <RootStack.Screen name="Tenant" component={TenantTabs} />
        <RootStack.Screen name="Owner" component={OwnerTabs} />
      </RootStack.Navigator>
    </>
  );
};

export default RootNavigation;
