import { View, Text, StyleProp, ViewStyle, TextStyle, StyleSheet } from 'react-native'
import React from 'react'
import { Colors, Fontsize, GlobalStyle } from '@/constants'

interface HeaderProps {
  containerStyle?: StyleProp<ViewStyle>
  textStyles?: StyleProp<TextStyle>
  title?: string
}
const Header = ({containerStyle, textStyles, title = 'HeaderTemplate', ...props}: HeaderProps) => {
    return (
    <View style={[s.defaultStyle, containerStyle]} {...props}>
      <Text style={[GlobalStyle.GenericFont, s.defaultTextStyle, textStyles]}>{title}</Text>
    </View>
  )
}

const s = StyleSheet.create({
  defaultStyle:{
    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: Colors.Background, 
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 8,
    
    padding: 0,
    margin: 0,
    width: 'auto',
    height: 50,
  },
  defaultTextStyle:{
    color: Colors.Text[1],
    fontSize: Fontsize.xxl,
  }
})

export default Header
