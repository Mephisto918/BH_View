@echo off
cd /d %~dp0

for /f "tokens=2 delims=:" %% in ('ipconfig ^| findstr /i "IPv4"') do set MY_IP=%%a
set MY_IP=%MY_IP:~1%
cd ..
echo EXPO_BASE_IP=http://%MY_IP%> .env



