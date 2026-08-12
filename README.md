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

## 🐳 Docker

Para ejecutar la aplicación en producción usando Docker:

```bash
# 1. Construir y ejecutar con Docker Compose
docker-compose up -d

# La aplicación estará disponible en http://localhost:3000
```

### Comandos Docker Útiles

```bash
# Ver logs del contenedor
docker-compose logs -f

# Detener los contenedores
docker-compose down

# Reconstruir después de cambios
docker-compose up -d --build

# Detener y eliminar volúmenes
docker-compose down -v
```

### Diferencias entre Desarrollo y Producción

| Aspecto | Desarrollo (Vite) | Producción (Docker) |
|---------|-------------------|---------------------|
| **Comando** | `npm run dev` | `docker-compose up` |
| **Puerto** | 5173 | 3000 |
| **Hot Reload** | ✅ Sí | ❌ No |
| **Optimización** | Desarrollo | Build optimizado con Nginx |
| **Uso** | Desarrollo local | Deploy/Testing producción |

**Nota**: El contenedor Docker usa un build multi-stage (Node.js + Nginx) para servir la aplicación optimizada.

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

### 1. 📦 Collection Tracking

**Pestaña: Colección**

Marca las campañas, scenario packs y hero packs que posees:
- ✅ **Core Set** viene incluido por defecto
- Haz clic en cada producto para agregarlo/quitarlo de tu colección
- Botones rápidos: "Todas" (seleccionar todo) / "Solo Core" (reset)
- **Importante**: El randomizer solo usará contenido de tu colección

**Estadísticas mostradas**:
- Héroes disponibles
- Villanos disponibles
- Sets modulares disponibles

### 2. 🎲 Randomizer (Setup Individual)

**Pestaña: Randomizer**

Genera un setup completo para una partida única:
- Selecciona número de jugadores (1-4)
- Ajusta dificultad del villano (1-10)
- Ajusta complejidad de héroes (Beginner/Intermediate/Advanced)
- **Filtros avanzados** (opcional):
  - Emparejamiento temático de modulares
  - Número de sets modulares (1-4)
  - Optimización para Solo/Multiplayer
  - Aspectos específicos
- Haz clic en "Generar Setup Completo"
- **Warnings inteligentes**: Alertas sobre composiciones problemáticas

### 3. 🗺️ Campaign Randomizer

**Pestaña: Modo Campaña**

Dos modos para progresión extendida:

**📘 Modo A: Campaña con Modulares Random**
- Selecciona una campaña completa (ej: Rise of Red Skull)
- Genera todos los escenarios de la campaña en orden
- Cada escenario tiene sets modulares aleatorios
- Progresa escenario por escenario marcándolos como completados

**🎲 Modo B: Villanos Mezclados (5 Random)**
- Genera 5 escenarios aleatorios mezclando villanos de diferentes fuentes
- Ideal para variedad máxima sin seguir una campaña específica
- Cada escenario tiene combinaciones únicas de modulares

**Opciones en ambos modos**:
- Cantidad de modulares (1-4 sets)
- Emparejamiento temático ON/OFF
- Marca escenarios completados con ✓
- Botón "Regenerar Modulares" para un escenario específico

### 4. 📊 Historial

**Pestaña: Historial**

Guarda y consulta tus partidas:
- Al finalizar una partida, marca Victoria ✓ o Derrota ✗
- Exporta tu historial completo
- Ve estadísticas:
  - Total de partidas
  - Win rate %
  - Héroes y villanos únicos jugados

### 5. 📈 Guía de Progresión

**Pestaña: Guía Progresión**

Consulta el orden recomendado de compra de contenido:
- Organizado por fases (Fundación, Expansión, etc.)
- Incluye campañas, scenario packs y hero packs
- Modo de juego recomendado (Solo/Multiplayer)
- Notas y consejos para cada producto

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
- [`content-update-workflow.md`](docs/content-update-workflow.md) - Flujo completo para descubrir, registrar, auditar y validar contenido
- `REACT_PROJECT_SETUP.md` - Setup original con Create React App
- `QUICK_START.md` - Guía rápida de inicio
- `TROUBLESHOOTING.md` - Solución de problemas
- `ULTIMATE_CHANGELOG.md` - Historial de cambios

## 🔧 Desarrollo

### Añadir Nuevo Contenido

Los datos del juego están organizados en archivos TypeScript en `app/src/data/`. Sigue estos ejemplos para agregar nuevo contenido:

#### 1️⃣ Agregar un Nuevo Héroe

**Archivo**: `app/src/data/heroes.ts`

```typescript
// Ejemplo de héroe nuevo
{
  name: "Nombre del Héroe",           // Nombre completo
  aspect: "Aggression",                // Leadership | Justice | Aggression | Protection
  tier: "A",                           // S+ | S | A | B | C
  complexity: "Intermediate",          // Beginner | Intermediate | Advanced
  playstyle: ["Aggro", "Control"],     // Array de estilos
  optimization: "Both",                // Solo | Multiplayer | Both
  wave: 5,                             // Número de wave (0 = Core Set)
  source: "Nombre del Pack",           // Fuente del héroe
  description: "Descripción breve",    // Mecánicas únicas
  key: "nombreunico"                   // Identificador único (lowercase, sin espacios)
}
```

**Campos disponibles para `playstyle`**:
- `"Control"` - Control del tablero
- `"Aggro"` - Daño agresivo
- `"All-rounder"` - Versátil
- `"Resource Engine"` - Generación de recursos
- `"Support"` - Soporte al equipo
- `"Setup"` - Requiere setup inicial

#### 2️⃣ Agregar un Nuevo Villano

**Archivo**: `app/src/data/villains.ts`

```typescript
// Ejemplo de villano nuevo
{
  name: "Nombre del Villano",
  source: "Nombre de la Campaña",      // Debe coincidir con campaign.name
  difficulty: 6,                       // 1-10 (escala de dificultad)
  mechanics: "Minion Swarm",           // Mecánicas principales
  description: "Descripción táctica",
  key: "villanokey",                   // Identificador único
  campaignOrder: 3                     // OPCIONAL: Orden en campaña (1-5)
}
```

#### 3️⃣ Agregar una Nueva Campaña

**Archivo**: `app/src/data/campaigns.ts`

```typescript
// Ejemplo de campaña nueva
{
  name: "Nombre de la Campaña",
  key: "campanakey",                   // Identificador único
  type: "campaign",                    // campaign | scenario | core
  villains: [                          // Array de keys de villanos
    "villano1key",
    "villano2key",
    "villano3key",
    "villano4key",
    "villanobosskey"
  ],
  wave: 5                              // Número de wave
}
```

**⚠️ Importante**: Los `villains` deben usar las `key` de villanos existentes en `villains.ts`.

#### 4️⃣ Agregar un Set Modular

**Archivo**: `app/src/data/modularSets.ts`

```typescript
// Ejemplo de set modular nuevo
{
  name: "Nombre del Set",
  difficulty: 3,                       // 1-5 (dificultad del set)
  source: "Nombre de la Fuente",       // Campaign o pack de origen
  key: "setkey"                        // Identificador único
}
```

#### 5️⃣ Agregar un Scenario Pack

**Archivo**: `app/src/data/scenarioPacks.ts`

```typescript
// Ejemplo de scenario pack nuevo
{
  name: "Nombre del Scenario Pack",
  key: "scenariokey",
  villain: "villanokey",               // Key del villano incluido
  wave: 5
}
```

#### 6️⃣ Agregar un Hero Pack

**Archivo**: `app/src/data/heroPacks.ts`

```typescript
// Ejemplo de hero pack nuevo
{
  name: "Nombre del Hero Pack",
  key: "heropackkey",
  hero: "heroekey",                    // Key del héroe incluido
  wave: 5
}
```

### 📋 Checklist para Agregar Contenido Completo

Cuando agregas una nueva campaña/pack, asegúrate de:

- [ ] Agregar héroes en `heroes.ts`
- [ ] Agregar villanos en `villains.ts`
- [ ] Agregar sets modulares en `modularSets.ts`
- [ ] Agregar campaña en `campaigns.ts` (si aplica)
- [ ] Agregar scenario packs en `scenarioPacks.ts` (si aplica)
- [ ] Agregar hero packs en `heroPacks.ts` (si aplica)
- [ ] Verificar que todos los `key` sean únicos
- [ ] Verificar que las referencias entre archivos coincidan

### 🔍 Interfaces TypeScript

Las interfaces completas están definidas en `app/src/types/index.ts`. Consulta este archivo para ver todos los campos disponibles y sus tipos.

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
