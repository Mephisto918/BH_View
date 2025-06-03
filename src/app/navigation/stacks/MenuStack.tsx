import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import MenuTabScreen from '@/app/screens/shared/MenuStack/MenuTabScreen'
import EditUserInfoScreen from '@/app/screens/shared/MenuStack/EditUserInfoScreen'
import CustomerHelpScreen from '@/app/screens/shared/MenuStack/CustomerHelpScreen'
import UserAccessibilityScreen from '@/app/screens/shared/MenuStack/UserAccessibilityScreen'

const Stack = createNativeStackNavigator();

const MenuStack = () => {
  return (
    <Stack.Navigator
      initialRouteName='MenuTabScreen'
			screenOptions={{
					headerShown: false
			}}
    >
      <Stack.Screen 
        name='MenuTabScreen'
        component={MenuTabScreen}
      />
      <Stack.Screen 
        name='EditUserInfoScreen'
        component={EditUserInfoScreen}
      />
      <Stack.Screen 
        name='CustomerHelpScreen'
        component={CustomerHelpScreen}
      />
      <Stack.Screen 
        name='UserAccessibilityScreen'
        component={UserAccessibilityScreen}
      />
    </Stack.Navigator>
  )
}

export default MenuStack