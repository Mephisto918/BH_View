import { View, Text, StatusBar } from 'react-native'
import React from 'react'
import { Stack } from 'expo-router';

export default function AdminNav() {
  return (
    <>
      <StatusBar 
        barStyle='dark-content'
        backgroundColor='transparent'
        translucent
      />
      <Stack
        initialRouteName='dashboard'
      >
        <Stack.Screen 
          name="dashboard"
          // options={{ headerShown: false }} 
        />
      </Stack>
      <StatusBar />  
    </>
  )
}