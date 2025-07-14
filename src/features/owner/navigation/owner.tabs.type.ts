import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MenuStackParamList } from '@/features/shared/menu/navigation/menu.stack.types';

export type OwnerTabsParamList = {
  Properties: undefined;
  Books: undefined;
  Dashboard: undefined;
  Notification: undefined;
  Menu: NativeStackNavigationProp<MenuStackParamList>;
}