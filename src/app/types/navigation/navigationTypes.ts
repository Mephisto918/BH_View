
import BoardingHouseTypesProps from "../screens/BoardinHouseTypes";

export type RootStackParamList = {
  LoginScreen: undefined;
  AdminTabs: undefined;
  AuthStack: undefined;
  GuestTabs: undefined;
  OwnerTabs: undefined;
  TenantTabs: undefined;
}

export type AdminTabsParamList = {
  DashboardScreen: undefined;
  ParentsManagementScreen: undefined;
  ChildrenManagementScreen: undefined;
  NotificationScreen: undefined;
  SettingsScreen: undefined;
}

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignupScreen: undefined;
}

// export type GuestTabsParamList = {

// }

export type OwnerTabsParamList = {
  PropertiesScreen: undefined;
  BooksScreen: undefined;
  DashboardScreen: undefined;
  NotificationScreen: undefined;
  SettingsScreen: undefined;
}

export type TenantTabsParamList = {
  DashboardScreen: undefined;
  BookingScreen: { data: BoardingHouseTypesProps | null };
  MapScreen: undefined;
  NotificationScreen: undefined;
  SettingsScreen: undefined;
}