import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";

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

import PropertiesMainScreen from "../screens/properties.main.screen";
import BookingMainScreen from "../screens/booking.main.screen";
import DashboardMainScreen from "../screens/dashboard.main.screen";
import NotificationMainScreen from "@/features/shared/notification.main.screen";
import MenuStack from "@/features/shared/menu/navigation/menu.stack";
import { MenuStackParamListArrayName } from "@/features/shared/menu/navigation/menu.stack.types";

const Tab = createBottomTabNavigator();

const OwnerTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Dashboard"
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
              if (routeName === "Properties")
                return focused ? "business" : "business-outline";
              else if (routeName === "Booking")
                return focused ? "book" : "book-outline";
              else if (routeName === "Dashboard")
                return focused ? "receipt" : "receipt-outline";
              else if (routeName === "Notification")
                return focused ? "notifications" : "notifications-outline";
              else if (routeName === "Menu")
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
      <Tab.Screen name="Properties" component={PropertiesMainScreen} />
      <Tab.Screen name="Booking" component={BookingMainScreen} />
      <Tab.Screen name="Dashboard" component={DashboardMainScreen} />
      <Tab.Screen name="Notification" component={NotificationMainScreen} />
      <Tab.Screen
        name="Menu"
        component={MenuStack}
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? "Menu";

          const hideTabBarRoutes = MenuStackParamListArrayName;

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
