import { StyleSheet } from 'react-native'
import { Colors } from './themes/colors'

export const GlobalStyle = StyleSheet.create({
  GlobalsContainer: {
    flex: 1,
    backgroundColor: Colors.PrimaryLight[8],
  },
  GlobalsContentContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
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