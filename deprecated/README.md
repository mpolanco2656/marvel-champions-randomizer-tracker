# Marvel Champions Ultimate - Versión Original (Deprecated)

Esta es la **versión original monolítica** de Marvel Champions Ultimate Randomizer, construida con Create React App.

## ⚠️ Nota Importante

Esta versión se mantiene por compatibilidad y referencia histórica. Para nuevos desarrollos, usa la versión refactorizada en `/app`.

## 🚀 Inicio Rápido

```bash
# 1. Asegúrate de estar en la carpeta deprecated
cd deprecated

# 2. Instalar dependencias (solo la primera vez)
npm install

# 3. Iniciar servidor de desarrollo
npm start
```

La aplicación se abrirá en `http://localhost:3000`

## 📦 Scripts Disponibles

```bash
npm start       # Inicia servidor de desarrollo (puerto 3000)
npm run build   # Compila para producción
npm test        # Ejecuta tests
```

## 🔄 Diferencias con /app

| Característica | /deprecated (Original) | /app (Refactorizado) |
|----------------|----------------------|----------------------|
| Framework | Create React App | Vite |
| Puerto | 3000 | 5173 |
| Estructura | Monolítica (1 archivo) | Modular (componentes separados) |
| Build Speed | ~30-60s | ~5-10s |
| Hot Reload | Lento | Muy rápido |
| Tailwind CSS | v3 | v4 |
| Mantenimiento | ❌ No recomendado | ✅ Recomendado |

## 📝 Arquitectura

**Archivo único**: `src/App.tsx` (1251 líneas)
- Todo el código en un solo archivo
- Todos los datos inline
- Sin separación de componentes

## ⚙️ Tecnologías

- **React 18** + TypeScript
- **Create React App** (deprecated oficialmente)
- **Tailwind CSS 3**
- **Lucide React** - Iconos

## 📚 Documentación

Para instrucciones detalladas de setup, consulta `/docs/REACT_PROJECT_SETUP.md`

## 🎯 Uso Recomendado

Usa esta versión si:
- ✅ Necesitas la versión original exacta
- ✅ Tienes un proyecto existente con CRA
- ✅ Estás haciendo comparaciones de rendimiento

**Para desarrollo nuevo, usa `/app` (Vite + estructura modular)**

## 🔗 Ver Versión Refactorizada

```bash
cd ../app
npm install
npm run dev
```

---

**Nota**: Create React App fue oficialmente deprecated por el equipo de React en 2023. Se recomienda migrar a frameworks modernos como Vite.
