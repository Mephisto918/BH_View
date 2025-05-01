import { View, Text, Button } from 'react-native'
import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native'
import { RootState } from '@/src/stores'; 
// import Button from '@/src/components/ui/Button';
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigation/RootNavigation'
import AuthService from '@/src/services/AuthService';
import { logout } from '../../../stores/slices/authSlice';

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
    <View>
        <View>
          <Button
            onPress={logOutOnPress}
            title='Logout!'
          />
        </View>
    </View>
  )
}

export default Settings