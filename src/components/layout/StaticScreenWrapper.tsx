import { View, SafeAreaView, KeyboardAvoidingView, ScrollView, StyleProp, ViewStyle, StyleSheet } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import React from 'react'

interface Props{
  scrollable?: boolean
  virticalScrollIndicator?: boolean
  children: React.ReactNode
  behavior?: "padding" | "height" | "position" | undefined
  style?: StyleProp<ViewStyle>
  keyboardVerticalOffset?: number
}

const StaticScreenWrapper = ({
  keyboardVerticalOffset = 0, 
  scrollable = false, 
  virticalScrollIndicator = true, 
  children, 
  behavior = 'padding', 
  style 
}: Props) => {
  return (
    <SafeAreaView 
      style={[{ flex: 1 }, s.con]}
    >
      <KeyboardAvoidingView 
        behavior={behavior} 
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={{ flex: 1 }}>
          
        <KeyboardAwareScrollView 
          contentContainerStyle={[{ flexGrow: 1 }, style]}
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={virticalScrollIndicator}
          scrollEnabled={scrollable}
        >
          {children}
        </KeyboardAwareScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  con:{
  }
})

export default StaticScreenWrapper