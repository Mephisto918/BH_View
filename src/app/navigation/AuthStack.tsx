import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from '../screens/auth/LoginScreen'
import SignupScreen from '../screens/auth/SignupScreen'

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  // const [authRole, setAutRole] = useState<string>('');
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
        name="SignupScreen" // Screen names should be capitalized
        component={SignupScreen} // Pass the component directly here
      />
    </Stack.Navigator>
  )
}

export default AuthStack