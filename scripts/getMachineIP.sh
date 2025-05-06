@REM @echo off
@REM cd /d %~dp0
@REM 
@REM for /f "tokens=2 delims=:" %% in ('ipconfig ^| findstr /i "IPv4"') do set MY_IP=%%a
@REM set MY_IP=%MY_IP:~1%
@REM cd ..
@REM echo EXPO_BASE_IP=http://%MY_IP%> .env
@REM 

#!/bin/bash

# Move to the script's directory
cd "$(dirname "$0")"

# Get the local IPv4 address (excluding loopback and docker interfaces)
MY_IP=$(ip route get 1 | awk '{print $7; exit}')

# Go to parent directory
cd ..

# Write to .env file
echo "EXPO_BASE_IP=http://$MY_IP" > .env



