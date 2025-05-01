import { View, Text, StyleSheet,  FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'

import { GlobalStyle } from '@/src/constants/Globals'

interface User{
  id: number | string;             // ← it's a number from backend
  username: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  savings: string;
  role: string;
  created_at: string;
}

interface ItemBoxProps{
  item: User,
  handleEdit: (id:string|number)=>void,
  handleDelete: (id:string|number)=>void
}
const ItemBox = ({item, handleEdit, handleDelete}: ItemBoxProps)=>{
  
  return (
    <View style={s.container_item}>
      <View>
        <Text >{item.username}</Text>
        <Text >{item.email}</Text>
      </View>
      <View style={s.container_actionGroups}>
        <TouchableOpacity style={s.container_actionItems} onPress={() => handleEdit(item.id)}>
          <Ionicons name="create-outline" size={24} color="blue" />
        </TouchableOpacity>
        <TouchableOpacity style={s.container_actionItems} onPress={() => handleDelete(item.id)}>
          <Ionicons name="trash-outline" size={24} color="red" style={{ marginLeft: 10 }} />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const ParentsManagement = ()=> {
  const [users, setUsers] = useState<User[]>([])

  // karon ra bitaw ni 
  const api = 'http://192.168.47.117:8000';
  const endpoint = '/parents'
  console.log(api+endpoint)

  useEffect(()=>{
    fetchUsers();
  }, [])

  const fetchUsers = async ()=>{
    try{
      const res = await fetch(api+endpoint);
      console.log(api+endpoint)
      const data = await res.json();

      // console.log(res.json)
      if (data.success && Array.isArray(data.data)) {
        console.log(data)
        setUsers(data.data); // Set the users correctly
      } else {
        console.log('Error: Invalid data structure');
      }
    }catch(error){
      console.log('yawa line 20',error);
    }
  }

  const handleEdit = (userId:string|number) => {
    console.log('Edit user:', userId);
    // Placeholder for editing
  };

  const handleDelete = (userId: string|number) => {
    console.log('Delete user:', userId);
    // Placeholder for deleting
  };

  return (
    <View style={[GlobalStyle.Globals, s.default]}>
      <FlatList 
        data={users}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={
          ({item})=> <ItemBox item={item} handleEdit={handleEdit} handleDelete={handleDelete}/>
        }

      />
    </View>
  )
}

const s = StyleSheet.create({
  default:{
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 3,
    paddingTop: 20,
    padding: 10
  },
  container_item:{
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#eef',
    padding: 15,
    width: '100%',
    marginBottom: 12,
    borderRadius: 8,
    borderColor: 'red',
    borderWidth: 3,
  },
  container_actionGroups:{
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'blue',
    borderWidth: 3
  },
  container_actionItems:{
    flexDirection: 'row',
    gap: 10,
  }
})

export default ParentsManagement;