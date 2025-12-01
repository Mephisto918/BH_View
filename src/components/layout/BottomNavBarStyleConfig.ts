import { BottomTabNavigationOptions } from "@react-navigation/bottom-tabs";
import { Colors, Spacing, BorderWidth, BorderRadius } from "../../constants";
import { GlobalBottomNavigationStyles } from "@/constants/GlobalStyle";

export const BottomNavBarStyleConfig: BottomTabNavigationOptions = {
  tabBarIconStyle: {
    aspectRatio: 1 / 1,
    height: GlobalBottomNavigationStyles.containerIconHeightFromBottom,
    padding: Spacing.xs,
    borderRadius: BorderRadius.lg,

    justifyContent: "center",
    alignItems: "center",
  },
  tabBarActiveTintColor: GlobalBottomNavigationStyles.containerIconActiveColor,
  tabBarInactiveTintColor:
    GlobalBottomNavigationStyles.containerIconInactiveColor,
  headerShown: false,
  tabBarShowLabel: false,
};
