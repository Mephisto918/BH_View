import { View, ViewStyle, StyleSheet, StyleProp, TextInput, TextInputProps } from 'react-native'
import React from 'react'

import { Ionicons } from '@expo/vector-icons'

interface SearchProps {
  containerStyle?: StyleProp<ViewStyle>
  textPlaceHolderStyle?: StyleProp<TextInputProps>
  placeholder: string
  value: string
  setValue: (value: string) => void
}

export default function HeaderSearch({containerStyle, textPlaceHolderStyle, placeholder, value, setValue, ...props}: SearchProps) {
  return (
    <View style={[s.default, containerStyle]}>
      <TextInput
        style={[s.text_placeholder, textPlaceHolderStyle]}
        placeholder={placeholder}
        value={value}
        onChangeText={setValue}
        {...props}
      />
      {!value.length && (
        <>
          <Ionicons name="search" size={30} style={{  }}/>
        </>
      )}
    </View>
  )
}

const s = StyleSheet.create({
  default:{
    position: 'absolute',
    top: 0,
    // left: '50%',
    flexDirection: 'row',
    alignItems: 'center'},
  text_placeholder:{
    flex: 1,
    fontSize: 23,
  }
})