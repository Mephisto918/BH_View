import { StyleSheet } from 'react-native'

export const GlobalColors = {
  Primary: '#4F9DDE',
  PrimaryLight: '#D6ECFA',

  Secondary: '#FDD85D',
  SecondaryLight: '#FFF2C2',

  Background: '#FFFFFF',         
  BackgroundDark: '#1A1A1A',

  Accent: '#9B51E0',
  Neutral: '#F5F5F5',

  Border: '#E0E0E0',
  BorderDark: '#3A3A3A',

  Text: '#2E2E2E',
  TextLight: '#F5F5F5', // Neutral color for light text

  Card: '#FAFAFA',
  
  Disabled: '#C4C4C4',
  Overlay: 'rgba(0,0,0,0.3)',
  Highlight: '#FF6F91',
  
  Success: '#80CFA9',
  SuccessLight: '#D8F3E3',
  Alert: '#F78C6B',
  AlertLight: '#FFE0D9',
}

export const GlobalFontSize = {
  xs: 12,  // 12px for small text
  sm: 14,  // 14px for small text
  md: 15,  // 15px for medium text
  base: 16, // 16px for body text (default)
  lg: 18,  // 18px for larger body text
  xl: 20,  // 20px for extra-large body text
  xxl: 22, // 22px for extra-extra-large text
  h3: 24,  // 24px for smaller headings
  h2: 28,  // 28px for larger headings
  h1: 32,  // 32px for main headings
  display1: 40,  // 40px for very large headings
  display2: 48,  // 48px for display-level headings
  display3: 56,  // 56px for large display headings
  display4: 64  // 64px for extreme display-level headings
}

export const GlobalStyle = StyleSheet.create({
  Globals:{
    backgroundColor: GlobalColors.PrimaryLight,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1
  },
  fontColor:{
    color: GlobalColors.Text,
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
