const BASEURL =
  process.env.EXPO_PUBLIC_ENVIRONMENT === "DEVELOPMENT"
    ? process.env.EXPO_PUBLIC_BASE_URL
    : "https://bhhph.online";
const PORT =
  process.env.EXPO_PUBLIC_ENVIRONMENT === "DEVELOPMENT"
    ? process.env.EXPO_PUBLIC_BACKEND_PORT
    : "";
const BASE = `${BASEURL}${PORT}`;

export default {
  BASE_URL: BASE,
};

console.log("Base Url: ", BASE);
