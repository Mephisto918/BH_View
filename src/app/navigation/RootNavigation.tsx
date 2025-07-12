import { StatusBar } from "react-native";
import React, { useEffect } from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AdminTabs from "./tabs/AdminTabs";
import TenantTabs from "./tabs/TenantTabs";
import AuthStack from "./stacks/AuthStack";
import OwnerTabs from "./tabs/OwnerTabs";
import SyslogsScreen from "../screens/admin/SyslogsScreen";

import { RootStackParamList } from "../types/navigation";
import { Colors } from "@/constants";

// redux
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/stores";
import {
  useGetOneQuery as useGetTenantQuery,
  selectUser as selectTenant,
} from "@/stores/tenants/tenants";
import {
  useGetOneQuery as useGetOwnerQuery,
  selectUser as selectOwner,
} from "@/stores/owners/owners";
import {
  useGetOneQuery as useGetAdminQuery,
  selectUser as selectAdmin,
} from "@/stores/admin/admin";
import { UserRole } from "@/stores/types/user.types";

const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  // TODO: Abstract this role-based data fetching into a Redux thunk for cleaner component code
  // TODO: make this into a selector in a function that returns a dynamic role
  // const dispatch = useDispatch();
  // const userData = useSelector((state: RootState) => state.auth.userData);

  // const role = userData?.role;
  // const id = userData?.id;

  // const tenantQuery = useGetTenantQuery(id!, {
  //   skip: role !== UserRole.TENANT,
  // });
  // const ownerQuery = useGetOwnerQuery(id!, { skip: role !== UserRole.OWNER });
  // const adminQuery = useGetAdminQuery(id!, { skip: role !== UserRole.ADMIN });

  // // Example: when data arrives, dispatch
  // useEffect(() => {
  //   if (tenantQuery.data) {
  //     console.log("root nav user pass: ",tenantQuery.data)
  //     dispatch(selectTenant(tenantQuery.data))
  //   };
  //   if (ownerQuery.data) {
  //     console.log("root nav user pass: ",ownerQuery.data)
  //     dispatch(selectOwner(ownerQuery.data))
  //   };
  //   if (adminQuery.data) {
  //     console.log("root nav user pass: ",adminQuery.data)
  //     dispatch(selectAdmin(adminQuery.data))
  //   };
  // }, [tenantQuery.data, ownerQuery.data, adminQuery.data, dispatch]);

  return (
    <>
      <StatusBar
        barStyle={"light-content"}
        backgroundColor={Colors.PrimaryLight[8]}
      />
      <RootStack.Navigator
        // initialRouteName='TenantTabs'
        initialRouteName="AuthStack"
        screenOptions={{
          headerShown: false,
        }}
      >
        <RootStack.Screen name="AuthStack" component={AuthStack} />
        <RootStack.Screen name="AdminTabs" component={AdminTabs} />
        <RootStack.Screen name="TenantTabs" component={TenantTabs} />
        <RootStack.Screen name="OwnerTabs" component={OwnerTabs} />
        <RootStack.Screen name="SyslogsScreen" component={SyslogsScreen} />
      </RootStack.Navigator>
    </>
  );
};

export default RootNavigation;
