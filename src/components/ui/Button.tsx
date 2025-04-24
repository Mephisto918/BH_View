import { View, Text, TouchableOpacity, ViewStyle, TextStyle, StyleProp, StyleSheet } from 'react-native'
import React from 'react'
import { GlobalColors, GlobalFontSize, GlobalStyle } from '@/src/constants/Globals'

interface ButtonProps {
  onPressLogin: () => void
  title?: string
  containerStyle?: StyleProp<ViewStyle>
  textStyle?: StyleProp<TextStyle>
}

const Button = ({onPressLogin, title = 'Placeholder!', containerStyle, textStyle}: ButtonProps) => {

  return (
    <TouchableOpacity
      onPress={onPressLogin} 
      style={[s.defaultStyle, containerStyle]}
    >
      <Text style={[GlobalStyle.GenericFont, s.defaultTextStyle, textStyle]}>
        {title}
      </Text>
    </TouchableOpacity>
  )
}

const s = StyleSheet.create({
  defaultStyle:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', 
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
  
    width: 150,
    height: 50,

    margin: 'auto',
  },
  defaultTextStyle:{
    color: GlobalColors.Text,
    fontSize: GlobalFontSize.xl,
    fontWeight: '700'
  }
})

export default Button

