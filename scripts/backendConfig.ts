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
const PORT = 8000;
const apiUrl = `http://${IP}:${PORT}`

fs.writeFileSync('.env', `EXPO_BASE_URL=${apiUrl}\n`);