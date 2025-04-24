import { View, Text, TextInput as TI, StyleProp, StyleSheet, ViewStyle, TextStyle } from 'react-native'
import React from 'react'

interface TextInputProps extends React.ComponentProps<typeof TI>{
  label?: string
  placeholder?: string
  containerStyle?: StyleProp<ViewStyle>
  labelStyle?: StyleProp<TextStyle>
  textInputStyle?: StyleProp<TextStyle>
}

const TextInput = ({ label, placeholder, containerStyle, labelStyle, textInputStyle, ...TextInputProps }: TextInputProps) => {
  
  return (
    <View style={[s.defaultStyle, containerStyle]}>
      {label && <Text style={[s.defaultLabelStyle, labelStyle ]}>{label}</Text>}
      <TI
        style={[s.defaultTextInputStyle, textInputStyle]}
        placeholder={placeholder ?? ''}
        {...TextInputProps}
      />
    </View>
  )
}

const s = StyleSheet.create({
  defaultStyle:{
    margin: 0,
    padding: 0,
  },
  defaultLabelStyle:{
    margin: 0,
    padding: 0
  },
  defaultTextInputStyle:{
    margin: 0,
    padding: 0,
  }
})

export default TextInput