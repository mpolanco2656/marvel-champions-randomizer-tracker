# 🎯 QUICK START - Marvel Champions Ultimate

## 🚀 3 Formas de Instalar

### Opción 1: Script Automático ⚡ (Más Rápido)

**Windows:**
```bash
# 1. Descarga setup-windows.bat
# 2. Doble-click para ejecutar
# 3. Espera a que termine
# 4. Copia marvel-champions-ultimate.tsx a src/App.js
# 5. npm start
```

**Mac/Linux:**
```bash
# 1. Descarga setup-macos.sh
chmod +x setup-macos.sh
./setup-macos.sh

# 2. Copia marvel-champions-ultimate.tsx a src/App.js
cp ~/Downloads/marvel-champions-ultimate.tsx src/App.js

# 3. Inicia el servidor
npm start
```

---

### Opción 2: Manual Paso a Paso 📝 (Control Total)

Sigue la guía completa: `REACT_PROJECT_SETUP.md`

```bash
# Pasos básicos:
npx create-react-app marvel-champions
cd marvel-champions
npm install lucide-react
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Configura Tailwind (ver guía)
# Copia marvel-champions-ultimate.tsx a src/App.js
npm start
```

---

### Opción 3: Solo HTML 🌐 (Sin Instalación)

```bash
# 1. Descarga marvel-champions-standalone.html
# 2. Doble-click para abrir en browser
# 3. ¡Listo!
```

**Ventajas:**
- ✅ Funciona inmediatamente
- ✅ No requiere instalación
- ✅ No requiere Node.js
- ✅ Funciona offline

**Desventajas:**
- ❌ Solo tiene Collection Tracker (no randomizer completo)

---

## 📦 ¿Qué Incluye Cada Versión?

| Característica | HTML Standalone | React Simple | React Ultimate |
|----------------|-----------------|--------------|----------------|
| Collection Tracking | ✅ | ✅ | ✅ |
| Randomizer | ❌ | ❌ | ✅ |
| Campaign Mode | ❌ | ❌ | ✅ |
| Game History | ❌ | ❌ | ✅ |
| Progression Guide | ❌ | ❌ | ✅ |
| Smart Warnings | ❌ | ❌ | ✅ |
| Tooltips (ℹ️) | ❌ | ❌ | ✅ |
| Instalación | Ninguna | npm | npm |
| Tamaño | 300 líneas | 2K líneas | 5K líneas |

---

## 🎯 Recomendaciones

### Quieres probarlo YA:
👉 **HTML Standalone** - Doble-click y listo

### Quieres solo Collection Tracker:
👉 **React Simple** - Ligero y rápido

### Quieres TODO (randomizer completo):
👉 **React Ultimate** - Instalación completa

---

## 📋 Requisitos

### Para HTML Standalone:
- ✅ Cualquier navegador web (Chrome, Firefox, Safari, Edge)

### Para React Project:
- ✅ Node.js 14+ ([descargar](https://nodejs.org))
- ✅ npm (viene con Node.js)
- ✅ 5-10 minutos para instalación
- ✅ ~200MB espacio en disco

---

## 🆘 Troubleshooting Rápido

### "node no se reconoce como comando"
```bash
# Instala Node.js desde:
https://nodejs.org
```

### "npx no funciona"
```bash
# Actualiza npm:
npm install -g npm@latest
```

### "El artifact está en blanco en Claude"
```bash
# El archivo es demasiado grande
# Usa HTML standalone o instala como proyecto React
```

### "npm install falla"
```bash
# Borra node_modules e intenta de nuevo:
rm -rf node_modules
npm install
```

---

## 📁 Archivos Disponibles

```
📦 marvel-champions-ultimate.tsx
   → Versión completa (5K líneas)
   → Para proyecto React

📦 marvel-champions-simple.tsx
   → Versión ligera (2K líneas)
   → Solo Collection Tracker

🌐 marvel-champions-standalone.html
   → Archivo HTML independiente
   → Doble-click para abrir

📖 REACT_PROJECT_SETUP.md
   → Guía completa paso a paso

🤖 setup-windows.bat
   → Script automático Windows

🤖 setup-macos.sh
   → Script automático Mac/Linux

📘 TROUBLESHOOTING.md
   → Solución de problemas

📊 ULTIMATE_CHANGELOG.md
   → Documentación de cambios
```

---

## ⏱️ Tiempo Estimado

| Método | Tiempo | Complejidad |
|--------|--------|-------------|
| HTML Standalone | **30 segundos** | ⭐ Muy Fácil |
| Script Automático | **5 minutos** | ⭐⭐ Fácil |
| Manual Paso a Paso | **10 minutos** | ⭐⭐⭐ Medio |

---

## 🎉 Quick Start Recomendado

**Si es tu primera vez con React:**
```bash
# 1. Descarga marvel-champions-standalone.html
# 2. Doble-click
# 3. ¡Disfruta!
```

**Si sabes usar npm:**
```bash
# Windows
setup-windows.bat

# Mac/Linux
chmod +x setup-macos.sh && ./setup-macos.sh

# Luego copia el .tsx y npm start
```

---

## 💬 ¿Necesitas Ayuda?

- 📖 Lee `REACT_PROJECT_SETUP.md` para guía completa
- 🐛 Lee `TROUBLESHOOTING.md` si algo falla
- 📊 Lee `ULTIMATE_CHANGELOG.md` para características

---

## ✅ Verificación Post-Instalación

Después de `npm start`, deberías ver:

```
✅ Título "MARVEL CHAMPIONS" en amarillo
✅ 5 tabs: Randomizer, Campaña, Colección, Historial, Progresión
✅ Stats bar con números
✅ Botón "Generar Setup Completo"
✅ Sin errores en consola (F12)
```

---

## 🚀 ¡A Jugar!

Una vez instalado:

1. Ve a **Colección**
2. Marca lo que tienes (campañas + scenarios)
3. Ve a **Randomizer**
4. Click **"Generar Setup Completo"**
5. ¡Disfruta tu juego! 🎲

---

**¿Listo para empezar?** Elige tu método y sigue las instrucciones. ¡Éxito! 🦸‍♂️
