// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: 'expo',
  ignorePatterns: ['/dist/*'],
  rules:{
    'react-native/no-inline-styles': 'off',
    'react-native/no-unused-styles': 'warn',
    'react-native/no-raw-text': 'warn', // catches the error you got!
  }
};
