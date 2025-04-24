import { ExpoConfig, ConfigContext } from '@expo/config';
import 'dotenv/config'
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: "GG View",
  slug: "GG View",
  version: "1.0.0",
  extra: { // reserved keyword
    api:{
      baseUrl: process.env.EXPO_BASE_URL,
    }
  },
  experiments: {
    turboModules: true,
  },
  updates: {
    fallbackToCacheTimeout: 0,
  },
  scheme: "yourapp", // optional, good for future linking
});