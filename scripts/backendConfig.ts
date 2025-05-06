const os = require('os');
const fs = require('fs');

function getBackendIP(){
  const interfaces = os.networkInterfaces();
  
  for(let iface of Object.values(interfaces)){
    if(Array.isArray(iface)){
      for(let alias of iface || []){
        if(alias.family === 'IPv4' && !alias.internal){
          return alias.address;
        }
      }
    }
  }
  
  return "127.0.0.1";
}

const IP = getBackendIP();
const env_port = 3000;
const apiUrl = `http://${IP}:`

// console.log(`http://${IP}:${env_port}`)

fs.writeFileSync('.env', `
  EXPO_PUBLIC_BASE_URL=${apiUrl}\n
  EXPO_PUBLIC_BACKEND_PORT=${env_port}`);