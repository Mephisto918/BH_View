import { StyleSheet,  Alert} from 'react-native'
import React, { useState, useEffect } from 'react'

import { Alert as AlertGL, HStack, View,  Input, Box, FormControl, Heading, ScrollView, Text, VStack, InputField,Checkbox,CheckboxLabel,CheckboxIndicator,CheckboxIcon } from '@gluestack-ui/themed';
import Ionicons from 'react-native-vector-icons/Ionicons'
import Markdown from "react-native-awesome-markdown";
import { textMD } from './TermsAndConditions';

// api
import Api from '@/services/apiEndpoints'

// UI layout
import StaticScreenWrapper from '@/components/layout/StaticScreenWrapper'

// UI Component
import Button from '@/components/ui/Button'
import TextInput from '@/components/ui/TextInput'

// Global Styles
import { BorderRadius, Colors, Fontsize, GlobalStyle, Spacing } from '@/constants'

// routing
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SignUpStackParamList } from '../../types/navigation'

const SignUpOwnerScreen = () => {
  const api = new Api();
  const route = useNavigation<NativeStackNavigationProp<SignUpStackParamList>>();

  const [form, setForm] = useState({
    username: '',
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  // const [isPasswordSame, setIsPasswordSame] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  // const handlePasswordConfirm = (field: string, value: string)=>{

  // }

  async function handleSubmit(){
    for(const [key, value] of Object.entries(form)){
      if(!value.trim()){
        Alert.alert('Missing Field', `Please fill in the ${key}`);
        return;
      }
    }
    if (!/^\S+@\S+\.\S+$/.test(form.email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address.');
      return;
    }
    if (form.password.length < 6) {
      Alert.alert('Invalid Password', 'Password must be at least 6 characters');
      return 
    }
    if(form.password !== form.confirmPassword){
      Alert.alert('Alert', 'Password and Confirm Password must match');
      return
    }

    if(hasAcceptedTerms!==true){
      return Alert.alert('You must accept the Terms and Conditions to create an account!');
    }

    try{
      // reson there is no shorcutting like (res.ok) is it is handled on the wrapper, see {Api} class above
      const res: any = await api.owner.create(form, true);

      // console.log(res);
      // if(!res) console.log('res', res);

      Alert.alert("You are registered!")
      setForm({username: '',firstname: '',lastname: '',email: '',password: '', confirmPassword: ''})
      route.navigate('SignUpSuccessScreen')
    }catch(error: any){
      Alert.alert('Error', error.details);
    }
  }

  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [termsModal, setTermsModal] = useState(false);

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer, s.StaticScreenWrapper]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer, {justifyContent: 'center', alignContent: 'center'}]}
    >
      <View
        style={[s.container]}
      >
        <View>
          <Text 
            style={{
              color: Colors.TextInverse[1],
              fontSize: Fontsize.h2,
            }}
          >
            Create Account as an Owner
          </Text>
        </View>
        <View>
          {['username', 'firstname', 'lastname', 'email'].map((field) => (
            <View key={field}>
              <Text 
                style={{
                  fontSize: Fontsize.base, 
                  color: Colors.TextInverse[1], 
                  padding: Spacing.sm
                }}
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}: 
              </Text>
              <TextInput
                value={form[field as keyof typeof form]}
                onChangeText={(text) => handleChange(field, text)}
                variant='primary'
                textInputStyle={{
                  fontSize: Fontsize.base,
                  padding: Spacing.xs,
                  // padding: 1,
                  margin: 0,
                }}
                containerStyle={{
                  borderRadius: BorderRadius.md
                }}
              />
            </View>
          ))}
          <View style={{width: "100%", padding: 10}}></View>
          {['password', 'confirmPassword'].map(field=>(
            <View key={field}>
              <Text
                style={{
                  fontSize: Fontsize.base, 
                  color: Colors.TextInverse[1], 
                  padding: Spacing.sm
                }}
              >
                {field == 'password' ? 'Password: ' : 'Confirm Password: ' }
              </Text>
              <TextInput
                secureTextEntry={true}
                value={form[field as keyof typeof form]}
                onChangeText={(text) => handleChange(field, text)}
                variant='primary'
                textInputStyle={{
                  margin: 0,
                }}
                containerStyle={{
                  borderRadius: BorderRadius.md,
                }}
              />
            </View>
          ))}
        </View>
        <VStack>
          <Checkbox
            style={{justifyContent: 'center', alignItems: 'center', paddingTop: 20, gap: 10}}
            isChecked={hasAcceptedTerms}
            onPress={() => setTermsModal(true)}
            value="accepted"
          >
            <CheckboxIndicator style={{aspectRatio: 1, height: 100}}>
              <CheckboxIcon as={()=>(
                <Ionicons name={hasAcceptedTerms ? 'checkmark' : 'checkmark-outline'} color={'black'} />
              )} />
            </CheckboxIndicator>
            <CheckboxLabel style={{color: Colors.TextInverse[1]}}>I agree to the Terms and Conditions</CheckboxLabel>
          </Checkbox>
          <HStack style={{marginTop: 10}}>
            <Button 
              title='Cancel'
              onPressAction={()=>{route.navigate('SignUpSelectUserTypeScreen')}}
              containerStyle={{
                backgroundColor: Colors.Alert
              }}
            />
            <Button 
              title='Create'
              onPressAction={handleSubmit}
            />
          </HStack>
        </VStack>
      </View>
      {termsModal && (
        <AlertGL
          style={{
            position:"absolute",
            top: 0,
            left:0,
            right:0,
            bottom:0,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor: 'rgba(0, 0, 0, 0.5)'
          }}
          >
          <VStack 
            style={{
              gap: Spacing.lg,
              alignItems: 'stretch',
              width: '90%',
              padding: Spacing.lg,
              borderRadius: BorderRadius.md,
              backgroundColor: Colors.PrimaryLight[7],
            }}
          >
            <Heading>
              <Text style={[s.Text, {fontSize: Fontsize.h1}]}>Terms and Services</Text>
            </Heading>
            <ScrollView>
              <Markdown styles={customStyles}  text={textMD}/>
            </ScrollView>
            <VStack>
              <Button 
                variant='primary'
                onPressAction={()=>{setTermsModal(false); setHasAcceptedTerms(false)}} 
                >
                <Text style={[s.TextButton]}>I Do Not Accept the Terms and Services</Text>
              </Button>
              <Button 
                variant='primary'
                onPressAction={()=>{setTermsModal(false); setHasAcceptedTerms(true)}} 
              >
                <Text style={[s.TextButton]}>I Accept the Terms and Services</Text>
              </Button>
            </VStack>
          </VStack>
        </AlertGL>
      )}
    </StaticScreenWrapper>
  )
}

const s = StyleSheet.create({
  StaticScreenWrapper:{
    backgroundColor: Colors.PrimaryLight[8],
  },
  container:{
    width: '90%',
  },
  Text:{
    color: 'white'
  },
  TextButton:{
    color: 'black'
  }
})

const customStyles = {
  paragraph: { color: 'white' },
  h1: { color: 'white' },
  h2: { color: 'white' },
  h3: { color: 'white' },
  h4: { color: 'white' },
  h5: { color: 'white' },
  h6: { color: 'white' },
  link: { color: 'white', textDecorationLine: 'underline' },
  blockquote: { color: 'white', fontStyle: 'italic' },
  list: { color: 'white' },
  strong: { color: 'white' },
  em: { color: 'white' },
  code: { color: 'white', backgroundColor: '#333' },
};

export default SignUpOwnerScreen