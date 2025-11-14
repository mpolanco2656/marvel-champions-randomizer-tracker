@echo off
REM Marvel Champions Ultimate - Setup Script (Windows)
REM Este script automatiza la creación del proyecto React

echo ========================================
echo  MARVEL CHAMPIONS ULTIMATE - SETUP
echo ========================================
echo.

REM Verificar Node.js
echo [1/8] Verificando Node.js...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ERROR: Node.js no esta instalado
    echo Descargalo desde: https://nodejs.org
    pause
    exit /b 1
)
echo Node.js: OK
echo.

REM Crear proyecto
echo [2/8] Creando proyecto React...
call npx create-react-app marvel-champions
if %errorlevel% neq 0 (
    echo ERROR: Fallo al crear proyecto
    pause
    exit /b 1
)
cd marvel-champions
echo Proyecto creado: OK
echo.

REM Instalar dependencias
echo [3/8] Instalando lucide-react...
call npm install lucide-react
echo lucide-react: OK
echo.

echo [4/8] Instalando Tailwind CSS...
call npm install -D tailwindcss postcss autoprefixer
call npx tailwindcss init -p
echo Tailwind CSS: OK
echo.

REM Configurar Tailwind
echo [5/8] Configurando Tailwind CSS...
(
echo /** @type {import('tailwindcss'^).Config} */
echo module.exports = {
echo   content: [
echo     "./src/**/*.{js,jsx,ts,tsx}",
echo   ],
echo   theme: {
echo     extend: {},
echo   },
echo   plugins: [],
echo }
) > tailwind.config.js
echo Tailwind config: OK
echo.

REM Configurar CSS
echo [6/8] Configurando CSS...
(
echo @tailwind base;
echo @tailwind components;
echo @tailwind utilities;
echo.
echo body {
echo   margin: 0;
echo   font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
echo   -webkit-font-smoothing: antialiased;
echo   -moz-osx-font-smoothing: grayscale;
echo }
) > src\index.css
echo CSS: OK
echo.

REM Limpiar archivos innecesarios
echo [7/8] Limpiando archivos innecesarios...
del src\App.css 2>nul
del src\App.test.js 2>nul
del src\logo.svg 2>nul
del src\reportWebVitals.js 2>nul
del src\setupTests.js 2>nul
echo Limpieza: OK
echo.

REM Actualizar index.js
echo [8/8] Configurando index.js...
(
echo import React from 'react';
echo import ReactDOM from 'react-dom/client';
echo import './index.css';
echo import App from './App';
echo.
echo const root = ReactDOM.createRoot(document.getElementById('root'^)^);
echo root.render(
echo   ^<React.StrictMode^>
echo     ^<App /^>
echo   ^</React.StrictMode^>
echo ^);
) > src\index.js
echo index.js: OK
echo.

echo ========================================
echo  SETUP COMPLETO!
echo ========================================
echo.
echo IMPORTANTE:
echo 1. Copia el contenido de marvel-champions-ultimate.tsx
echo 2. Pegalo en src\App.js
echo 3. Ejecuta: npm start
echo.
echo El proyecto esta en: %cd%
echo.
pause
