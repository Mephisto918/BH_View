import { NativeStackNavigationProp } from "@react-navigation/native-stack/lib/typescript/src/types";
import { MenuStackParamList } from "@/features/shared/menu/navigation/menu.stack.types";


export type AdminTabsParamList = {
  Dashboard: undefined;
  TenantsManagement: undefined;
  OwnerManagement: undefined;
  Notification: undefined;
  Menu: NativeStackNavigationProp<MenuStackParamList>;
}