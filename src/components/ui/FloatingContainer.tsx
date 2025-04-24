import { View, Text, StyleSheet, StyleProp, ViewStyle } from 'react-native'
import React from 'react'

interface FloatingContainerProps {
  containerStyle?: StyleProp<ViewStyle>,
  children?: React.ReactNode
}


const FloatingContainer = ({containerStyle, children}: FloatingContainerProps) => {
  return (
    <View style={[s.default_container, containerStyle]}>
      {children ?? <>
        <Text>Floating Container is Empty</Text>
      </> }
    </View>
  )
}

const s = StyleSheet.create({
  default_container:{
    position: 'absolute',
    top: 0,
    left: 0,

    height: 200,
    aspectRatio: 1/1,
    backgroundColor: '#09090990',
    justifyContent: 'center',
    alignItems: 'center',
  }
});

export default FloatingContainer