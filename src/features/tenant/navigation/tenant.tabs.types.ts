import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { MenuStackParamList } from "@/features/shared/menu/navigation/menu.stack.types";

export type TenantTabsParamList = {
  Dashboard: undefined;
  Booking: { id: number | null };
  Map: undefined;
  Notification: undefined;
  Menu: NativeStackNavigationProp<MenuStackParamList>;
};
