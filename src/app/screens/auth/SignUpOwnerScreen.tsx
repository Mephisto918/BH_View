import { StyleSheet,  Alert, FlatList} from 'react-native'
import React, { useState, useEffect } from 'react'

import {Button as ButtonGL, Alert as AlertGL, HStack, View,  Input, Box, FormControl, Heading, ScrollView, Text, VStack, InputField,Checkbox,CheckboxLabel,CheckboxIndicator,CheckboxIcon } from '@gluestack-ui/themed';
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

interface PDFItemProps{
  filename: string | undefined
  mimetype: string | undefined
  size: number | undefined
  content: string | undefined
  uploadedAt: string | undefined
}

const SignUpOwnerScreen = () => {
  const api = new Api();
  const route = useNavigation<NativeStackNavigationProp<SignUpStackParamList>>();

  const [form, setForm] = useState({
    username: '',
    firstname: '',
    lastname: '',
    password: '',
    confirmPassword: '',
    email: '',
    age: '',
    address: '',
    phone_number: ''
  })

  const handleChange = (field: string, value: string) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

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
    
    if(form.password != form.confirmPassword){
      Alert.alert('Password Does Not Match', 'Password and Confirmed Password must match');
      return;
    }

    // if (pdfItems.length < 2) {
    //   Alert.alert('Need more documents', 'Please provide more than 2 documents');
    //   return 
    // }

    if(hasAcceptedTerms!==true){
      return Alert.alert('You must accept the Terms and Conditions to create an account!');
    }

    try{
      // guy!!! pa docu ko aning _ kay karon pako, convention daw atay do discard variables
      const {confirmPassword: _, ...filtered} = form
      const combinePayload = {
        ...filtered,
        // certificates: pdfItems
      }
      const res: any = await api.owner.create(combinePayload, true);

      // console.log(res);
      // if(!res) console.log('res', res);

      Alert.alert("You are registered!")
      setForm({    
        username: '',
        firstname: '',
        lastname: '',
        password: '',
        confirmPassword: '',
        email: '',
        age: '',
        address: '',
        phone_number: ''
      })
      route.navigate('SignUpSuccessScreen')
    }catch(error: any){
      console.log(error)
      Alert.alert('Error', error.details);
    }
  }

  const [hasAcceptedTerms, setHasAcceptedTerms] = useState(false);
  const [termsModal, setTermsModal] = useState(false);
  
  // const [pdfItems, setPdfItems] = useState<PDFItemProps[]>([]);
  // const [pdfName, setPdfName] = useState("");
  // function generateFakePDFJson(filename: string) {
  //   const fakeContent = Array.from({ length: 10 }, () =>
  //     Math.random().toString(36).substring(2, 10)
  //   ).join('');

  //   return {
  //     filename,
  //     mimetype: "application/pdf",
  //     size: Math.floor(Math.random() * 50000) + 10000, // size in bytes
  //     content: fakeContent, // can be seen as fake base64
  //     uploadedAt: new Date().toISOString()
  //   };
  // }

  // const createPDFItem = () =>{
  //   const pdfItem = generateFakePDFJson(pdfName);
  //   setPdfItems(prev => [...prev, pdfItem]);
  //   setPdfName("");
  // }


  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer, s.StaticScreenWrapper]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer, {justifyContent: 'center', alignContent: 'stretch'}]}
    >
      <View
        style={[s.container,{ marginBottom: 100, marginTop: 100}]}
      >
        <View>
          <Text 
            style={{
              color: Colors.TextInverse[1],
              fontSize: Fontsize.h1,
              
            }}
          >
            Owner Application Form
          </Text>
        </View>
        <View>
          {['username', 'firstname', 'lastname', 'email', 'age', 'address', 'phone_number'].map((field) => (
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

          {/* <View>
            <Text
              style={{
                fontSize: Fontsize.base, 
                color: Colors.TextInverse[1], 
                padding: Spacing.sm
              }}
            >
              Creatae PDF
            </Text>
            <HStack style={{

            }}>
              <TextInput
                value={pdfName}
                onChangeText={(text: string)=>setPdfName(text)}
                variant='primary'
                textInputStyle={{
                  margin: 0,
                }}
                containerStyle={{
                  width: '85%',
                }}
              />
              <Button
                containerStyle={{
                  width: '15%'
                }}
                onPressAction={createPDFItem}
              >
                <Ionicons name="add-outline" size={30} color="black" />
              </Button>
            </HStack>          
          </View> */}
          {/* <ScrollView 
            style={{ marginTop: 20 }} 
            contentContainerStyle={{ 
              gap: 10,
            }} // optional, if using RN version that supports it
          >
            {pdfItems.map((item, index) => (
              <View
                key={index}
                style={{
                  backgroundColor: Colors.PrimaryLight[5],
                  borderRadius: BorderRadius.md,
                  padding: Spacing.sm,

                  flexDirection: 'row',
                  alignItems: 'center',
                }}
              >
                <Text
                  numberOfLines={1} // to force it single-line
                  ellipsizeMode="tail"
                  style={[
                    s.Text,
                    {
                      fontSize: Fontsize.base,
                      borderColor: 'red',
                      borderWidth: 3,
                      
                    },
                  ]}
                >
                  {item.filename}
                </Text>

                <ButtonGL
                  style={{
                    backgroundColor: Colors.Alert,
                    marginLeft: 'auto'
                  }}
                  onPress={()=>setPdfItems(prev=>prev.filter((_, i) => i !== index))}
                >
                  <Ionicons name="close-outline" size={20} color="black" />
                </ButtonGL>
              </View>

            ))}
          </ScrollView> */}

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

export default SignUpOwnerScreen

	// username TEXT UNIQUE NOT NULL,
	// firstname TEXT NOT NULL,
	// lastname TEXT NOT NULL,
	// email TEXT UNIQUE NOT NULL,
	// password TEXT NOT NULL,
	// age INTEGER CHECK (age >= 0),              -- optional, but must be a non-negative number
	// address TEXT,                                -- optional, full address
	// phone_number TEXT