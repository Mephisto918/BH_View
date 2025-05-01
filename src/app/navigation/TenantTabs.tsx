import {StyleSheet } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import DashboardScreen from '../screens/tenant/DashboardScreen'
import BookingScreen from '../screens/tenant/BookingScreen'
import MapScreen from '../screens/shared/MapScreen'
import NotificationScreen from '../screens/shared/NotificationsScreen'
import SettingsScreen from '../screens/shared/SettingsScreen'

import { BorderRadius, BorderWidth, Colors, ShadowLight, Spacing } from '@/constants/'

const Tab = createBottomTabNavigator();

const TenantTabs = () => {
  return (
    <Tab.Navigator
      // style={s.main_container}
      initialRouteName='MapScreen'
      // backBehavior=''
      screenOptions={({route})=>({
        tabBarStyle: s.tabBarStyle,
        tabBarIconStyle: s.tabBarIconStyle,
        // Chat gpt
        tabBarIcon: ({ focused, color}) => {
          let iconName = 'map-outline';

          if (route.name === 'DashboardScreen') iconName = focused ? 'receipt' : 'receipt-outline';
          else if (route.name === 'BookingScreen') iconName = focused ? 'bookmarks' : 'bookmarks-outline';
          else if (route.name === 'MapScreen') iconName = focused ? 'map' : 'map-outline';
          else if (route.name === 'NotificationScreen') iconName = focused ? 'notifications' : 'notifications-outline';
          else if (route.name === 'SettingsScreen') iconName = focused ? 'settings' : 'settings-outline';

          return <Ionicons 
                    name={iconName} size={35} color={color} 
                    style={{...(focused === true ? {} : ShadowLight.md)}}  // yawa di mo gana animal
                  />; 
        },
        tabBarActiveTintColor: Colors.PrimaryLight[2],
        tabBarInactiveTintColor: Colors.PrimaryLight[3],
        headerShown: false,
        tabBarShowLabel: false,
        // Chat gpt
      })}
    >
      <Tab.Screen name="DashboardScreen" component={DashboardScreen}/>
      <Tab.Screen name="BookingScreen" component={BookingScreen}/>
      <Tab.Screen name="MapScreen" component={MapScreen}/>
      <Tab.Screen name="NotificationScreen" component={NotificationScreen}/>
      <Tab.Screen name="SettingsScreen" component={SettingsScreen}/>
    </Tab.Navigator>
  )
}

const s = StyleSheet.create({
  main_container:{

  },
  tabBarStyle:{
    backgroundColor: Colors.PrimaryLight[8],
    height: 70,
    
  },
  tabBarIconStyle:{
    borderWidth: BorderWidth.xs,
    borderColor: Colors.PrimaryLight[5],
    backgroundColor: Colors.PrimaryLight[8],
    aspectRatio: 1/1,
    height: 50,
    padding: Spacing.xs,
    borderRadius: BorderRadius.lg,
    
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: -20,
  },
  sceneStyle:{
    backgroundColor: 'green'
  }
})

export default TenantTabs