# Marvel Champions Ultimate Randomizer

**Web app completa para randomizar setups de Marvel Champions: The Card Game** con collection tracking, historial de juegos, modo campaña y guía de progresión.

## 📂 Dos Versiones Disponibles

Este repositorio contiene **dos implementaciones** de la misma aplicación:

| Versión | Ubicación | Framework | Puerto | Recomendado |
|---------|-----------|-----------|--------|-------------|
| **Refactorizada** | `/app` | Vite + React + TypeScript | 5173 | ✅ **Sí** - Moderna y modular |
| **Original** | `/deprecated` | Create React App + TypeScript | 3000 | ⚠️ Solo referencia |

### ¿Cuál usar?

- **`/app`** (Vite) - Recomendado para:
  - Desarrollo nuevo
  - Mejor rendimiento (build 5-10x más rápido)
  - Estructura modular y mantenible
  - Tailwind CSS 4

- **`/deprecated`** (CRA) - Solo para:
  - Referencia histórica
  - Comparación con versión original
  - Compatibilidad con proyectos CRA existentes

## ✨ Características

- 🌍 **Soporte Multiidioma**: Interfaz completa en Español e Inglés con detección automática
- 🎲 **Randomizer Inteligente**: Genera setups completos con filtros avanzados
- 📦 **Collection Tracking**: Rastrea tu colección de campañas y scenario packs
- 📊 **Historial de Juegos**: Guarda partidas con resultados y estadísticas
- 🗺️ **Modo Campaña**: Progresa a través de campañas completas
- 📈 **Guía de Progresión**: Orden optimizado para comprar contenido
- ⚠️ **Smart Warnings**: Alertas sobre composiciones problemáticas
- 🎯 **Emparejamiento Temático**: Modulares relacionados con villanos
- 💾 **Persistencia Local**: Todo se guarda en localStorage

## 🚀 Inicio Rápido

### Requisitos Previos

- Node.js 18+
- npm 10+

### Instalación y Ejecución

```bash
# 1. Clonar el repositorio
git clone https://github.com/tuusuario/marvel-champions-randomizer-tracker.git
cd marvel-champions-randomizer-tracker

# 2. Entrar a la carpeta del proyecto
cd app

# 3. Instalar dependencias
npm install

# 4. Iniciar servidor de desarrollo
npm run dev
```

El navegador se abrirá automáticamente en `http://localhost:5173`

## 📦 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Inicia servidor de desarrollo con hot reload

# Producción
npm run build        # Compila proyecto para producción
npm run preview      # Preview del build de producción

# Calidad de Código
npm run lint         # Ejecuta ESLint
```

## 📁 Estructura del Proyecto

```
app/
├── src/
│   ├── components/        # Componentes de React
│   │   ├── layout/       # Header, TabNavigation
│   │   ├── tabs/         # RandomizerTab, CollectionTab, etc.
│   │   └── ui/           # StatsBar y componentes UI
│   ├── data/             # Datos del juego (heroes, villains, etc.)
│   ├── i18n/             # Internacionalización
│   │   ├── locales/      # Traducciones ES/EN
│   │   └── config.ts     # Configuración i18next
│   ├── hooks/            # Custom hooks (useCollection, useGameHistory)
│   ├── types/            # TypeScript types e interfaces
│   ├── utils/            # Funciones de utilidad y lógica del juego
│   ├── App.tsx           # Componente principal
│   ├── main.tsx          # Entry point
│   └── index.css         # Tailwind CSS
├── public/               # Archivos estáticos
└── package.json
```

## 🔄 Alternar Entre Versiones

Puedes ejecutar **ambas versiones simultáneamente** en diferentes puertos:

```bash
# Terminal 1 - Versión Refactorizada (Vite)
cd app
npm install  # Solo la primera vez
npm run dev  # Se abre en http://localhost:5173

# Terminal 2 - Versión Original (CRA)
cd deprecated
npm install  # Solo la primera vez
npm start    # Se abre en http://localhost:3000
```

Ambas apps son **100% funcionales** y comparten los mismos datos en localStorage del navegador.

## 🎮 Uso

### 1. Configurar tu Colección

Ve a la pestaña **Colección** y selecciona las campañas y scenario packs que posees. El randomizer solo usará contenido de tu colección.

### 2. Generar Setup

En la pestaña **Randomizer**:
- Selecciona número de jugadores
- Ajusta dificultad y complejidad
- Usa filtros avanzados (opcional)
- Haz clic en "Generar Setup Completo"

### 3. Guardar Resultados

Después de jugar, guarda el resultado (Victoria/Derrota) para tracking de estadísticas.

### 4. Modo Campaña

En la pestaña **Modo Campaña**, selecciona una campaña y progresa escenario por escenario.

### 5. Guía de Progresión

Consulta la pestaña **Guía Progresión** para ver el orden recomendado de compra de contenido.

### 6. Cambiar Idioma

La aplicación detecta automáticamente el idioma de tu navegador (Español o Inglés). Para cambiar manualmente el idioma, haz clic en el botón de idioma 🌐 en la esquina superior derecha del header. Tu preferencia se guardará en localStorage.

## 🏗️ Tecnologías

- **React 19** - Framework UI
- **TypeScript** - Type safety
- **Vite** - Build tool y dev server
- **Tailwind CSS 4** - Styling
- **react-i18next** - Internacionalización (ES/EN)
- **Lucide React** - Iconos
- **LocalStorage** - Persistencia de datos

## 📚 Documentación Adicional

Consulta la carpeta `/docs` para documentación adicional:
- `REACT_PROJECT_SETUP.md` - Setup original con Create React App
- `QUICK_START.md` - Guía rápida de inicio
- `TROUBLESHOOTING.md` - Solución de problemas
- `ULTIMATE_CHANGELOG.md` - Historial de cambios

## 🔧 Desarrollo

### Añadir Nuevo Contenido

Para añadir nuevos héroes, villanos o campañas:

1. Edita los archivos en `src/data/`:
   - `heroes.ts` - Nuevos héroes
   - `villains.ts` - Nuevos villanos
   - `campaigns.ts` - Nuevas campañas
   - `modularSets.ts` - Nuevos sets modulares

2. Mantén las interfaces en `src/types/index.ts`

### Modificar Lógica del Juego

La lógica principal está en:
- `src/utils/gameLogic.ts` - Warnings, suggestions, filtros temáticos
- `src/hooks/` - Lógica de estado (collection, history)

### Añadir o Modificar Traducciones

Las traducciones están organizadas por namespace en `src/i18n/locales/`:

```
i18n/locales/
├── en/               # Inglés
│   ├── common.json
│   ├── tabs.json
│   ├── randomizer.json
│   ├── campaign.json
│   ├── collection.json
│   ├── history.json
│   └── progression.json
└── es/               # Español
    ├── common.json
    ├── tabs.json
    ├── randomizer.json
    ├── campaign.json
    ├── collection.json
    ├── history.json
    └── progression.json
```

Para modificar o añadir traducciones:
1. Edita los archivos JSON correspondientes en `src/i18n/locales/`
2. Los datos del juego con traducciones (como `progressionGuide`) están en `src/data/` con archivos separados `.es.ts` y `.en.ts`
3. La configuración de i18next está en `src/i18n/config.ts`

## 🌐 Deploy

### Netlify / Vercel

```bash
# Build
npm run build

# Deploy la carpeta dist/
```

### GitHub Pages

```bash
npm install -D gh-pages

# Añade a package.json:
"homepage": "https://tuusuario.github.io/marvel-champions-randomizer-tracker",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Deploy
npm run deploy
```

## 🤝 Contribuir

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto es de código abierto y está disponible bajo la licencia MIT.

## 🎯 Archivo Original (marvel-champions-ultimate.tsx)

El archivo monolítico original `marvel-champions-ultimate.tsx` se mantiene en la raíz del proyecto para referencia.

**Nota**: Este archivo **NO se puede ejecutar directamente**. Es solo el componente React. Para usarlo:
- **Opción 1**: La versión `/deprecated` ya usa este archivo
- **Opción 2**: Cópialo a un proyecto nuevo siguiendo `/docs/REACT_PROJECT_SETUP.md`

## 💡 Créditos

Datos del juego basados en Marvel Champions: The Card Game de Fantasy Flight Games.

---

**¡Disfruta tu Marvel Champions Ultimate Randomizer!** 🦸‍♂️🦸‍♀️
