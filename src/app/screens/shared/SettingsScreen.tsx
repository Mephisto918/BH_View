import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import { RootState } from '@/src/stores'; 
// import Button from '@/src/components/ui/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/RootNavigation'
import AuthService from '@/src/services/AuthService';
import { logout } from '../../../stores/slices/authSlice';

//
import { Box, VStack, HStack, Avatar, Heading } from '@gluestack-ui/themed';
import { Button } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import StaticScreenWrapper from '@/src/components/layout/StaticScreenWrapper';
import { GlobalStyle } from '@/src/constants';

type ToLoginScreen = NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>

const Settings = () => {
  const userRole = useSelector((state: RootState) => state.auth.role);
  const auth = new AuthService();
  const dispatch = useDispatch();
  const navigateToLogin = useNavigation<ToLoginScreen>();

  const logOutOnPress = () => {
    dispatch(logout())
    navigateToLogin.navigate('AuthStack');
  }

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer,s.container]}
    >
      <VStack>
        <HStack>
          <Avatar></Avatar>
          <Box>
            <HStack>
              <Heading size="lg">
                Firstname
              </Heading>
              <Heading>
                Lastname
              </Heading>
            </HStack>
            <Box>
              {/* Tes */}
            </Box>
          </Box>
        </HStack>
        <VStack>
          <Button
            onPress={logOutOnPress}
          >
            <Ionicons name="exit-outline" size={24} color="black"/>
            <Text>Logout</Text>
          </Button>
        </VStack>
      </VStack>
    </StaticScreenWrapper>
  )
}

const s = StyleSheet.create({
  container:{
    borderColor: 'red',
    borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Settings