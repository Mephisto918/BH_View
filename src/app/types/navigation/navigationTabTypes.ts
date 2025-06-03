import BoardingHouseTypesProps from '../screens/BoardinHouseTypes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MenuStackParamList } from './navigationStackTypes';

export type AdminTabsParamList = {
  DashboardScreen: undefined;
  OwnerManagementScreen: undefined;
  TenantsManagementScreen: undefined;
  NotificationTabScreen: undefined;
  MenuTabScreen: NativeStackNavigationProp<MenuStackParamList>;
}

export type OwnerTabsParamList = {
  PropertiesScreen: undefined;
  BooksScreen: undefined;
  DashboardScreen: undefined;
  NotificationTabScreen: undefined;
  MenuTabScreen: NativeStackNavigationProp<MenuStackParamList>;
}

export type TenantTabsParamList = {
  DashboardScreen: undefined;
  BookingScreen: { data: BoardingHouseTypesProps | null };
  MapTabScreen: undefined;
  NotificationTabScreen: undefined;
  MenuTabScreen: NativeStackNavigationProp<MenuStackParamList>;
}