import React from 'react'
import {View, Text} from 'react-native'


// styles
import { GlobalStyle } from '@/constants'

// UI Layout
import StaticScreenWrapper from '@/components/layout/StaticScreenWrapper'
const SignupScreen = () => {
  return (
    <>
      <StaticScreenWrapper
        style={[GlobalStyle.Globals, {
          backgroundColor: 'red',
        }]}
      >
        <View>
          <Text>Hello</Text>
        </View>
      </StaticScreenWrapper>
    </>
  )
}

export default SignupScreen
