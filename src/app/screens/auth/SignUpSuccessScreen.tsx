import { StyleSheet,  Alert} from 'react-native'
import React, { useState, useEffect } from 'react'

import { Alert as AlertGL, HStack, View,  Input, Box, FormControl, Heading, ScrollView, Text, VStack, InputField,Checkbox,CheckboxLabel,CheckboxIndicator,CheckboxIcon } from '@gluestack-ui/themed';
import { textMD } from './TermsAndConditions';

// api
import Api from '@/services/apiEndpoints'

// UI layout
import StaticScreenWrapper from '@/components/layout/StaticScreenWrapper'

// UI Component
import Button from '@/components/ui/Button'

// Global Styles
import { BorderRadius, Colors, Fontsize, GlobalStyle, Spacing } from '@/constants'

// routing
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { AuthStackParamList } from '../../types/navigation'

const SignUpSuccessScreen = () => {
  const api = new Api();
  const route = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  async function handleSubmit(){
    route.navigate('LoginScreen')
  }

  const [termsModal, setTermsModal] = useState(false);

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer, s.StaticScreenWrapper]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer, {justifyContent: 'center', alignContent: 'stretch'}]}
    >
      <View
        style={[s.container,]}
      >
        <View>
          <Text 
            style={{
              color: Colors.TextInverse[1],
              fontSize: 40,
              alignSelf: 'center',
              marginBottom: 40
            }}
          >
            Thank you! Your application is under review. We’ll contact you soon via email.
          </Text>
        </View>
          
        <VStack>
          <HStack style={{marginTop: 10}}>
            <Button 
              title='Ok'
              onPressAction={handleSubmit}
            />
          </HStack>
        </VStack>
      </View>
    </StaticScreenWrapper>
  )
}

const s = StyleSheet.create({
  StaticScreenWrapper:{
    backgroundColor: Colors.PrimaryLight[8],
  },
  container:{
    width: '90%',
    alignSelf: 'center'
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


export default SignUpSuccessScreen