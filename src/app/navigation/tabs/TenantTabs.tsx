import { StyleSheet } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import DashboardScreen from "../../screens/tenant/DashboardScreen";
import BookingScreen from "../../screens/tenant/BookingScreen";
import MapTabScreen from "../../screens/shared/MapTabScreen";
import NotificationTabScreen from "../../screens/shared/NotificationsTabScreen";
import MenuStack from "../stacks/MenuStack";

//ui component
import { BottomNavBarStyleConfig } from "@/components/layout/BottomNavBarStyleConfig";
import { CustomTabIcon } from "@/components/layout/BottomNavBarStyleIcon";

import {
  // BorderRadius,
  // BorderWidth,
  Colors,
  // ShadowLight,
  // Spacing,
} from "@/constants/";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

const TenantTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="MapTabScreen"
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? "";
        console.log("Troute:", routeName);

        return {
          tabBarStyle: {
            backgroundColor: Colors.PrimaryLight[8],
            height: 70,
          },
          tabBarIcon: ({ focused, color }) => {
            const getIconName = (routeName: string, focused: boolean) => {
              if (routeName === "DashboardScreen")
                return focused ? "receipt" : "receipt-outline";
              else if (routeName === "BookingScreen")
                return focused ? "bookmarks" : "bookmarks-outline";
              else if (routeName === "MapTabScreen")
                return focused ? "map" : "map-outline";
              else if (routeName === "NotificationTabScreen")
                return focused ? "notifications" : "notifications-outline";
              else if (routeName === "MenuStack")
                return focused ? "menu" : "menu-outline";
            };

            const iconName = getIconName(route.name, focused);
            return (
              <CustomTabIcon name={iconName} focused={focused} color={color} />
            );

            // return <Ionicons name={iconName} size={35} color={color} />;
          },
          ...BottomNavBarStyleConfig,
        };
      }}
    >
      <Tab.Screen name="DashboardScreen" component={DashboardScreen} />
      <Tab.Screen name="BookingScreen" component={BookingScreen} />
      <Tab.Screen name="MapTabScreen" component={MapTabScreen} />
      <Tab.Screen
        name="NotificationTabScreen"
        component={NotificationTabScreen}
      />
      <Tab.Screen
        name="MenuStack"
        component={MenuStack}
        options={({ route }) => {
          const routeName =
            getFocusedRouteNameFromRoute(route) ?? "MenuTabScreen";

          const hideTabBarRoutes = [
            "EditUserInfoScreen",
            "CustomerHelpScreen",
            "UserAccessibilityScreen",
          ];

          return {
            tabBarStyle: {
              display: hideTabBarRoutes.includes(routeName) ? "none" : "flex",
              backgroundColor: Colors.PrimaryLight[8],
              height: 70,
            },
            ...BottomNavBarStyleConfig,
          };
        }}
      />
    </Tab.Navigator>
  );
};

const s = StyleSheet.create({
  main_container: {},
  sceneStyle: {
    // backgroundColor: 'green'
  },
});

export default TenantTabs;
