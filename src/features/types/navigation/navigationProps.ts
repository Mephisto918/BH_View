import { RouteProp } from '@react-navigation/native';
import { Routes } from './Routes';

// Owner example
export type OwnerDashboardRouteProp = RouteProp<
  OwnerTabsParamList,
  typeof Routes.owner.dashboard
>;

// Tenant example
export type TenantMapRouteProp = RouteProp<
  TenantTabsParamList,
  typeof Routes.tenant.map
>;


// usage 
/*
  import { TenantBookingRouteProp } from '@/types/navigation/navigationProps';

  type Props = {
    route: TenantBookingRouteProp;
  };

  }

  =======reconmened==========
  import { useNavigation, useRoute } from '@react-navigation/native';
  import type { OwnerDashboardRouteProp } from '@/types/navigation'; // or wherever you store it

  const route = useRoute<OwnerDashboardRouteProp>();  fir route params
  const navigation = useNavigation<OwnerDashboardNavigationProp>();

  ============consumer===========
  navigation.navigate(Routes.owner.dashboard);
*/
