export const Routes = {
  login: 'LoginScreen',
  signup: 'SignupScreen',
  owner:{
    properties: 'PropertiesScreen',
    books: 'BooksScreen',
    dashboard: 'DashboardScreen',
    notification: 'NotificationScreen',
    settings: 'SettingsScreen',
  },
  tenant:{
    dashboard: 'DashboardScreen',
    booking: 'BookingScreen',
    map: 'MapTabScreen',
    notification: 'NotificationScreen',
    settings: 'SettingsScreen',
  },
  settings:{
    
  }
} as const;