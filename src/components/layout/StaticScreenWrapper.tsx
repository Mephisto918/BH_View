import { View, SafeAreaView, KeyboardAvoidingView, ScrollView, StyleProp, ViewStyle, StyleSheet } from 'react-native'
import React from 'react'

interface Props{
  scrollable?: boolean
  children: React.ReactNode
  behavior?: "padding" | "height" | "position" | undefined
  containerStyleDebug?: StyleProp<ViewStyle>
}

const StaticScreenWrapper = ({scrollable = false, children, behavior = 'padding', containerStyleDebug }: Props) => {
  return (
    <SafeAreaView style={[{ flex: 1 }, s.con]}>
      <KeyboardAvoidingView behavior={behavior} style={{ flex: 1 }}>
        {scrollable ? (
          <ScrollView contentContainerStyle={[{ flexGrow: 1 }, containerStyleDebug]}>
            {children}
          </ScrollView>
        ) : (
          <View style={[{ flex: 1 }, containerStyleDebug]}>
            {children}
          </View>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const s = StyleSheet.create({
  con:{
  }
})

export default StaticScreenWrapper