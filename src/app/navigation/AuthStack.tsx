import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '../screens/auth/LoginScreen'
// import SignupScreen from '../screens/auth/SignupScreen'
import SignUpStack from './SignUpStack';

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  console.log('AuthStack')

  return (
    <Stack.Navigator
      initialRouteName='LoginScreen'
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen 
        name="LoginScreen" // Screen names should be capitalized
        component={LoginScreen} // Pass the component directly here
      />
      <Stack.Screen 
        name="SignUpStack" // Screen names should be capitalized
        component={SignUpStack} // Pass the component directly here
      />
    </Stack.Navigator>
  )
}

export default AuthStack