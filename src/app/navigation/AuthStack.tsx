import React, { useEffect } from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import api from '@/src/config/api'
import LoginScreen from '../screens/auth/LoginScreen'
import SignupScreen from '../screens/auth/SignupScreen'

import { useGetBoardingHousesQuery } from '@/src/stores/slices/apiSlice'

const Stack = createNativeStackNavigator();

const AuthStack = () => {
  // const [authRole, setAutRole] = useState<string>('');
  // console.log(`${api.BASE_URL}${api.PORT}/api/`)
  useEffect(() => {
    console.log("hook loaded");
    // const { data, isLoading, error } = useGetBoardingHousesQuery();
    // console.log({ data, isLoading, error });
  }, []);
  console.log('AuthStack')

  useEffect(() => {
    fetch(`${api.BASE_URL}${api.PORT}/api/`)
      .then(res => res.json())
      .then(json => console.log('✅ API works directly:', json))
      .catch(err => console.log('❌ API fetch error:', err));
  }, []);
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