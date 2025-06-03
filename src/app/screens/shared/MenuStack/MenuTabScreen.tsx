import { View, Text, StyleSheet } from 'react-native'
import React, { useEffect, useState} from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/stores'; 

import AuthService from '@/services/AuthService';
import { logout } from '@/stores/slices/authSlice';

//
import { Box, VStack, HStack, Avatar, Heading } from '@gluestack-ui/themed';
import { Button } from '@gluestack-ui/themed';
import { Ionicons } from '@expo/vector-icons';
import StaticScreenWrapper from '@/components/layout/StaticScreenWrapper';
import { GlobalStyle, Colors } from '@/constants';

// routing
import { useNavigation } from '@react-navigation/native'; 
import { RootStackParamList } from '@/app/types/navigation';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { MenuStackParamList } from '@/app/types/navigation';

import Api, {RoleKey} from '@/services/apiEndpoints';
import { useIsFocused } from '@react-navigation/native';


type ToLoginScreen = NativeStackNavigationProp<RootStackParamList, 'LoginScreen'>

interface UserInfoProps{
  usernmae: string,
  firstname: string,
  lastname: string,
}

const Settings = () => {
  const api = new Api();
  const isFocused = useIsFocused()
  const userRole: RoleKey = useSelector((state: RootState) => state.auth.role);
  const user_id = useSelector((state: RootState)=>state.auth.id)

  const dispatch = useDispatch();
  const navigateToLogin = useNavigation<ToLoginScreen>();
  const navigationMenu = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();

  const [userInfo, setUserInfo] = useState<UserInfoProps>({
    usernmae: "",
    firstname: "",
    lastname: ""
  })

  const fetchData = async () => {
    try{
      const res = await api[userRole].selectById(user_id)
      // const res = await api.owner.selectById(userId)
      const data = res.data;
      console.log('res in edit use r screen:',res[0]);
      setUserInfo(data);
    }catch(error: any){
      console.log('error in edit info', error);
    }
  }

  useEffect(()=>{
    fetchData()
  }, [isFocused])

  const logOutOnPress = () => {
    dispatch(logout())
    navigateToLogin.navigate('AuthStack');
  }

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer,s.container]}
    >
      <VStack
        style={{
          // borderColor: 'green',
          // borderWidth: 2,
          width: '100%',
        }}
      >
        <VStack
          style={{
            // borderColor: 'orange',
            // borderWidth: 2,
            marginBottom: 50,
            justifyContent: 'center',
            alignContent: 'center',
          }}
        >
          <HStack gap={20} 
            style={{
              justifyContent: 'center',
              alignItems: 'center',

              marginBottom: 25
            }}
          >
            <Avatar></Avatar>
            <VStack gap={0}>
              <HStack gap={10}>
                <Heading size="xl" color={Colors.TextInverse[2]} >
                  {userInfo.firstname}
                </Heading>
                <Heading size="xl" color={Colors.TextInverse[2]}>
                  {userInfo.lastname}
                </Heading>
              </HStack>
              <Box>
                <Heading size="lg" color={Colors.TextInverse[2]} fontWeight="$light">
                  @{userInfo.username}
                </Heading>
              </Box>
            </VStack>
          </HStack>
          <Button style={{alignSelf: 'center', gap: 10}} onPress={()=>navigationMenu.navigate('EditUserInfoScreen')}>
            <Ionicons name="pencil-outline" size={24} color="black"/>
            <Text>Edit Profile</Text>
          </Button>
        </VStack>


        <VStack style={[s.buttons_Array]}>
          <Button
            // onPress={()=>navigationMenu.navigate('Settings')}
            style={[s.buttons_Array_button]}
          >
            <Ionicons name="settings-outline" size={24} color="black"/>
            <Text>Settings</Text>
          </Button>
          <Button
            style={[s.buttons_Array_button]}
            onPress={()=>navigationMenu.navigate('CustomerHelpScreen')}
          >
            <Ionicons name="chatbox-ellipses-outline" size={24} color="black"/>
            <Text>Help</Text>
          </Button>
          <Button
            style={[s.buttons_Array_button]}
            onPress={()=>navigationMenu.navigate('UserAccessibilityScreen')}
          >
            <Ionicons name="accessibility-outline" size={24} color="black"/>
            <Text>Accessibility</Text>
          </Button>
          <Button
            style={[s.buttons_Array_button]}
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
    // borderColor: 'red',
    // borderWidth: 2,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: 30
  },
  buttons_Array:{
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'stretch',
    gap: 10,
    width: '100%',
    padding: 10
  },
  buttons_Array_button:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    gap: 10
  }
})

export default Settings