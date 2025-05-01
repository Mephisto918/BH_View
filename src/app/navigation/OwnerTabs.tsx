import React from 'react'
import { createBottomTabNavigator,  } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import PropertiesScreen from '../screens/owner/PropertiesScreen'
import BooksScreen from '../screens/owner/BooksScreen'
import DashboardScreen from '../screens/owner/DashboardScreen'
import NotificationScreen from '../screens/shared/NotificationsScreen'
import SettingsScreen from '../screens/shared/SettingsScreen'

const Tab = createBottomTabNavigator();

const OwnerTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName='Dashboard'
      screenOptions={({route})=>({
        // Chat gpt
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'receipt-outline';

          if (route.name === 'PropertiesScreen') iconName = focused ? 'business' : 'business-outline';
          else if (route.name === 'BooksScreen') iconName = focused ? 'book' : 'book-outline';
          else if (route.name === 'DashboardScreen') iconName = focused ? 'receipt' : 'receipt-outline';
          else if (route.name === 'NotificationScreen') iconName = focused ? 'notifications' : 'notifications-outline';
          else if (route.name === 'SettingsScreen') iconName = focused ? 'settings' : 'settings-outline';

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007aff',
        tabBarInactiveTintColor: 'gray',
        // Chat gpt
      })}
    >
      <Tab.Screen name="PropertiesScreen" component={PropertiesScreen}/>
      <Tab.Screen name="BooksScreen" component={BooksScreen}/>
      <Tab.Screen name="DashboardScreen" component={DashboardScreen}/>
      <Tab.Screen name="NotificationScreen" component={NotificationScreen}/>
      <Tab.Screen name="SettingsScreen" component={SettingsScreen}/>
    </Tab.Navigator>
  )
}

export default OwnerTabs