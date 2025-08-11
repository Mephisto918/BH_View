import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MenuStackParamList } from "@/features/shared/menu/navigation/menu.stack.types";
import { TenantBookingStackParamList } from "../screens/booking/navigation/booking.types";

export type TenantTabsParamList = {
  Dashboard: undefined;
  Booking: {
    screen: keyof TenantBookingStackParamList;
    params?: TenantBookingStackParamList[keyof TenantBookingStackParamList];
  };
  Map: undefined;
  Notification: undefined;
  Menu: {
    screen: keyof MenuStackParamList;
    params: MenuStackParamList[keyof MenuStackParamList];
  };
};
