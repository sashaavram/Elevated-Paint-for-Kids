@echo off
rem Double-click to start Elevated Paint for Kids on Windows.
rem To turn on "Ask Claude to draw", put your key on the next line (remove "rem "):
rem set ANTHROPIC_API_KEY=sk-ant-...
cd /d "%~dp0"
where node >nul 2>nul || (echo Please install Node.js 18 or newer from https://nodejs.org & pause & exit /b 1)
if not exist node_modules call npm install
start "" http://localhost:3000
node server.js
pause
