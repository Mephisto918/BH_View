import { StyleSheet } from 'react-native'
import { Colors } from './themes/colors'

export const GlobalStyle = StyleSheet.create({
  Globals:{
    backgroundColor: Colors.PrimaryLight[8],
    justifyContent: 'center',
    alignItems: 'stretch',
    flex: 1
  },
  fontColor:{
    color: Colors.Text[2],
  },
  HeadingsFont:{
    fontFamily: 'Baloo2'
  },
  BodyFont:{
    fontFamily: 'QuickSand'
  },
  AlternativeFont:{
    fontFamily: 'Fredoka'
  },
  GenericFont:{
    fontFamily: 'Segoe UI'
  }
})