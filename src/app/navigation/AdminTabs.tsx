import { StatusBar,StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { BorderRadius, Colors } from '@/src/constants'

import DashboardScreen from '../screens/admin/DashboardScreen'
import TenantsManagementScreen from '../screens/admin/TenantsManagementScreen'
import OwnerManagementScreen from '../screens/admin/OwnerManagementScreen'
import NotificationScreen from '../screens/shared/NotificationsScreen';
import SettingsScreen from '../screens/shared/SettingsScreen';

//layout component
import { BottomNavBarStyleConfig } from '@/src/components/layout/BottomNavBarStyleConfig'

const Tab = createBottomTabNavigator();

const AdminTabs = () => {
  return (
    <>
      <StatusBar 
        barStyle='light-content'
      />
      <Tab.Navigator
        initialRouteName='DashboardScreen'
        screenOptions={({route})=>({
          // tabBarLabel: '',
          
          headerShown: false,
          // Chat gpt
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'receipt-outline';

            if (route.name === 'DashboardScreen') iconName = focused ? 'stats-chart' : 'stats-chart-outline'
            else if (route.name === 'TenantsManagementScreen') iconName = focused ? 'person' : 'person-outline';
            else if (route.name === 'OwnerManagementScreen') iconName = focused ? 'people' : 'people-outline';
            else if (route.name === 'NotificationScreen') iconName = focused ? 'notifications' : 'notifications-outline';
            else if (route.name === 'SettingsScreen') iconName = focused ? 'settings' : 'settings-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          ...BottomNavBarStyleConfig
          // Chat gpt
        })}
      >
        <Tab.Screen name="DashboardScreen" component={DashboardScreen}/>
        <Tab.Screen name="TenantsManagementScreen" component={TenantsManagementScreen}/>
        <Tab.Screen name="OwnerManagementScreen" component={OwnerManagementScreen}/>
        <Tab.Screen name="NotificationScreen" component={NotificationScreen}/>
        <Tab.Screen name="SettingsScreen" component={SettingsScreen}/>
      </Tab.Navigator>
    </>
  )
}

const s = StyleSheet.create({
  tabBarStyle:{
    backgroundColor: Colors.PrimaryLight[7],
    
  },
  tabBarIconStyle: {
    backgroundColor: Colors.PrimaryLight[7],
    height: 50,
    marginTop: -20,
    aspectRatio: 1/1,
    borderColor: 'red',
    borderWidth: 3,
    borderRadius: BorderRadius.md,
    
  }
})

export default AdminTabs