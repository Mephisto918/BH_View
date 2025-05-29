import { View, Text ,StyleSheet, ImageStyle} from 'react-native'
import React, {useState} from 'react'

// UI Layout
import StaticScreenWrapper from '@/src/components/layout/StaticScreenWrapper'

// UI comopnent
import TextInput from '@/src/components/ui/TextInput'
import Logo from '@/src/components/ui/Logo'
import Button from '@/src/components/ui/Button'

// constants
import { Colors, Fontsize, BorderRadius, Spacing, GlobalStyle, ShadowLight, BorderWidth } from '@/constants'

// Routing
import { useNavigation } from '@react-navigation/native'
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList, AuthStackParamList, AdminTabsParamList } from '../../types/navigation/navigationTypes'

// api call 
import Api from '@/src/services/apiEndpoints'

interface jsonPayload {
  data: {
    role: string
  }
}

interface payload {
  username: string | null,
  password: string | null
}

const LoginScreen = () => {
  const rootNavigation = useNavigation<BottomTabNavigationProp<RootStackParamList>>();
  const authNavitaion = useNavigation<NativeStackNavigationProp<AuthStackParamList>>();

  const [username, setUsername] = useState({value: '', error: false});
  const [password, setPassword] = useState({value: '', error: false});

  // api call
  const api = new Api();

  const onPressLogin = async () => {
    const packageLoad = {
      username: username.value,
      password: password.value
    }
    const res = await api.auth.login<jsonPayload, payload>(packageLoad);
    console.log(res);
    const role = res.data.role;

    if(role == 'admin') return rootNavigation.navigate('AdminTabs');
    if(role == 'owner') return rootNavigation.navigate('OwnerTabs');
    if(role == 'tenant') return rootNavigation.navigate('TenantTabs');;
  }

  const onPressSignup = () => {
    authNavitaion.navigate('SignUpStack');
  }
  return (
    <StaticScreenWrapper
      scrollable={false}
      
    >
      <View style={[GlobalStyle.Globals, s.default]}>
        <View
          style={[s.Container]}
        >
          <Logo
            // eslint-disable-next-line @typescript-eslint/no-require-imports 
            source={require('../../../assets/logos/LogoNameDark.png')}
            // squareScale={350}
            containerStyle={s.logo_Container}
            imageStyle={s.logo_Image}
          />
          <View style={[s.Form]}>
            <View style={[s.Form_Inputs]}>
              <TextInput
                placeholder='Username'
                iconName='person'
                variant='primary'
                value={username.value}
                onChangeText={text=>setUsername({value: text, error: false})}
                containerStyle={s.Form_InputContainer}
                textInputStyle={s.Form_InputText}
                iconStyle={s.Form_InputIcon}
              />
              <TextInput
                variant='primary'
                iconName='lock-closed'
                placeholder='Username'
                value={password.value}
                onChangeText={text=>setPassword({value: text, error: false})}
                containerStyle={s.Form_InputContainer}
                textInputStyle={s.Form_InputText}
                iconStyle={s.Form_InputIcon}
              />
            </View>
            <View style={[s.Form_Buttons]}>
              <Button
                title='Login'
                variant='primary'
                onPressAction={onPressLogin}
                textStyle={s.Form_Bottons_Login_Text}
              >
              </Button>
              <Button
                title='Dont have an Account?'
                containerStyle={s.Form_Bottons_Signup_Container}
                textStyle={s.Form_Bottons_Signup_Text}
                onPressAction={onPressSignup}
              >
              </Button>
            </View>
          </View>
        </View>
      </View>
    </StaticScreenWrapper> 
  )
}

const s = StyleSheet.create({
  default:{
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.PrimaryLight[9],

  },
  Container:{
    backgroundColor: 'transparent',
    flex: 1,
    width: '90%',
    
    position: 'relative',
    
    justifyContent: 'center',
    alignItems: 'center',
  },
  
  logo_Container:{
    alignSelf: 'stretch',
    top: undefined,
    position: undefined,
    padding: 0,
    left: 0,
    right: 0,
  },
  logo_Image:{
    height: 125,
  } as ImageStyle,
  
  Form:{
    height: 300,
    width: "90%",
    
    backgroundColor: Colors.PrimaryLight[7],
    borderColor: Colors.PrimaryLight[5],
    borderWidth: BorderWidth.lg,
    borderRadius: BorderRadius.xl,
    
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.base,

    ...ShadowLight.xxl,
  },
  Form_Inputs:{
    // borderColor: 'blue',
    // borderWidth: 6,
    width: '100%',
    gap: 12,
  },
  Form_InputContainer:{

  },
  Form_InputIcon:{
    color: Colors.Primary[8]
  },
  Form_InputText:{
    fontSize: Fontsize.lg, 
    padding: Spacing.xs
  },
  Form_Buttons:{
    marginTop: 'auto',
    // flex: 1,
    justifyContent: 'flex-start',
    alignSelf: 'stretch',
    alignItems: 'center'
  },
  Form_Bottons_Login_Container:{
    borderColor: 'green',
    borderWidth: 3,
    flex: 1,
    alignSelf: 'stretch',
    width: '100%',
  },
  Form_Bottons_Login_Text:{
    color: Colors.Text[2],
    fontSize: Fontsize.h3,
    fontWeight: '700'
  },
  Form_Bottons_Signup_Container:{
    borderWidth:0,
    margin: 0,
    padding: 0,
    backgroundColor: 'transparent',
    textDecorationLine: 'underline',
    height: 'auto',
  },
  Form_Bottons_Signup_Text:{
    margin: 0,
    padding: 0,
    color: Colors.Text[5],
    fontSize: Fontsize.md,
    fontWeight: 100
  }
});

export default LoginScreen