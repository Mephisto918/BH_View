import "react-native-reanimated"; // 👈 MUST BE FIRST

import * as React from "react";
import { Provider } from "react-redux";
import RootNavigation from "./navigation/RootNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "./store/stores";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import { Provider as PaperProvider } from "react-native-paper";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PaperProvider>
        <Provider store={store}>
          <GluestackUIProvider config={config}>
            <RootNavigation />
          </GluestackUIProvider>
        </Provider>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}
