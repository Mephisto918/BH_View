import { ExpoConfig, ConfigContext } from "@expo/config";
import type { MapLibrePluginProps } from "@maplibre/maplibre-react-native";
import "dotenv/config";

export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "BH Hunter",
  slug: "bh-hunter",
  version: "1.0.0",
  extra: {
    api: {
      baseUrl: `${process.env.EXPO_PUBLIC_BASE_URL}${process.env.EXPO_PUBLIC_BACKEND_PORT}`, // ✅ must be prefixed
    },
    eas: {
      projectId: "4e9a4dd3-5be7-4a1b-94cf-1b1431d12e5c", // Ensure projectId is included
    },
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  plugins: [
    [
      "@maplibre/maplibre-react-native",
      { // this is suppose to target andriod or ios version for compatibility reasons
        // android: {
        //   nativeVersion: "x.x.x",
        // },
        // ios: {
        //   nativeVersion: "x.x.x",
        // },
      } as MapLibrePluginProps,
    ],
  ],
  scheme: "yourapp",
});
