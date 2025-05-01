import { View, Text, Image, StyleSheet, StyleProp, ViewStyle, ImageStyle, ImageProps } from 'react-native'
import React from 'react'

interface LogoProps extends ImageProps{
  containerStyle?: StyleProp<ViewStyle>,
  imageStyle?: StyleProp<ImageStyle>,
  squareScale?: number,
}

const Logo = ({containerStyle, imageStyle, squareScale, ...props}: LogoProps) => {
  // const hasHW = [{ height: squareScale, aspectRatio: 1}, imageStyle]
  const hasHW = [imageStyle]
  return (
    <View style={[s.default, containerStyle]}>
      <Image style={[hasHW, s.img]} {...props} resizeMode='contain'/>
    </View>
  )
}

const s = StyleSheet.create({
  default: {
    padding: 0,
    margin: 0,    
  },
  img:{
    width: '100%'
  }
})

export default Logo