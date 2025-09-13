const ENV = process.env.EXPO_PUBLIC_ENVIRONMENT || "DEVELOPMENT";

const BASE_URL =
  ENV === "PRODUCTION"
    ? "https://bhhph.online" // your VPS
    : process.env.EXPO_PUBLIC_BASE_URL; // local IP

const PORT = ENV === "DEVELOPMENT" ? process.env.EXPO_PUBLIC_BACKEND_PORT : ""; // production usually has no extra port

// Only append colon if PORT exists
const BASE = PORT ? `${BASE_URL}:${PORT}` : BASE_URL;

export default {
  BASE_URL: BASE,
};

console.log("Base Url: ", BASE);
