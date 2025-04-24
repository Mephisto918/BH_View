import { View, Text, StyleSheet} from 'react-native'
import React, { useState } from 'react'

import { GlobalFontSize, GlobalStyle, GlobalColors } from '@/src/constants/Globals'
import Button from '@/src/components/ui/Button'
import TextInput from '@/src/components/ui/TextInput'
import Logo from '@/src/components/ui/Logo'
import { Link } from 'expo-router'
import Header from '@/src/components/ui/Header'


const signup = () => {
  const onPressLogin = () => {

  }

  return (
    <View style={[GlobalStyle.Globals, s.con]}>
      <Logo
        source={require('../../assets/logos/LogoNameLight.png')}
        squareScale={350}
        containerStyle={s.logo_container}
        imageStyle={s.logo_imageStyle}
      />
      <View 
        style={s.con_main}
      >
        <Header 
          textStyles={s.header_text}
          containerStyle={s.header_container}
          title='Create Account'
        />
        <View 
          style={s.error_container}
        >
          <Text style={s.error_text}></Text>
        </View>
        <View 
          style={s.input_container}
        >
          <TextInput
            containerStyle={s.input_item}
            labelStyle={s.input_label}
            textInputStyle={s.input_text}
            placeholder='username'
            // onChangeText={ text=> setUsername({value: text, error: ''})} 
            />
          <TextInput
            containerStyle={s.input_item}
            labelStyle={s.input_label}
            textInputStyle={s.input_text}
            placeholder='e-mail'
            // onChangeText={ text=> setUsername({value: text, error: ''})} 
            />
          <TextInput
            containerStyle={s.input_item}
            labelStyle={s.input_label}
            textInputStyle={s.input_text}
            placeholder='password'
            secureTextEntry={true}
            // value={password.value} 
            // onChangeText={ text => setPassword({value: text, error: ''})}
          />
        </View>
        <View>
          <Button
            onPressLogin={onPressLogin}
            title='Register'
            containerStyle={s.btt_container}
            textStyle={s.btt_text}
          />
          <Link href='/login' 
            style={s.link_createAccount}
          >Already Have An Account?</Link>
        </View>
      </View>
    </View>
  )
}

const s = StyleSheet.create({
  logo_container: {
    top: '15%',
    margin: 0,
    padding: 0,
  },
  logo_imageStyle: {
    height: 125,
  },

  header_container:{
    borderColor: 'transparent',
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  header_text:{
    fontFamily: GlobalStyle.HeadingsFont.fontFamily,
    fontSize: GlobalFontSize.h1,
    fontWeight: 900,
  },

  con:{
    flex: 1,

    justifyContent: 'center',
    alignItems: 'center'
  },
  con_main:{
    height: 300,
    width: "80%",
    
    borderRadius: 20,

    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },

  input_container: {
    alignItems: 'stretch',
    borderRadius: 5,
    
    flexDirection: 'column',
    marginTop: 20,
    marginBottom: 40,
    gap: 10,
  },
  input_item:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',

    backgroundColor: GlobalColors.SecondaryLight,
    color: 'white',
    
    borderColor: GlobalColors.BorderDark,
    borderWidth: 3,
    borderRadius: 5,
  },
  input_label:{

  },
  input_text:{
    borderRadius: 10,
    fontSize: GlobalFontSize.base,
    padding: 8,
    width: '100%',
  },

  btt_container:{
    marginTop: 'auto',
    backgroundColor: GlobalColors.Secondary,
    borderColor: GlobalColors.BorderDark,
    borderWidth: 2,
    borderRadius: 10,
  },
  btt_text:{
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

  error_container: {
    marginTop: 20,
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
})

export default signup