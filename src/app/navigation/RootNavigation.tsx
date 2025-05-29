import { StatusBar } from 'react-native'
import React from 'react'
// import { useSelector } from 'react-redux';
// import { RootState } from '@/src/stores'; 

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminTabs from './AdminTabs'
import TenantTabs from './TenantTabs'
import AuthStack from './AuthStack';
import OwnerTabs from './OwnerTabs';

import { RootStackParamList } from '../types/navigation/navigationTypes';
import { Colors } from '@/src/constants';
const RootStack = createNativeStackNavigator<RootStackParamList>();

const RootNavigation = () => {
  // const userRole = useSelector((state: RootState) => state.auth.role);

  return (
    <>
      <StatusBar
        barStyle={'light-content'}
        backgroundColor={Colors.PrimaryLight[8]}
      />
      <RootStack.Navigator
        // initialRouteName='TenantTabs'
        initialRouteName='AuthStack'
        screenOptions={{
          headerShown: false
        }}
      >
        <RootStack.Screen name='AuthStack' component={AuthStack} />
        <RootStack.Screen name='AdminTabs' component={AdminTabs} />
        <RootStack.Screen name='TenantTabs' component={TenantTabs} />
        <RootStack.Screen name='OwnerTabs' component={OwnerTabs} />
      </RootStack.Navigator>
    </>
  )
}

export default RootNavigation