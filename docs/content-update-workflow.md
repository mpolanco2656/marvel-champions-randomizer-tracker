# Flujo de actualización de contenido

Este documento es el punto de entrada para actualizar el catálogo de Marvel Champions. Los scripts ayudan a detectar datos y descargar imágenes, pero **no agregan automáticamente contenido a los archivos TypeScript que consume la aplicación**.

## Fuentes de verdad

| Dato | Fuente principal | Uso |
| --- | --- | --- |
| Héroes, packs, aspecto preconstruido e imagen de carta | API pública de MarvelCDB | Descubrimiento y comprobación técnica |
| Nombre y contenido de un producto | Página oficial de Fantasy Flight Games | Confirmar qué incluye cada producto |
| `tier`, `complexity`, `playstyle`, `optimization`, dificultad y descripciones | Investigación y revisión humana | Campos editoriales; no los determina el scraper |
| Catálogo que usa la aplicación | `app/src/data/*.ts` | Fuente activa en runtime |

La investigación editorial existente está en [Marvel-Champions-Complete-Progression-Guide-&-Randomize-Design-Research.md](./Marvel-Champions-Complete-Progression-Guide-&-Randomize-Design-Research.md). Está fechada en noviembre de 2025: sirve como metodología y referencia, pero sus conteos y valoraciones pueden quedar desactualizados.

## Qué hace cada comando

Ejecutar los comandos desde `app/`:

```powershell
cd app
npm.cmd run content:refresh
npm.cmd run content:hero-images
npm.cmd run content:pack-images
npm.cmd run content:encounter-images
npm.cmd run content:audit-aspects
```

| Comando | Lee | Escribe o comprueba | Limitación importante |
| --- | --- | --- | --- |
| `content:refresh` | API de MarvelCDB y `heroes.ts` | Sobrescribe `src/data/generated/marvelcdb-snapshot.json` | Solo genera un snapshot y `missingInApp`; no modifica `heroes.ts` |
| `content:hero-images` | API de MarvelCDB y héroes ya registrados | Descarga PNG faltantes en `public/hero-images/` | No descarga héroes que todavía no existen en `heroes.ts` |
| `content:pack-images` | `campaigns.ts`, `scenarioPacks.ts` y páginas FFG configuradas | Descarga JPG faltantes en `public/pack-images/` | A pesar del nombre, no procesa `heroPacks.ts`; requiere un mapeo en `PRODUCT_PAGE_URLS` |
| `content:encounter-images` | `villains.ts`, `modularSets.ts` y API de MarvelCDB | Descarga JPG faltantes en `public/villain-images/` y `public/modular-images/` | Solo resuelve fuentes presentes en `SOURCE_PACK_CODES`; algunos nombres necesitan alias u override |
| `content:audit-aspects` | API de MarvelCDB y `heroes.ts` | Imprime una auditoría y termina con error si encuentra diferencias estrictas | Solo marca automáticamente como error los Hero Packs y Deadpool; héroes de cajas compartidas requieren revisión manual |

Si Node falla en Windows con un error de certificado y la CA del sistema es confiable, repetir la sesión con:

```powershell
$env:NODE_OPTIONS='--use-system-ca'
```

No desactivar la validación TLS.

## Procedimiento completo

### 1. Preparar el cambio

1. Partir de `main` actualizado y crear una rama específica.
2. Ejecutar `git status --short` y separar cualquier cambio previo no relacionado.
3. Ejecutar `content:refresh`.
4. Revisar `missingInApp` en `src/data/generated/marvelcdb-snapshot.json`.

La presencia de un héroe o pack en MarvelCDB no garantiza que todos los datos del producto estén disponibles. Un snapshot exitoso tampoco significa que el catálogo activo se haya actualizado.

### 2. Confirmar que hay información suficiente

Antes de agregar un producto, confirmar:

- nombre oficial y tipo de producto;
- héroes incluidos y sus aspectos preconstruidos;
- villanos, sets modulares y orden de campaña, cuando aplique;
- wave que se usará en el catálogo;
- imágenes disponibles;
- fuentes suficientes para asignar los campos editoriales.

Si solo está disponible una parte, registrar únicamente contenido confirmado o esperar. No inventar villanos, modulares, aspectos ni clasificaciones para completar el lote.

### 3. Actualizar manualmente el catálogo activo

Los archivos que consume la aplicación están en `app/src/data/`:

- `heroes.ts`: todos los héroes jugables, sin importar si vienen en una caja o en un Hero Pack individual.
- `heroPacks.ts`: solamente productos Hero Pack individuales usados por el collection tracker.
- `campaigns.ts`: Core Set y cajas de campaña, con las keys de sus villanos.
- `villains.ts`: escenarios/villanos seleccionables.
- `modularSets.ts`: sets modulares seleccionables.
- `scenarioPacks.ts`: productos Scenario Pack y la key de su villano principal.

Regla importante: los dos héroes incluidos en una caja se agregan a `heroes.ts`, pero **no** a `heroPacks.ts`. Por ejemplo, Hawkeye y Spider-Woman pertenecen a `Rise of Red Skull` y aparecen como héroes, mientras la caja se registra en `campaigns.ts`.

Para cada registro:

- conservar una `key` estable, única y compatible con el nombre del archivo de imagen;
- usar en `source` exactamente el nombre esperado por los demás archivos y mapeos;
- verificar que `Campaign.villains`, `ScenarioPack.villain` y `HeroPack.hero` apunten a keys existentes;
- respetar los tipos definidos en `app/src/types/index.ts`;
- mantener los objetos en el formato actual de una línea: los scripts usan expresiones regulares simples para leer los `.ts`.

Para un héroe, MarvelCDB puede aportar nombre, pack, aspecto preconstruido e imagen. Todavía se deben decidir y revisar manualmente:

- `tier`;
- `complexity`;
- `playstyle`;
- `optimization`;
- `wave`;
- `description`;
- `key` y `source` usados por la aplicación.

### 4. Mantener los mapeos del pipeline

Revisar `app/scripts/marvelcdb-utils.mjs` cuando se incorpora una fuente nueva:

- `SOURCE_PACK_CODES`: relaciona el valor exacto de `source` con el código de MarvelCDB.
- `PRODUCT_PAGE_URLS`: relaciona la key de una campaña o Scenario Pack con su página oficial para descargar la imagen del producto.
- `HERO_ALIASES`: resuelve nombres de héroes que no coinciden directamente.

Revisar también `aliases` y `sourceOverrides` en `app/scripts/download-encounter-images.mjs` cuando un villano o modular no coincide con el nombre publicado por MarvelCDB.

Un mensaje `Missing image` puede significar que la imagen aún no existe, pero también que falta uno de estos mapeos. Hay que revisar la causa antes de concluir que la fuente no ofrece la imagen.

### 5. Descargar imágenes después de registrar el contenido

Ejecutar los descargadores después de editar los archivos TypeScript. Las rutas esperadas son:

```text
public/hero-images/<hero.key>.png
public/villain-images/<villain.key>.jpg
public/modular-images/<modular.key>.jpg
public/pack-images/<campaign-or-scenario-pack.key>.jpg
```

Las rutas están implementadas aunque el archivo no exista. En ese caso el navegador recibe un recurso faltante y la interfaz oculta la imagen o muestra su fallback; una ruta implementada no confirma que la imagen esté incluida en el deploy.

### 6. Auditar y validar

```powershell
npm.cmd run content:audit-aspects
npm.cmd run build
npm.cmd run lint
git diff --check
git status --short
```

Después:

1. Revisar todo el diff, incluido el snapshot generado.
2. Comprobar que no haya keys duplicadas ni referencias rotas.
3. Abrir la aplicación y revisar colección, randomizer, campañas e imágenes.
4. Confirmar que los archivos descargados no estén vacíos o corruptos.
5. Incluir en el commit únicamente los datos, imágenes y mapeos del lote aprobado.

Si `lint` falla por un problema previo de configuración, anotarlo por separado; no presentarlo como validación exitosa del contenido.

## Criterio para detenerse

El lote no está listo para merge cuando ocurre cualquiera de estos casos:

- MarvelCDB lista nombres, pero faltan datos suficientes para construir los registros activos;
- no se pudo confirmar oficialmente qué incluye el producto;
- faltan clasificaciones editoriales y no hay una base confiable para decidirlas;
- hay referencias rotas entre los archivos TypeScript;
- el build falla;
- el diff contiene cambios ajenos al lote.

Las imágenes faltantes no siempre bloquean el catálogo, pero deben documentarse explícitamente porque el deploy mostrará el fallback correspondiente.

## Deploy

El contenido solo llega al servidor después de hacer merge a la rama desplegada y reconstruir la imagen de la aplicación. Seguir [deploy-vps.md](./deploy-vps.md) para el procedimiento del VPS.
