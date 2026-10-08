@echo off
rem Double-click to start Elevated Paint for Kids on Windows.
rem To turn on "Ask Claude to draw", put your key on the next line (remove "rem "):
rem set ANTHROPIC_API_KEY=sk-ant-...
rem Grown-up passcode asked before every Claude drawing (remove "rem " and type your own):
rem set FAMILY_CODE=123456
cd /d "%~dp0"
where node >nul 2>nul || (echo Please install Node.js 18 or newer from https://nodejs.org & pause & exit /b 1)
if not exist node_modules call npm install
rem Tip: in Edge, use ... > Apps > Install this site as an app, to get a Start-menu app.
start "" /min cmd /c "timeout /t 2 >nul & start http://localhost:3000"
node server.js
pause
