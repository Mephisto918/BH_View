import 'react-native-reanimated';
import * as React from 'react';
import { Provider } from 'react-redux';
import RootNavigation from './navigation/RootNavigation';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from '../stores';

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}> 
      <Provider store={store}>
          <RootNavigation />
      </Provider>   
    </GestureHandlerRootView>
  );
}