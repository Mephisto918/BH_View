
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
  OwnerManagementScreen: undefined;
  TenantsManagementScreen: undefined;
  NotificationScreen: undefined;
  SettingsScreen: undefined;
}

export type AuthStackParamList = {
  LoginScreen: undefined;
  SignUpStack: undefined;
}

// can me improved using which is a strong typing
/*
  import { NavigatorScreenParams } from '@react-navigation/native';

  export type AuthStackParamList = {
    LoginScreen: undefined;
    SignUpStack: NavigatorScreenParams<SignUpStackParamList>; // Stronger typing
  };
*/

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

export type SignUpStackParamList = {
  SignUpSelectUserTypeScreen: undefined;
  SignUpOwnerScreen: undefined;
  SignUpTenantScreen: undefined;
  SignUpSuccessScreen: undefined;
}

// slight advance improveement for spelling aand type safety
/*
  ✅ 4. Use Custom Hook for Navigation (Optional Layer)
  A custom hook can wrap navigate() and force you to use predefined route keys:
  
  export const useTypedNavigation = () => {
    const navigation = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

    const navigateTo = <T extends keyof AuthStackParamList>(screen: T, params?: AuthStackParamList[T]) => {
      navigation.navigate(screen, params);
    };

    return { navigateTo };
  };
  This lets TypeScript catch typos at the call site.

*/