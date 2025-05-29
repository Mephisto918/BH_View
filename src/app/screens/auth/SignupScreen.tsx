import React from 'react'
import {View, Text} from 'react-native'


// styles
import { GlobalStyle } from '@/src/constants'

// UI Layout
import StaticScreenWrapper from '@/src/components/layout/StaticScreenWrapper'
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
