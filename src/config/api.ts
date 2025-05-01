// please yawa, built in na and process.env, gamitag `EXPO_PUBLIC_NAME`
export default {
  BASE_URL: process.env.EXPO_PUBLIC_BASE_URL,
  PORT: process.env.EXPO_PUBLIC_BACKEND_PORT,
};

console.log("yawa",process.env.EXPO_PUBLIC_BASE_URL,process.env.EXPO_PUBLIC_BACKEND_PORT)
