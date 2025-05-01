import { StatusBar, } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import DashboardScreen from '../screens/admin/DashboardScreen'
import ParentsManagementScreen from '../screens/admin/ParentsManagementScreen'
import ChildrenManagementScreen from '../screens/admin/ChildrenManagementScreen'
import NotificationScreen from '../screens/shared/NotificationsScreen';
import SettingsScreen from '../screens/shared/SettingsScreen';

const Tab = createBottomTabNavigator();

const AdminTabs = () => {
  return (
    <>
      <StatusBar 
        barStyle='dark-content'
      />
      <Tab.Navigator
        initialRouteName='Dashboard'
        screenOptions={({route})=>({
          // Chat gpt
          tabBarIcon: ({ focused, color, size }) => {
            let iconName = 'receipt-outline';

            if (route.name === 'DashboardScreen') iconName = focused ? 'stats-chart' : 'stats-chart-outline'
            else if (route.name === 'ParentsManagementScreen') iconName = focused ? 'person' : 'person-outline';
            else if (route.name === 'ChildrenManagementScreen') iconName = focused ? 'people' : 'people-outline';
            else if (route.name === 'NotificationScreen') iconName = focused ? 'notifications' : 'notifications-outline';
            else if (route.name === 'SettingsScreen') iconName = focused ? 'settings' : 'settings-outline';

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007aff',
          tabBarInactiveTintColor: 'gray',
          // Chat gpt
        })}
      >
        <Tab.Screen name="DashboardScreen" component={DashboardScreen}/>
        <Tab.Screen name="ParentsManagementScreen" component={ParentsManagementScreen}/>
        <Tab.Screen name="ChildrenManagementScreen" component={ChildrenManagementScreen}/>
        <Tab.Screen name="NotificationScreen" component={NotificationScreen}/>
        <Tab.Screen name="SettingsScreen" component={SettingsScreen}/>
      </Tab.Navigator>
    </>
  )
}

export default AdminTabs