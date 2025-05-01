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
    map: 'MapScreen',
    notification: 'NotificationScreen',
    settings: 'SettingsScreen',
  }
} as const;