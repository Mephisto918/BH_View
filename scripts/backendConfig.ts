import os from "os";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function getBackendIP(): string {
  const interfaces = os.networkInterfaces();
  for (let iface of Object.values(interfaces)) {
    if (Array.isArray(iface)) {
      for (let alias of iface) {
        if (alias.family === "IPv4" && !alias.internal) {
          return alias.address;
        }
      }
    }
  }
  return "127.0.0.1";
}

const envPath = path.resolve(__dirname, "..", ".env"); // go one level up if script is in scripts/
const IP = getBackendIP();
const env_port = 3000;
const newValues: Record<string, string> = {
  EXPO_PUBLIC_BASE_URL: `http://${IP}`,
  EXPO_PUBLIC_BACKEND_PORT: env_port.toString(),
};

// ⛑️ Explicitly typed to avoid TS7053
const envObj: Record<string, string> = {};

// Load existing .env file if it exists
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, "utf-8");
  envContent.split("\n").forEach((line) => {
    const [key, ...rest] = line.split("=");
    if (key && rest.length > 0) {
      envObj[key.trim()] = rest.join("=").trim();
    }
  });
}

// Update keys
Object.entries(newValues).forEach(([key, value]) => {
  envObj[key] = value;
});

// Write back
const updatedEnvContent = Object.entries(envObj)
  .map(([key, val]) => `${key}=${val}`)
  .join("\n");

fs.writeFileSync(envPath, updatedEnvContent, "utf-8");

console.log(`✅ .env updated with local IP: ${IP}`);
