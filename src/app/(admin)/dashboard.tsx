import { View, Text, StyleSheet, FlatList } from 'react-native'
import React from 'react'
import { GlobalStyle } from '@/src/constants/Globals'
import { useState, useEffect } from 'react'
import Constants from 'expo-constants';

type UserType = {
  id: number;
  fullname: string;
  email: string
}

const dashboard = () => {
  const [users, setUsers] = useState<UserType[]>([]);

  const ip = Constants.expoConfig?.extra?.baseUrl;
  useEffect(()=>{
    const fetchUsers = async () => {
      try{
        const res = await fetch(`${ip}/users`);
        const json = await res.json();

        if (json.success){
          setUsers(json.data.data);
        }else{
          console.log('Fetch Failed!:', json);
        }
      }catch(err){
        console.log('ip for debug line 28: ',ip)
        console.log('backend cant reach line 29 :',err)
      }
    }

    fetchUsers()
  }, [])

  console.log('Users:', users); // ✅ put it here

  return (
    <View style={GlobalStyle.Globals}>
      {users && users.length > 0 ? (
        <FlatList
          data={users}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <View>
              <Text>{item.fullname}</Text>
              <Text>{item.email}</Text>
            </View>
          )}
        />
      ) : (
        <Text>Loading or No users found</Text>
      )}
    </View>
  )
}

const s = StyleSheet.create({
  con_main:{
    borderColor: 'red',
    borderWidth: 2,
  }
})

export default dashboard