import {StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import DashboardScreen from '../../screens/tenant/DashboardScreen'
import BookingScreen from '../../screens/tenant/BookingScreen'
import MapTabScreen from '../../screens/shared/MapTabScreen'
import NotificationTabScreen from '../../screens/shared/NotificationsTabScreen'
import MenuStack from '../stacks/MenuStack'

//ui component
import { BottomNavBarStyleConfig } from '@/components/layout/BottomNavBarStyleConfig'


import { BorderRadius, BorderWidth, Colors, ShadowLight, Spacing } from '@/constants/'
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';

const Tab = createBottomTabNavigator();

const TenantTabs = () => {
 

  return (
    <Tab.Navigator
      // style={s.main_container}
      initialRouteName='MapTabScreen'
      // backBehavior=''
      screenOptions={({ route }) => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? '';
        console.log('Troute:', routeName);

        const hideOnRoutes = [
          'EditUserInfoScreen',
          'CustomerHelpScreen',
          'UserAccessibilityScreen'
        ];

        // const shouldHideTabBar = hideOnRoutes.includes(routeName);

        return {
          tabBarStyle: {
            backgroundColor: Colors.PrimaryLight[8],
            height: 70,
          },
          tabBarIcon: ({ focused, color }) => {
            let iconName = 'map-outline';
            if (route.name === 'DashboardScreen') iconName = focused ? 'receipt' : 'receipt-outline';
            else if (route.name === 'BookingScreen') iconName = focused ? 'bookmarks' : 'bookmarks-outline';
            else if (route.name === 'MapTabScreen') iconName = focused ? 'map' : 'map-outline';
            else if (route.name === 'NotificationTabScreen') iconName = focused ? 'notifications' : 'notifications-outline';
            else if (route.name === 'MenuStack') iconName = focused ? 'menu' : 'menu-outline';

            return <Ionicons name={iconName} size={35} color={color} />;
          },
          ...BottomNavBarStyleConfig,
        };
      }}
    >
      <Tab.Screen name="DashboardScreen" component={DashboardScreen}/>
      <Tab.Screen name="BookingScreen" component={BookingScreen}/>
      <Tab.Screen name="MapTabScreen" component={MapTabScreen}/>
      <Tab.Screen name="NotificationTabScreen" component={NotificationTabScreen}/>
      <Tab.Screen name="MenuStack" component={MenuStack} 
        options={({ route }) => {
          const routeName = getFocusedRouteNameFromRoute(route) ?? 'MenuTabScreen';

          const hideTabBarRoutes = [
            'EditUserInfoScreen',
            'CustomerHelpScreen',
            'UserAccessibilityScreen',
          ];

          return {
            tabBarStyle: {
              display: hideTabBarRoutes.includes(routeName) ? 'none' : 'flex',backgroundColor: Colors.PrimaryLight[8],height: 70,
            },
            ...BottomNavBarStyleConfig,
          };
        }}
      />
    </Tab.Navigator>
  )
}

const s = StyleSheet.create({
  main_container:{

  },
  sceneStyle:{
    // backgroundColor: 'green'
  }
})

export default TenantTabs