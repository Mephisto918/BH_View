import { View, Text, StyleSheet} from 'react-native'
import React, { useState } from 'react'

import { GlobalFontSize, GlobalStyle, GlobalColors } from '@/src/constants/Globals'
import Button from '@/src/components/ui/Button'
import TextInput from '@/src/components/ui/TextInput'
import Logo from '@/src/components/ui/Logo'
import Header from '@/src/components/ui/Header'
import FloatingContainer from '@/src/components/ui/FloatingContainer'
import { Link } from 'expo-router'


const Login = () => {
  const [username, setUsername] = useState({value: '', error: ''})
  const [password, setPassword] = useState({value: '', error: ''})
  const [statusMessage, setStatusMessage] = useState('')

  const ip = '192.168.233.117'

  const logIn = async ({username, password}: {username: string, password: string}) => {
    try{
      const res = await fetch(`http://${ip}:8000/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password
        })
      })

      const result = await res.json()

      if (res.ok){
        return 'ok'
      }else{
        return 'bad'
      }
    }catch(err){
      console.log("error login", err);
      return 'error'
    }


  }
  const onPressLogin = async () =>{
    const status = await logIn({
      username: username.value, 
      password: password.value  
    });
    
    if(status === 'ok'){
      setStatusMessage('Login successful')
    }else if(status === 'bad'){
      setStatusMessage('Wrong Password')
    }else{
      setStatusMessage('Internal Server Error')
    }

  }

  return (
    <View style={[GlobalStyle.Globals, s.con]}>
      <Logo
        source={require('../../assets/logos/LogoNameLight.png')}
        squareScale={350}
        containerStyle={s.logoStyle}
        imageStyle={s.logoImageStyle}
      />
      <FloatingContainer
        containerStyle={s.floating_container}
      >
        <Link style={s.floating_link} href={'/(admin)/dashboard'}>Users Table</Link>
      </FloatingContainer>
      <View 
        style={s.mainCon}
      >
        <Header 
          textStyles={s.header_text}
          containerStyle={s.header_container}
          title='Login to your Account'
        />
        <View style={s.error_container}>
          <Text style={s.error_text}>{statusMessage ?? ''}</Text>
        </View>
        <View style={s.inputContainerStyle}>
          <TextInput
            containerStyle={s.inputItemContainerStyle}
            labelStyle={s.inputLabelStyle}
            textInputStyle={s.inputTextStyle}
            placeholder='username'
            value={username.value}
            onChangeText={ text=> setUsername({value: text, error: ''})} 
            />
          <TextInput
            containerStyle={s.inputItemContainerStyle}
            labelStyle={s.inputLabelStyle}
            textInputStyle={s.inputTextStyle}
            placeholder='password'
            secureTextEntry={true}
            value={password.value} 
            onChangeText={ text => setPassword({value: text, error: ''})}
          />
          <Link href='/signup' style={s.link_forgotPassword}>Forgot Password</Link>
        </View>
        <View>
          <Button
            onPressLogin={onPressLogin}
            title='Login'
            containerStyle={s.bttStyle}
            textStyle={s.bttTextStyle}
          />
          <Link href='/signup' style={s.link_createAccount}>Create Account</Link>
        </View>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  error_container: {
    marginBottom: 20,
    width: "100%",
    height: 60,
    borderColor: 'transparent',
    borderWidth: 2,
    borderRadius: 5,
    justifyContent: 'center'
  },
  error_text:{
    textOverflow: 'wrap',
  },
  logoStyle:{
    top: '18%',
    padding: 0,
  },
  logoImageStyle:{
    height: 125,
  },

  con: {
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center'
  },
  mainCon: {
    height: 300,
    width: "80%",
    
    borderRadius: 20,

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  header_container:{
    borderColor: 'transparent',
    borderWidth: 0,
    backgroundColor: 'transparent',

    marginBottom: 20,
  },
  header_text:{
    fontFamily: GlobalStyle.HeadingsFont.fontFamily,
    fontSize: GlobalFontSize.h2,
    fontWeight: 900,
  },
  
  
  inputContainerStyle: {
    alignItems: 'stretch',
    borderRadius: 5,
    
    flexDirection: 'column',
    gap: 10,
  },
  inputItemContainerStyle:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    backgroundColor: GlobalColors.SecondaryLight,
    color: 'white',
    
    borderColor: GlobalColors.BorderDark,
    borderWidth: 3,
    borderRadius: 5,
  },
  inputLabelStyle:{

  },
  inputTextStyle:{
    borderRadius: 10,
    fontSize: GlobalFontSize.base,
    padding: 8,
    width: '100%',

  },

  bttStyle:{
    marginTop: 40,
    backgroundColor: GlobalColors.Secondary,
    borderColor: GlobalColors.BorderDark,
    borderWidth: 2,
    borderRadius: 10,
  },
  bttTextStyle:{
    color: GlobalColors.Text,
    fontSize: GlobalFontSize.h3,
  },

  link_forgotPassword: {
    marginTop: 0,
    marginLeft: 'auto',
    fontSize: GlobalFontSize.sm
  },
  link_createAccount: {
    alignSelf: 'center',
    textDecorationLine: 'underline',
    fontSize: GlobalFontSize.lg,
  },

  floating_container: {
    height: 60,
    backgroundColor: 'red',
    borderRadius: 10,
    bottom: 0,
    top: null,
  },
  floating_link: {
    width: '100%',
    height: '100%',
  },
})

export default Login