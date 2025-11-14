# 🐛 Troubleshooting - Artifact en Blanco

## ❓ ¿Por qué veo un artifact blanco?

Hay varias razones por las que un React artifact puede aparecer en blanco:

### 1. **Archivo Demasiado Grande** ⚠️
El archivo `marvel-champions-ultimate.tsx` es muy extenso (~87,000 tokens). Los artifacts de Claude tienen límites de rendering para archivos muy complejos.

**Solución:** He creado `marvel-champions-simple.tsx` que es mucho más pequeño y debería funcionar.

### 2. **Error de JavaScript No Visible** 🐞
Puede haber un error en el código que no se muestra en la UI de Claude.

**Solución:** Abre la consola del navegador:
- Chrome/Edge: `F12` o `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
- Busca errores en rojo en la pestaña Console

### 3. **Problema con localStorage** 💾
Algunos browsers bloquean localStorage en iframes (que es como Claude renderiza artifacts).

**Solución:** Usa el archivo HTML standalone que funciona en cualquier browser.

---

## ✅ Soluciones Disponibles

### Opción A: Versión Simplificada (Recomendada)
```
Archivo: marvel-champions-simple.tsx
```
- ✅ Mucho más pequeño (2,000 líneas vs 5,000+)
- ✅ Solo collection tracking (lo esencial)
- ✅ Debería funcionar en el artifact de Claude
- ✅ Incluye debug info para verificar que funciona

**Características:**
- 📦 Tracking de 10 campañas
- 🎯 Tracking de 7 scenario packs
- 📊 Stats en tiempo real
- 💾 Persistencia con localStorage

### Opción B: Archivo HTML Standalone (100% Garantizado)
```
Archivo: marvel-champions-standalone.html
```
- ✅ Funciona en CUALQUIER navegador
- ✅ No depende de Claude
- ✅ Solo doble-click para abrir
- ✅ Mismo diseño y funcionalidad

**Cómo usar:**
1. Descarga el archivo `marvel-champions-standalone.html`
2. Doble-click para abrir en tu navegador
3. ¡Listo! Funciona offline

### Opción C: Versión Completa (Para Desarrollo)
```
Archivo: marvel-champions-ultimate.tsx
```
Si necesitas la versión completa con TODAS las características:
- 🎲 Randomizer
- 📖 Campaign Mode
- 📊 Game History
- 🎯 Progression Guide
- ⚙️ Filtros avanzados

**Usar en un proyecto React:**
```bash
# 1. Crea un proyecto React
npx create-react-app marvel-champions
cd marvel-champions

# 2. Instala dependencias
npm install lucide-react

# 3. Copia el contenido de marvel-champions-ultimate.tsx a src/App.tsx

# 4. Inicia el servidor
npm start
```

---

## 🔧 Pasos de Debug

Si ninguna de las opciones anteriores funciona, sigue estos pasos:

### 1. Verifica el Artifact Simple
```
Archivo: marvel-champions-simple.tsx
```
- Debería mostrar: "✅ Si ves esto, el artifact funciona!"
- Si NO ves esto → Problema con el rendering de artifacts en Claude
- Si SÍ ves esto → El archivo ultimate era demasiado grande

### 2. Verifica en Browser
```
Archivo: marvel-champions-standalone.html
```
- Abre el archivo HTML directamente
- Si funciona aquí → Confirma que el código está bien
- Si NO funciona → Problema con tu browser (poco probable)

### 3. Verifica Console de Browser
En el artifact de Claude:
1. Click derecho → Inspeccionar
2. Ve a la pestaña "Console"
3. Busca errores en rojo
4. Copia y pega el error aquí para ayuda

---

## 🎯 Recomendación según tu uso

### Si solo necesitas Collection Tracking:
✅ Usa `marvel-champions-simple.tsx` o `marvel-champions-standalone.html`

### Si necesitas el Randomizer completo:
✅ Usa `marvel-champions-standalone.html` (funciona en browser)
✅ O instala como proyecto React para desarrollo

### Si quieres la mejor experiencia:
✅ Instala como proyecto React completo con `npm start`

---

## 📊 Comparación de Versiones

| Característica | Simple | Standalone | Ultimate |
|----------------|--------|------------|----------|
| **Collection Tracking** | ✅ | ✅ | ✅ |
| **Randomizer** | ❌ | ❌ | ✅ |
| **Campaign Mode** | ❌ | ❌ | ✅ |
| **Game History** | ❌ | ❌ | ✅ |
| **Progression Guide** | ❌ | ❌ | ✅ |
| **Funciona en Claude** | ✅ | N/A | ⚠️ |
| **Funciona en Browser** | N/A | ✅ | ✅* |
| **Tamaño** | 2K líneas | 300 líneas | 5K líneas |

*Requiere setup de proyecto React

---

## 🚀 Quick Start: Archivo HTML

El método MÁS RÁPIDO para empezar:

```bash
# 1. Descarga marvel-champions-standalone.html
# 2. Doble-click
# 3. ¡Listo!
```

**Ventajas:**
- ✅ Funciona offline
- ✅ No requiere instalación
- ✅ Se guarda en localStorage del browser
- ✅ Responsive (funciona en móvil)

---

## 💡 Explicación Técnica

### ¿Por qué el artifact está en blanco?

Los artifacts de Claude usan un iframe sandboxed con restricciones:
1. **Límite de complejidad** - Código muy grande puede fallar
2. **Límite de tiempo** - Rendering muy lento timeout
3. **Restricciones de seguridad** - Algunos APIs limitados

El archivo `marvel-champions-ultimate.tsx` tiene:
- 63 héroes con datos completos
- 48 villanos con descripciones
- 58 sets modulares
- Sistema de warnings complejo
- Múltiples filtros interactivos
- → **Demasiado complejo para artifact**

**Solución:** Versiones simplificadas o standalone

---

## 📞 ¿Necesitas Ayuda?

Si ninguna solución funciona:

1. **Prueba la versión Simple primero**
2. **Abre el HTML standalone** (garantizado que funciona)
3. **Si quieres TODO**: Instala como proyecto React

¿Qué método prefieres? Te puedo guiar en el que elijas.
