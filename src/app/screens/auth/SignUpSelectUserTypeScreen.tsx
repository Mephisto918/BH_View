import { View, Text } from 'react-native'
import React from 'react'

// UI layout
import StaticScreenWrapper from '@/components/layout/StaticScreenWrapper'

// UI components
import Button from '@/components/ui/Button'

// Global Styles
import { Colors, Fontsize, GlobalStyle, Spacing } from '@/constants'

// routing
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { SignUpStackParamList } from '../../types/navigation'

const SignUpSelectUserTypeScreen = () => {
  const route = useNavigation<NativeStackNavigationProp<SignUpStackParamList>>();

  function buttonOwnerPressHandler(){
    route.navigate('SignUpOwnerScreen')
  }

  function buttonTenantPressHandler(){
    route.navigate('SignUpTenantScreen')
  }
  return (
    <>
      <StaticScreenWrapper
        style={[GlobalStyle.GlobalsContainer]}
        contentContainerStyle={[GlobalStyle.GlobalsContentContainer]}
      >
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            // borderColor: 'yellow',
            // borderWidth: 3,
            gap: Spacing.xxl,

            height: "30%",
            padding: Spacing.lg
          }}
        >
          <View>
            <Text 
              style={{
                color: Colors.TextInverse[1],
                fontSize: Fontsize.xl
              }}
            >
              SignUpSelectUserTypeScreen
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              gap: Spacing.md,
            }}
          >
            <Button 
              title='Owner'
              onPressAction={buttonOwnerPressHandler}
              />
            <Button 
              title='Tenant'
              onPressAction={buttonTenantPressHandler}
            />
          </View>
        </View>
      </StaticScreenWrapper>
    </>
  )
}

export default SignUpSelectUserTypeScreen