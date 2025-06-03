import { StyleSheet, Alert as AlertRN, View } from 'react-native'
import { Alert,Input, Button, InputField, Box, Text, HStack, VStack, FormControl, Heading, Avatar } from '@gluestack-ui/themed'
import React, { useState, useEffect } from 'react'

// style
import { GlobalStyle, Colors, BorderRadius, Spacing, Fontsize } from '@/constants'

// layout
import StaticScreenWrapper from '@/components/layout/StaticScreenWrapper'

import Api, { RoleKey } from '@/services/apiEndpoints'
import { useIsFocused } from '@react-navigation/native'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { MenuStackParamList } from '../../../types/navigation'

interface EditInfoFormProps{
  id: string|undefined,
  username: string|undefined,
  firstname: string|undefined,
  lastname: string|undefined
  email: string|undefined
}
const EditUserInfoScreen = () => {
  const api = new Api();
  const isFocused = useIsFocused()
  const userRole: RoleKey = useSelector((state: RootState) => state.auth.role);
  const userId: string = useSelector((state: RootState) => state.auth.id);

  const route = useNavigation<NativeStackNavigationProp<MenuStackParamList>>();

  useEffect(()=>{
    fetchData();
  }, [isFocused])

  const [editInfoForm, setEditInfoForm] = useState<EditInfoFormProps>({
    id: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
  })

  const fetchData = async () => {
    try{
      const res = await api[userRole].selectById(userId)
      // const res = await api.owner.selectById(userId)
      const data = res.data;
      console.log('res in edit use r screen:',res[0]);
      setEditInfoForm(data);
    }catch(error: any){
      console.log('error in edit info', error);
    }
  }

  const [showSaveChangesConfirmModal, setShowSaveChangesConfirmModal] = useState(false);

  const handleCancelButton = () => {
    route.goBack();
  }
  
  const handleSaveChanges = async () => {
    try{
      const updateRes = await api[userRole].update(editInfoForm, userId);
      console.log(updateRes);

      AlertRN.alert('Accound updated!');
      setTimeout(()=>{
        setShowSaveChangesConfirmModal(false);
        route.goBack();
      })
    }catch(error){
      console.log(error);
      AlertRN.alert('Error in saving changes!');
    }
  }

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer]}
      contentContainerStyle={[ GlobalStyle.GlobalsContentContainer, {
        padding: Spacing.lg,
        // paddingBottom: 80, // gives space for keyboard
        gap: Spacing.lg,
      }]}
    >
        <VStack style={[{
          width: '100%',
          flex: 1,
          gap: Spacing.lg
        }]}>
          <Box style={[{ alignItems: 'center' }]}>
            <Avatar style={[{aspectRatio: 1, height: 150}]}></Avatar>
          </Box>
          <Heading style={[s.Text, {fontSize: Fontsize.h2}]}>Personal Details</Heading>
          <HStack style={[{width: '100%', justifyContent: 'space-around', gap: Spacing.lg}]}>
            <FormControl style={[s.FL]}>
              <FormControl.Label>
                <Text style={[s.Text]}>First Name</Text>
              </FormControl.Label>
              <Input>
                <InputField 
                  style={[s.TextInput]}
                  value={editInfoForm.firstname}
                  placeholder={editInfoForm.firstname}
                  onChangeText={(text: string)=>setEditInfoForm({...editInfoForm, firstname: text})}
                />
              </Input>
            </FormControl>
            <FormControl style={[s.FL]}>
              <FormControl.Label>
                <Text style={[s.Text]}>Last Name</Text>
              </FormControl.Label>
              <Input>
                <InputField 
                  style={[s.TextInput]}
                  value={editInfoForm.lastname}
                  placeholder={editInfoForm.lastname}
                  onChangeText={(text: string)=>setEditInfoForm({...editInfoForm, lastname: text})}
                />
              </Input>
            </FormControl>
          </HStack>
          <Box>
            <FormControl>
              <FormControl.Label>
                <Text style={[s.Text]}>Username</Text>
              </FormControl.Label>
              <Input>
                <InputField 
                  style={[s.TextInput]}
                  value={editInfoForm.username}
                  placeholder={editInfoForm.username}
                  onChangeText={(text: string)=>setEditInfoForm({...editInfoForm, username: text})}
                />
            </Input>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormControl.Label>
                <Text style={[s.Text]}>Mobile Number</Text>
              </FormControl.Label>
              <Input>
                <InputField 
                  style={[s.TextInput, {backgroundColor: 'red'}]}
                  // value={editInfoForm.}
                  // placeholder={editInfoForm.firstname}
                  readOnly
                  placeholder='future implementation'
                  // onChangeText={(text: string)=>setEditInfoForm({...editInfoForm, firstname: text})}
                />
            </Input>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormControl.Label>
                <Text style={[s.Text]}>Email Address</Text>
              </FormControl.Label>
              <Input>
                <InputField 
                  style={[s.TextInput]}
                  value={editInfoForm.email}
                  placeholder={editInfoForm.email}
                  onChangeText={(text: string)=>setEditInfoForm({...editInfoForm, email: text})}
                />
            </Input>
            </FormControl>
          </Box>
          <Box>
            <FormControl>
              <FormControl.Label>
                <Text style={[s.Text]}>Address</Text>
              </FormControl.Label>
              <Input>
                <InputField 
                  style={[s.TextInput, {backgroundColor: 'red'}]}
                  // value={editInfoForm.email}
                  // placeholder={editInfoForm.email}
                  readOnly
                  placeholder='Future implementation'
                  // onChangeText={(text: string)=>setEditInfoForm({...editInfoForm, email: text})}
                />
            </Input>
            </FormControl>
          </Box>
          <HStack 
            style={[
              {
                width: '100%', 
                justifyContent: 'flex-end',
                gap: Spacing.lg,
                marginTop: 'auto',
                marginBottom: '15%'
              },
            ]}
          >
            <Button onPress={handleCancelButton}>
              <Text>Cancel</Text>
            </Button>
            <Button onPress={()=>setShowSaveChangesConfirmModal(true)}>
              <Text>Save</Text>
            </Button>
          </HStack>
        </VStack>
        {showSaveChangesConfirmModal && (
          <Alert
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
                alignItems: 'center',
                width: '90%',
                padding: Spacing.lg,
                borderRadius: BorderRadius.md,
                backgroundColor: Colors.PrimaryLight[7],
              }}
            >
              <Heading>
                <Text style={[s.Text, {fontSize: Fontsize.h1}]}>Save changes?</Text>
              </Heading>
              <Box>
                <Text style={[s.Text]}>Are you sure about the changes?</Text>
              </Box>
              <HStack>
                <Button 
                  mr="$3"
                  action="negative" 
                  onPress={()=>setShowSaveChangesConfirmModal(false)} 
                  >
                  <Text style={[s.Text]}>Cancel</Text>
                </Button>
                <Button 
                    action="secondary" 
                  variant="outline" 
                  onPress={handleSaveChanges}
                  >
                  <Text style={[s.Text]}>Save Chnages</Text>
                </Button>
              </HStack>
            </VStack>
          </Alert>
        )}
    </StaticScreenWrapper>
  )
}

const s = StyleSheet.create({
  border:{
    // borderColor: 'red',
    // borderWidth: 3
  },
  FL:{
    flex: 1
  },
  Text:{
    color: Colors.TextInverse[2]
  },
  TextInput:{
    color: Colors.TextInverse[3]
  }
})

export default EditUserInfoScreen