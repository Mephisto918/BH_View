const BASE = `${process.env.EXPO_PUBLIC_BASE_URL}${process.env.EXPO_PUBLIC_BACKEND_PORT}`;

export default {
  BASE_URL: BASE,
};

console.log('Base Url: ', BASE)