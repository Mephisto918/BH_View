import "react-native-reanimated";
import * as React from "react";
import { useEffect } from "react";
import { Provider } from "react-redux";
import RootNavigation from "./navigation/RootNavigation";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { store } from "./store/stores";
import { GluestackUIProvider } from "@gluestack-ui/themed";
import { config } from "@gluestack-ui/config";
import Purchases from "react-native-purchases";

export default function App() {
  // Initialize RevenueCat
  // useEffect(() => {
  //   Purchases.configure({
  //     apiKey: "YOUR_REVENUECAT_PUBLIC_API_KEY",
  //     appUserID: null, // optional
  //   });

  //   // Enable debug logs in dev builds
  //   if (__DEV__) {
  //     Purchases.setDebugLogsEnabled(true);
  //     console.log("RevenueCat debug logs enabled");
  //   }
  // }, []);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <GluestackUIProvider config={config}>
          <RootNavigation />
        </GluestackUIProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
