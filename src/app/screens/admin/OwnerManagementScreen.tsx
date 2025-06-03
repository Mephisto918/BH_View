import { View, Text, StyleSheet, Alert as AlertRN} from 'react-native'
import {Alert, Box, HStack, VStack, Heading, Button as ButtonRN, FormControl, Input, InputField } from '@gluestack-ui/themed'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { BorderRadius, Colors, GlobalStyle, Spacing, Fontsize } from '../../../constants/index'
import StaticScreenWrapper from '@/components/layout/StaticScreenWrapper'

import Api from '@/services/apiEndpoints'
import { ScrollView } from 'react-native-gesture-handler'

import Button from '@/components/ui/Button'

interface User{
  id: string|number|undefined,
  username: string|undefined,
  firstname: string|undefined,
  lastname: string|undefined,
  email: string|undefined,
  password: string|undefined,
  role: string|undefined,
  isActive: string|undefined,
  isVerified: string|undefined,
  createdAt: string|undefined
}

const OwnerManagement = ()=> {
  const api = new Api();
  const [users, setUsers] = useState<User[]>([])


  useEffect(()=>{
    fetchUsers();
  }, [])

  const fetchUsers = async ()=>{
    try{
      const result = await api.owner.all();
      setUsers(result.data);
    }catch(error){
      console.log(error)
    }
  }

  const handleApproveUser = async (userId: string|number) => {
    try{
      // const result = await api.tenant.update(editForm, selectedUser.id);
      console.log('Approve user:', userId);
      AlertRN.alert('User Approved!');
    }catch(error){
      console.log(error);
      AlertRN.alert('Error in saving changes!');
    }
  }

  const [editModal, setEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [editForm, setEditForm] = useState<User>({
    id: "",
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    role: "",
    isActive: "",
    isVerified: "",
    createdAt: ""
  })
  const handleEditUser = async (userId:string|number) => {
    try{
      const result = await api.owner.update(editForm, selectedUser.id);
      fetchUsers();
      console.log('Edit user:', userId);
      AlertRN.alert('Accound updated!');
    }catch(error){
      console.log(error);
      AlertRN.alert('Error in saving changes!');
    }
  };

  const handleDeleteUser = async (userId: string|number) => {

    try{
      const result = await api.owner.delete(selectedUser.id);
      fetchUsers();
      console.log('Delete user:', userId);
      AlertRN.alert('Accound Deleted!');
    }catch(error){
      console.log(error);
      AlertRN.alert('Error in saving changes!');
    }
  };

  return (
    <StaticScreenWrapper
      style={[GlobalStyle.GlobalsContainer]}
      contentContainerStyle={[GlobalStyle.GlobalsContentContainer]}
    >
      <ScrollView>
        <Box style={{
          gap: Spacing.md,
          padding: Spacing.md
        }}>
          {users.map((user) => (
            <HStack key={user.id}
              style={{
                // borderColor: 'red',
                // borderWidth: 3, 
                padding: Spacing.md,
                borderRadius: BorderRadius.md,
                backgroundColor: Colors.PrimaryLight[6],
              }}
            >
              <VStack>
                <Heading>
                  <Text style={[s.Text]}>{user.username}</Text>
                </Heading>
                <HStack>
                  <Text style={[s.Text]}>{user.firstname} </Text>
                  <Text style={[s.Text]}>{user.lastname}</Text>
                </HStack>
              </VStack>
              <HStack style={{marginLeft: 'auto', alignItems: 'center', gap: Spacing.md}}>
                {String(user.isVerified) == 'false' && (
                  <ButtonRN style={{backgroundColor: 'green'}} onPress={()=>handleApproveUser(user.id)}>
                    <Text style={[s.Text]}>Approve</Text>
                  </ButtonRN>
                )}
                <ButtonRN style={{backgroundColor: Colors.PrimaryLight[2]}} onPress={()=>{setEditModal(true); setSelectedUser(user); setEditForm(user);}}>
                  <Ionicons name="pencil" size={20} />
                </ButtonRN>
                <ButtonRN style={{backgroundColor: 'red'}} onPress={()=>handleDeleteUser(user.id)}>
                  <Ionicons name="trash" size={20} />
                </ButtonRN>
              </HStack>
            </HStack>
          ))}
        </Box>
      </ScrollView>
      {editModal && (
        <Alert
          style={{
            position:"absolute",
            top: '65%',
            left: '50%',
            transform: `translate(-50%, -50%)`,
            justifyContent:"center",
            alignItems:"center",
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}
          >
          <VStack 
            style={{
              gap: Spacing.lg,
              // alignItems: 'stretch',
              height: 500,
              width: '90%',
              padding: Spacing.lg,
              borderRadius: BorderRadius.md,
              backgroundColor: Colors.PrimaryLight[7],
            }}
          >
            <Heading>
              <Text style={[s.Text, {fontSize: Fontsize.h1}]}>Edit User</Text>
            </Heading>
            <ScrollView>
              <FormControl>
                <FormControl.Label>
                  <Text  style={[s.FormLabel]}>Username</Text>
                </FormControl.Label>
                <Input>
                  <InputField 
                    value={editForm?.username}
                    onChangeText={(text: string)=>setEditForm({...editForm, username: text})}
                    style={[s.FormTextInput]}
                  />
                </Input>
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text  style={[s.FormLabel]}>Firstname</Text>
                </FormControl.Label>
                <Input>
                  <InputField 
                    value={editForm?.firstname}
                    onChangeText={(text: string)=>setEditForm({...editForm, firstname: text})}
                    style={[s.FormTextInput]}
                  />
                </Input>
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text  style={[s.FormLabel]}>Lastname</Text>
                </FormControl.Label>
                <Input>
                  <InputField 
                    value={editForm?.lastname}
                    onChangeText={(text: string)=>setEditForm({...editForm, lastname: text})}
                    style={[s.FormTextInput]}
                  />
                </Input>
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text  style={[s.FormLabel]}>Email</Text>
                </FormControl.Label>
                <Input>
                  <InputField 
                    value={editForm?.email}
                    onChangeText={(text: string)=>setEditForm({...editForm, email: text})}
                    style={[s.FormTextInput]}
                  />
                </Input>
              </FormControl>

              <FormControl style={{paddingTop: 20}}>
                <FormControl.Label>
                  <Text  style={[s.FormLabel]}>Role</Text>
                </FormControl.Label>
                <Text 
                  style={[s.FormTextInput]}
                >{editForm?.role}</Text>
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text  style={[s.FormLabel]}>Verified</Text>
                </FormControl.Label>
                <Text 
                  style={[s.FormTextInput]}
                >{String(editForm?.isVerified)}</Text>
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text  style={[s.FormLabel]}>Active</Text>
                </FormControl.Label>
                <Text 
                  style={[s.FormTextInput]}
                >{String(editForm?.isActive)}</Text>
              </FormControl>
              <FormControl>
                <FormControl.Label>
                  <Text  style={[s.FormLabel]}>Created At</Text>
                </FormControl.Label>
                <Text 
                  style={[s.FormTextInput]}
                >{String(editForm?.createdAt)}</Text>
              </FormControl>
            </ScrollView>
            <VStack>
              <Button 
                variant='primary'
                onPressAction={()=>{setEditModal(false)}} 
                >
                <Text style={[s.TextButton]}>Cancel</Text>
              </Button>
              <Button 
                variant='primary'
                onPressAction={()=>{setEditModal(false); handleEditUser(selectedUser?.id)}} 
              >
                <Text style={[s.TextButton]}>Save</Text>
              </Button>
            </VStack>
          </VStack>
        </Alert>
      )}
    </StaticScreenWrapper>
  )
}

const s = StyleSheet.create({
  FormLabel:{
    fontSize: Fontsize.base, 
    color: Colors.TextInverse[1], 
    paddingTop: Spacing.sm
  },
  FormTextInput:{
    fontSize: Fontsize.base,
    padding: Spacing.xs,
    backgroundColor: Colors.PrimaryLight[2],
    margin: 0,
  },
  Text:{
    color: Colors.TextInverse[2]
  },
  TextInput:{
    color: Colors.TextInverse[3]
  },
  TextButton:{
    color: 'black'
  }
})

export default OwnerManagement;