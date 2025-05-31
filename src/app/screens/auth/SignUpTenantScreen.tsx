import { StyleSheet,  Alert} from 'react-native'
import React, { useState, useEffect } from 'react'

import { Input, Box, FormControl, Button, Text, VStack, InputField } from '@gluestack-ui/themed';

// ui
import StaticScreenWrapper from '@/src/components/layout/StaticScreenWrapper'

// UI components
// import Button from '@/src/components/ui/Button'

// Global Styles
import { Colors, Fontsize, GlobalStyle, Spacing } from '@/src/constants'

// routing
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SignUpStackParamList } from '../../types/navigation/navigationTypes'

// api
import Api from '@/src/services/apiEndpoints'

interface TenantFormProps{
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignUpTenantScreen = () => {
  const api = new Api();
  const route = useNavigation<NativeStackNavigationProp<SignUpStackParamList>>();

  // const [loading, setLoading] = React.useState(false);
  const [tenantForm, setTenantForm] = useState<TenantFormProps>({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleFormSubmit = async () => {
    console.log(tenantForm);

    for(const [key, value] of Object.entries(tenantForm)){
      if(!value.trim()){
        Alert.alert('Missing Field', `Please fill in the ${key}`);
        return;
      }
    }
    if (!/^\S+@\S+\.\S+$/.test(tenantForm.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (tenantForm.password.length < 6) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters');
      return 
    }
    if(tenantForm.password !== tenantForm.confirmPassword){
      Alert.alert('Alert', 'Password and Confirm Password must match');
      return
    }

    try{
      const res: any = await api.tenants.create(tenantForm);

      Alert.alert("You are registered!")
      setTenantForm({
        username: "",
        firstname: "",
        lastname: "",
        email: "",
        password: "",
        confirmPassword: "",
      })
      route.navigate('SignUpSuccessScreen')
    }catch(error: any){
      console.log('signup tenant error', error);
      Alert.alert('Error: ', error.message);
    }
  }

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer, s.StaticScreenWrapper]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer]}
      // behavior='height'
      // scrollable={true}

    >
        <VStack
          style={{
            backgroundColor: 'red'
          }}
        >
          <FormControl>
            <FormControl.Label>
              <Text>Username</Text>
            </FormControl.Label>
            <Input>
              <InputField 
                value={tenantForm.username}
                onChangeText={(text: string)=>setTenantForm({...tenantForm, username: text})}
              />
            </Input>
          </FormControl>
          <FormControl>
            <FormControl.Label>
              <Text>Firstname</Text>
            </FormControl.Label>
            <Input>
              <InputField 
                value={tenantForm.firstname}
                onChangeText={(text: string)=>setTenantForm({...tenantForm, firstname: text})}
              />
            </Input>
          </FormControl>
          <FormControl>
            <FormControl.Label>
              <Text>Lastname</Text>
            </FormControl.Label>
            <Input>
              <InputField 
                value={tenantForm.lastname}
                onChangeText={(text: string)=>setTenantForm({...tenantForm, lastname: text})}
              />
            </Input>
          </FormControl>
          <FormControl>
            <FormControl.Label>
              <Text>Email</Text>
            </FormControl.Label>
            <Input>
              <InputField 
                value={tenantForm.email}
                onChangeText={(text: string)=>setTenantForm({...tenantForm, email: text})}
                keyboardType='email-address'
              />
            </Input>
          </FormControl>
          <FormControl>
            <FormControl.Label>
              <Text>Password</Text>
            </FormControl.Label>
            <Input>
              <InputField 
                value={tenantForm.password}
                onChangeText={(text: string)=>setTenantForm({...tenantForm, password: text})}
              />
            </Input>
          </FormControl>
          <FormControl>
            <FormControl.Label>
              <Text>Confirm Password</Text>
            </FormControl.Label>
            <Input>
              <InputField 
                value={tenantForm.confirmPassword}
                onChangeText={(text: string)=>setTenantForm({...tenantForm, confirmPassword: text})}
              />
            </Input>
          </FormControl>
          <Button onPress={handleFormSubmit}>
            <Text>
              Sign Up
            </Text>
          </Button>
        </VStack>
    </StaticScreenWrapper>
  )
}

const s = StyleSheet.create({
  StaticScreenWrapper:{
    // flex: 1,
    // backgroundColor: Colors.PrimaryLight[8],
    // justifyContent: 'flex-start',
    // justifyContent: 'center',
    // alignItems: 'center',
    // paddingVertical: 40
    // borderColor: 'orange',
    // borderWidth: 4,
  },
  container:{
    width: '90%',
  }
})

export default SignUpTenantScreen