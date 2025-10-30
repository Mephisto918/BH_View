import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MenuStackParamList } from "@/features/shared/menu/navigation/menu.stack.types";
import { OwnerBookingStackParamList } from "../screens/booking/navigation/booking.types";

export type OwnerTabsParamList = {
  Properties: undefined;
  Booking: {
    screen: keyof OwnerBookingStackParamList;
    params?: OwnerBookingStackParamList[keyof OwnerBookingStackParamList];
  };
  Dashboard: undefined;
  Notification: undefined;
  Menu: NativeStackNavigationProp<MenuStackParamList>;
};
