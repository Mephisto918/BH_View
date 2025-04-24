import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

export default function AuthNav() {
  return (
    <>
      <StatusBar 
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />
      <Stack
        initialRouteName='login'
        
      >
        <Stack.Screen 
          name="index"
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="login"
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="signup"
          options={{ headerShown: false }} 
        />
      </Stack>
      <StatusBar />  
    </>
  )
}