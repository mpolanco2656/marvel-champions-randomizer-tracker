# 🚀 Prompt para Crear Proyecto React - Marvel Champions Ultimate

## PARTE 1: Setup Inicial del Proyecto

Ejecuta estos comandos en tu terminal:

```bash
# 1. Crear proyecto React
npx create-react-app marvel-champions
cd marvel-champions

# 2. Instalar dependencias necesarias
npm install lucide-react

# 3. Instalar Tailwind CSS
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## PARTE 2: Configurar Tailwind CSS

Reemplaza el contenido de `tailwind.config.js` con:

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Reemplaza el contenido de `src/index.css` con:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
```

---

## PARTE 3: Archivo Principal de la App

Reemplaza el contenido de `src/App.js` con el código completo de `marvel-champions-ultimate.tsx`.

**IMPORTANTE:** Si tienes el archivo .tsx, puedes:

### Opción A: Copiar desde el archivo descargado
```bash
# Copia el archivo descargado a src/App.js
cp ~/Downloads/marvel-champions-ultimate.tsx src/App.js
```

### Opción B: Copiar manualmente
1. Abre `marvel-champions-ultimate.tsx` en un editor de texto
2. Selecciona todo (Ctrl+A / Cmd+A)
3. Copia (Ctrl+C / Cmd+C)
4. Abre `src/App.js` en tu editor
5. Pega (Ctrl+V / Cmd+V)
6. Guarda

---

## PARTE 4: Limpiar Archivos Innecesarios

```bash
# Opcional: Eliminar archivos que no necesitamos
rm src/App.css
rm src/App.test.js
rm src/logo.svg
rm src/reportWebVitals.js
rm src/setupTests.js
```

Edita `src/index.js` para que quede así:

```javascript
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

---

## PARTE 5: Iniciar el Proyecto

```bash
npm start
```

El navegador debería abrirse automáticamente en `http://localhost:3000`

---

## ✅ Checklist de Verificación

Después de ejecutar `npm start`, deberías ver:

- [ ] Título "MARVEL CHAMPIONS" en amarillo
- [ ] Tabs: Randomizer, Modo Campaña, Colección, Historial, Guía Progresión
- [ ] Stats bar con números (Juegos, Win Rate, etc.)
- [ ] Botón "Generar Setup Completo"
- [ ] Sin errores en la consola del navegador (F12)

---

## 🐛 Solución de Problemas

### Error: "Module not found: Can't resolve 'lucide-react'"
```bash
npm install lucide-react
```

### Error: Tailwind CSS no funciona (sin colores)
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
# Luego verifica tailwind.config.js tiene el content correcto
```

### La app no se actualiza al guardar cambios
```bash
# Detén el servidor (Ctrl+C)
# Reinicia
npm start
```

### Puerto 3000 ya está en uso
```bash
# En Windows
netstat -ano | findstr :3000
taskkill /PID <número_del_proceso> /F

# En Mac/Linux
lsof -ti:3000 | xargs kill -9
```

---

## 📦 Estructura Final del Proyecto

```
marvel-champions/
├── node_modules/
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── App.js                 ← Tu código principal
│   ├── index.js               ← Entry point
│   └── index.css              ← Tailwind CSS
├── package.json
├── tailwind.config.js
└── README.md
```

---

## 🎨 Personalización (Opcional)

### Cambiar el título de la página
Edita `public/index.html`:
```html
<title>Marvel Champions - Ultimate Randomizer</title>
```

### Cambiar el favicon
Reemplaza `public/favicon.ico` con tu propio ícono

---

## 📱 Build para Producción

Cuando quieras crear una versión optimizada:

```bash
npm run build
```

Esto crea una carpeta `build/` con archivos optimizados que puedes:
- Hostear en Netlify, Vercel, GitHub Pages
- Compartir como app web
- Usar offline

---

## 🚀 Deploy Rápido (Opcional)

### Deploy a Netlify (Gratis):
```bash
# Instala Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod --dir=build
```

### Deploy a Vercel (Gratis):
```bash
# Instala Vercel CLI
npm install -g vercel

# Deploy
vercel
```

---

## 💾 Guardar tu Trabajo en Git

```bash
git init
git add .
git commit -m "Initial commit - Marvel Champions Ultimate"

# Opcional: Subir a GitHub
# 1. Crea un repo en github.com
# 2. Sigue las instrucciones de GitHub
```

---

## 🎯 Comandos Útiles

```bash
# Iniciar servidor de desarrollo
npm start

# Build para producción
npm run build

# Ejecutar tests (si tienes)
npm test

# Ver dependencias instaladas
npm list --depth=0

# Actualizar dependencias
npm update
```

---

## 📚 Recursos Adicionales

- **React Docs**: https://react.dev
- **Tailwind CSS**: https://tailwindcss.com/docs
- **Lucide Icons**: https://lucide.dev
- **Create React App**: https://create-react-app.dev

---

## ✨ Features Incluidas en la App

- ✅ Collection Tracking (10 campañas + 7 scenario packs)
- ✅ Smart Randomizer con filtros avanzados
- ✅ Campaign Mode con progreso
- ✅ Game History con estadísticas
- ✅ Progression Guide completo
- ✅ Smart Warnings & Suggestions
- ✅ Thematic Pairing
- ✅ Tooltips educativos (Complexity/Difficulty)
- ✅ Export/Share de setups
- ✅ Persistencia en localStorage
- ✅ Mobile responsive

---

## 🎉 ¡Listo!

Tu app Marvel Champions Ultimate debería estar funcionando en `http://localhost:3000`

Si tienes algún problema, verifica:
1. Node.js está instalado (`node --version`)
2. npm está instalado (`npm --version`)
3. Todas las dependencias se instalaron (`npm install`)
4. No hay errores en la consola del navegador (F12)

---

## 📞 ¿Necesitas Ayuda?

Si encuentras algún error:
1. Copia el mensaje de error completo
2. Verifica qué comando falló
3. Revisa que seguiste todos los pasos en orden

¡Disfruta tu Marvel Champions Ultimate Randomizer! 🦸‍♂️
