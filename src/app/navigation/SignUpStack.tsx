import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

import SignUpSelectUserTypeScreen from '../screens/auth/SignUpSelectUserTypeScreen';
import SignUpTenantScreen from '../screens/auth/SignUpTenantScreen';
import SignUpOwnerScreen from '../screens/auth/SignUpOwnerScreen';
import SignUpSuccessScreen from '../screens/auth/SignUpSuccessScreen';

const SignUpStack = () => {
  return (
		<Stack.Navigator
			initialRouteName='SignUpSelectUserTypeScreen'
      screenOptions={{
        // headerShown: false
      }}
		>
			<Stack.Screen 
				name='SignUpSelectUserTypeScreen'
				component={SignUpSelectUserTypeScreen}
			/>
			<Stack.Screen 
				name='SignUpTenantScreen'
				component={SignUpTenantScreen}
			/>
			<Stack.Screen
				name='SignUpOwnerScreen'
				component={SignUpOwnerScreen}
			/>
			<Stack.Screen
				name='SignUpSuccessScreen'
				component={SignUpSuccessScreen}
			/>
		</Stack.Navigator>
  )
}

export default SignUpStack