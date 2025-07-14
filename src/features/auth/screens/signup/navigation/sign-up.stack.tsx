import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack'
const Stack = createNativeStackNavigator();

import SignUpSelectUserTypeScreen from '../sign-up.select-user-type.screen';
import SignUpTenantScreen from '../sign-up.tenant.screen';
import SignUpOwnerScreen from '../sign-up.owner.screen';
import SignUpSuccessScreen from '../sign-up.success.screen';

export default function AuthSignUpStack(){
  return (
		<Stack.Navigator
			initialRouteName='SignUpSelectUserType'
			screenOptions={{
				// headerShown: false
			}}
		>
			<Stack.Screen 
				name='SignUpSelectUserType'
				component={SignUpSelectUserTypeScreen}
			/>
			<Stack.Screen 
				name='SignUpTenant'
				component={SignUpTenantScreen}
			/>
			<Stack.Screen
				name='SignUpOwner'
				component={SignUpOwnerScreen}
			/>
			<Stack.Screen
				name='SignUpSuccess'
				component={SignUpSuccessScreen}
			/>
		</Stack.Navigator>
  )
}
