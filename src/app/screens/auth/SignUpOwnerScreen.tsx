import { View, Text, StyleSheet, Alert } from 'react-native'
import React, {useState} from 'react'

// api
import Api from '@/src/services/apiEndpoints'

// UI layout
import StaticScreenWrapper from '@/src/components/layout/StaticScreenWrapper'

// UI Component
import Button from '@/src/components/ui/Button'
import TextInput from '@/src/components/ui/TextInput'

// Global Styles
import { BorderRadius, Colors, Fontsize, GlobalStyle, Spacing } from '@/src/constants'

// routing
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SignUpStackParamList } from '../../types/navigation/navigationTypes'

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
    // chat gpt baya ni kay kapoy na 
    console.log(form);
    if (form.password !== form.confirmPassword) {
      Alert.alert("Password Mismatch", "Password and Confirm Password must match.");
      return;
    }

    for (const [key, value] of Object.entries(form)) {
      if (!value.trim()) {
        Alert.alert('Missing Field', `Please fill in the ${key}`);
        return;
      }
    }

    try{
      // reson there is no shorcutting like (res.ok) is it is handled on the wrapper, see {Api} class above
      const res: any = await api.owners.create(form);

      // console.log(res);
      // if(!res) console.log('res', res);

      Alert.alert("You are registered!")
      setForm({username: '',firstname: '',lastname: '',email: '',password: '', confirmPassword: ''})
      route.navigate('SignUpSuccessScreen')
    }catch(error: any){
      console.log('signup error: ',error);
      Alert.alert('Error', error.message);
    }
  }

  function handleCancel(){
    route.navigate('SignUpSelectUserTypeScreen')
  }

  return (
    <StaticScreenWrapper
      behavior='padding'
      scrollable={true}
      style={[GlobalStyle.Globals, s.StaticScreenWrapper]}
      keyboardVerticalOffset={100}
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
            Create Account as a Owner
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
                  // borderColor: 'red',
                  // borderWidth: 2,
                  // height: 20,
                  margin: 0,
                }}
                containerStyle={{
                  borderRadius: BorderRadius.md,
                }}
              />
            </View>
          ))}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            gap: Spacing.md,
            marginTop: Spacing.base
          }}
        >
          <Button 
            title='Cancel'
            onPressAction={handleCancel}
            containerStyle={{
              backgroundColor: Colors.Alert
            }}
          />
          <Button 
            title='Create'
            onPressAction={handleSubmit}
          />
        </View>
      </View>
    </StaticScreenWrapper>
  )
}

const s = StyleSheet.create({
  StaticScreenWrapper:{
    flex: 1,
    backgroundColor: Colors.PrimaryLight[8],
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingVertical: 40
  },
  container:{
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    // borderColor: 'yellow',
    // borderWidth: 3,
    width: '90%',
    // gap: Spacing.xxl,

    // height: "auto",
    // padding: Spacing.lg
  }
})

export default SignUpOwnerScreen