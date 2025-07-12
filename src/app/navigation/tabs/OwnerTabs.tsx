import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

import PropertiesScreen from "../../screens/owner/PropertiesScreen";
import BooksScreen from "../../screens/owner/BooksScreen";
import DashboardScreen from "../../screens/owner/DashboardScreen";
import NotificationScreen from "../../screens/shared/NotificationsTabScreen";
import MenuStack from "../stacks/MenuStack";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import {
  // BorderRadius,
  // BorderWidth,
  Colors,
  // ShadowLight,
  // Spacing,
} from "@/constants/";
import { BottomNavBarStyleConfig } from "@/components/layout/BottomNavBarStyleConfig";
import { CustomTabIcon } from "@/components/layout/BottomNavBarStyleIcon";

const Tab = createBottomTabNavigator();

const OwnerTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="DashboardScreen"
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
              if (routeName === "PropertiesScreen")
                return focused ? "business" : "business-outline";
              else if (routeName === "BooksScreen")
                return focused ? "book" : "book-outline";
              else if (routeName === "DashboardScreen")
                return focused ? "receipt" : "receipt-outline";
              else if (routeName === "NotificationScreen")
                return focused ? "notifications" : "notifications-outline";
              else if (routeName === "MenuStack")
                return focused ? "menu" : "menu-outline";
            };

            const iconName = getIconName(route.name, focused);
            return (
              <CustomTabIcon name={iconName} focused={focused} color={color} />
            );
          },
          ...BottomNavBarStyleConfig,
        };
      }}
    >
      <Tab.Screen name="PropertiesScreen" component={PropertiesScreen} />
      <Tab.Screen name="BooksScreen" component={BooksScreen} />
      <Tab.Screen name="DashboardScreen" component={DashboardScreen} />
      <Tab.Screen name="NotificationScreen" component={NotificationScreen} />
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

export default OwnerTabs;
