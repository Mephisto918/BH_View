import { StatusBar } from 'react-native'
import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AdminTabs from './tabs/AdminTabs'
import TenantTabs from './tabs/TenantTabs'
import AuthStack from './stacks/AuthStack';
import OwnerTabs from './tabs/OwnerTabs';

import { RootStackParamList } from '../types/navigation';
import { Colors } from '@/constants';
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