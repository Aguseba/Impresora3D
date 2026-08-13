# TONY PUTO DE MIERDA


# Calculadora 3D — Plan del proyecto y estado actual

Este documento es la fuente de verdad del proyecto. Si estás retomando este
trabajo en una sesión nueva: leé este archivo completo antes de escribir
código. Contiene las decisiones ya tomadas (no las vuelvas a preguntar) y la
especificación de lo que falta construir.

## 1. Contexto y decisiones fijas

- **Uso real de la app**: 100% en el navegador. Sin backend en producción.
  Persistencia en `localStorage`. Se deploya como sitio estático en GitHub
  Pages.
- **Backend FastAPI**: existe como ejercicio/mirror opcional, NO es requisito
  de funcionamiento. Si se implementa, persiste en un archivo JSON en disco
  (nada de bases de datos).
- **Moneda**: ARS en toda la UI.
- **Sin autenticación** — uso local y personal.
- **Clean Architecture** en el frontend, 4 capas independientes:
  `domain` (reglas puras) → `application` (casos de uso) → `infrastructure`
  (localStorage, CSV) → `presentation` (React). `domain` y `application` no
  importan nada de React ni de `localStorage` directamente, solo usan las
  interfaces de `domain/repositories`.
- **No hay campo "cantidad"**: se descartó. El subtotal NO multiplica por
  cantidad; eso lo maneja el usuario manualmente después de ver el costo.
- **No escribir código innecesario**: cada archivo que se cree debe tener un
  motivo concreto ligado a una sección o etapa. Nada especulativo.

### Fórmulas (definitivas, sin cantidad)

```
tiempo_horas       = tiempoMinutos / 60
costoFilamento     = (gramos / 1000) × precioKg
costoElectricidad  = (consumoW × tiempo_horas / 1000) × precioKwh
costoDesgaste       = tiempo_horas × (precioRepuestos / vidaUtilHoras)
subtotal           = costoFilamento + costoElectricidad + costoDesgaste
total              = subtotal × (1 + margenPct / 100)
```

Todos los montos se redondean a 2 decimales. Implementado en
`src/domain/usecases/calcularCosto.js`.

### Parámetros de configuración (valores iniciales)

| Campo | Valor inicial |
|---|---|
| precioKg | 33000 |
| precioKwh | 135 |
| consumoW | 350 |
| precioRepuestos | 33000 |
| vidaUtilHoras | 500 |
| margenPct | 30 |

### Convenciones de nombres

- Entidad `Registro`: `{ id, nombre, gramos, tiempoMinutos, notas, costoFilamento, costoElectricidad, costoDesgaste, subtotal, margenPct, total, fechaCreacion }`
- Entidad `Configuracion`: `{ precioKg, precioKwh, consumoW, precioRepuestos, vidaUtilHoras, margenPct }`
- Claves de `localStorage`: `calculadora3d.registros` (array), `calculadora3d.configuracion` (objeto).

### Diseño / tokens visuales (ya definidos en `tailwind.config.js`)

- Paleta "taller de impresión": `paper` (fondo), `surface` (tarjetas),
  `ink` (texto), `steel` (texto secundario/nav), `line` (bordes), `accent`
  (azul LED, acción principal), `warn` (rojo/naranja, eliminar).
- Tipografías: `font-sans` (Inter, UI general) y `font-mono` (IBM Plex Mono,
  reservada para montos y números — referencia visual a un display LCD).
- Ruteo: `HashRouter` de `react-router-dom` (no `BrowserRouter`) — necesario
  porque GitHub Pages no resuelve rutas del lado del servidor.

## 2. Estado actual del proyecto

### Etapa 0 — Setup ✅ Hecho
- `package.json`, `vite.config.js` (`base: './'`), `tailwind.config.js`,
  `postcss.config.js`, `index.html`, `.gitignore`, `README.md`.
- `src/main.jsx` (monta `HashRouter`), `src/App.jsx` (layout + navegación +
  rutas), `src/index.css`.
- Placeholders en `src/presentation/pages/`: `CalculadoraPage.jsx`,
  `ModelosYGastosPage.jsx`, `ConfiguracionPage.jsx`,
  `ImportarExportarPage.jsx`.
- Árbol de carpetas completo: `src/domain`, `src/application`,
  `src/infrastructure/{repositories,csv}`, `src/presentation/{pages,components,hooks,shared}`.

### Etapa 1 — Domain ✅ Hecho
- `src/domain/entities/Registro.js` — `validarDatosRegistro()`,
  `crearRegistro()`, `actualizarRegistro()`.
- `src/domain/entities/Configuracion.js` — `CONFIGURACION_INICIAL`,
  `validarConfiguracion()`.
- `src/domain/usecases/calcularCosto.js` — función pura con las fórmulas.
- `src/domain/repositories/IRegistroRepository.js` — contrato (clase
  abstracta) con `listar()`, `obtener(id)`, `guardar(registro)`,
  `eliminar(id)`.
- `src/domain/repositories/IConfiguracionRepository.js` — contrato con
  `obtener()`, `guardar(configuracion)`.

**Nada de lo anterior debe modificarse en las próximas etapas salvo que se
detecte un bug.** Las etapas siguientes construyen sobre esto.

### Etapa 2 — Infrastructure (localStorage + CSV) ✅ Hecho
- `src/infrastructure/repositories/LocalStorageRegistroRepository.js` —
  implementa `IRegistroRepository` sobre la clave `calculadora3d.registros`,
  con `guardar()` haciendo upsert por `id`.
- `src/infrastructure/repositories/LocalStorageConfiguracionRepository.js` —
  implementa `IConfiguracionRepository` sobre `calculadora3d.configuracion`;
  si no hay nada guardado devuelve `CONFIGURACION_INICIAL` (hace merge para
  tolerar parámetros nuevos si el localStorage del usuario es viejo).
- `src/infrastructure/csv/csvParser.js` — `parsearCSV(texto)`, sin
  librerías externas.
- `src/infrastructure/csv/csvSerializer.js` — `serializarCSV(registros)`,
  columnas fijas: `nombre,gramos,tiempo_minutos,notas,costo_filamento,costo_electricidad,costo_desgaste,subtotal,total,fecha`.

## 3. Etapas pendientes — especificación archivo por archivo

### Etapa 3 — Application (casos de uso) ✅ Hecho
Todos en `src/application/`, cada uno recibe el/los repositorio(s) como
parámetro (inyección simple, sin librerías de DI):
- `CrearRegistro.js` — `crearRegistro(datos, configuracion, registroRepository)`.
- `ListarRegistros.js` — `listarRegistros(registroRepository)`.
- `ObtenerRegistro.js` — `obtenerRegistro(id, registroRepository)`.
- `ActualizarRegistro.js` — `actualizarRegistro(id, datos, configuracion, registroRepository)`, tira error si el `id` no existe.
- `EliminarRegistro.js` — `eliminarRegistro(id, registroRepository)`.
- `ObtenerConfiguracion.js` — `obtenerConfiguracion(configuracionRepository)`.
- `ActualizarConfiguracion.js` — `actualizarConfiguracion(configuracion, configuracionRepository)`, valida antes de guardar.
- `ImportarRegistrosCSV.js` — `importarRegistrosCSV(textoCSV, configuracion, registroRepository)` → `{ importados, errores: [{fila, motivo}] }`. Ignora a propósito cualquier columna de costos del CSV: siempre recalcula con la configuración vigente.
- `ExportarRegistrosCSV.js` — `exportarRegistrosCSV(registroRepository)` → string CSV.

Nota de diseño: `ImportarRegistrosCSV` y `ExportarRegistrosCSV` importan
directamente `infrastructure/csv/*` (parser/serializer), en vez de pasar por
una interfaz de dominio — es una excepción pragmática a la regla de
dependencias, porque el CSV es un formato de transporte, no una fuente de
persistencia con estado.

### Etapa 4 — UI: Calculadora (`CalculadoraPage.jsx`) ✅ Hecho
- `src/infrastructure/repositorios.js` — composition root: instancia única
  de `registroRepository` y `configuracionRepository`. Es el único lugar
  del proyecto que sabe que la implementación es `localStorage`; toda la UI
  importa desde acá, nunca instancia repositorios por su cuenta.
- `src/presentation/shared/formatters.js` — `formatearTiempo(minutos)` (ej.
  `185` → `"3h 5m"`) y `formatearMoneda(valor)` (`Intl.NumberFormat` en
  `es-AR`/ARS).
- `src/presentation/hooks/useCalculadora.js` — estado del formulario,
  cálculo en vivo con `calcularCosto` (sin tocar el repositorio hasta
  guardar) y `guardar()` que llama a `crearRegistro` (application) y
  resetea el formulario.
- `src/presentation/pages/CalculadoraPage.jsx` — implementación real
  (reemplaza el placeholder de la Etapa 0). Grid de 2 columnas: formulario
  a la izquierda, panel de resultados en `font-mono` a la derecha, con los
  6 valores desglosados (margen mostrado en ARS, no en %).

### Etapa 5 — UI: Modelos y gastos (`ModelosYGastosPage.jsx`) ✅ Hecho
- `src/presentation/hooks/useRegistros.js` — `listar`/`refrescar`/`eliminar`
  sobre `registroRepository`.
- `src/presentation/components/ConfirmDialog.jsx` — modal de confirmación
  genérico y reutilizable (título, mensaje, `onConfirmar`/`onCancelar`).
- `src/presentation/components/DetalleRegistroModal.jsx` — modal con el
  desglose completo de un registro (filamento/eléctrico/desgaste/subtotal/
  total + notas), se abre con la acción "Ver".
- `src/presentation/pages/ModelosYGastosPage.jsx` — tabla con Modelo,
  Gramos, Tiempo (formateado), Total, Acciones (Ver/Editar/Eliminar).
  "Editar" navega a `/calculadora/:id`. "Eliminar" abre `ConfirmDialog`.
- **Extensión necesaria de la Etapa 4**: `useCalculadora.js` y
  `CalculadoraPage.jsx` ahora también sirven como formulario de edición.
  Se agregó la ruta `/calculadora/:id` en `App.jsx`. El hook detecta el
  `id` de la URL (`useParams`), precarga el registro si existe, y en
  `guardar()` llama a `actualizarRegistro` en vez de `crearRegistro`,
  navegando de vuelta a `/modelos` al terminar. El modo creación
  (`/calculadora` sin id) sigue funcionando exactamente igual que antes.

### Etapa 6 — UI: Configuración (`ConfiguracionPage.jsx`) ✅ Hecho
- `src/presentation/hooks/useConfiguracion.js` — carga los 6 parámetros
  como strings (para que los `<input>` controlados no peleen con ceros a
  la izquierda mientras se tipea), valida y guarda con
  `actualizarConfiguracion`.
- `src/presentation/pages/ConfiguracionPage.jsx` — formulario agrupado en
  3 `fieldset`: Materiales (Tipo fijo "PLA" + Precio por Kg editable),
  Costos operativos (kWh, W, repuestos, vida útil), Margen. Aclara en texto
  que los cambios solo afectan cálculos nuevos, no los registros ya
  guardados (que tienen su costo como snapshot).

### Etapa 7 — UI: Importar/Exportar (`ImportarExportarPage.jsx`) ✅ Hecho
- `src/presentation/shared/descargarArchivo.js` — helper genérico que
  dispara la descarga de un string como archivo (`Blob` + link temporal),
  reutilizado por la plantilla y por el export.
- `src/presentation/hooks/useImportarExportar.js` — `descargarPlantilla()`
  (CSV vacío solo con headers), `exportar()` (usa `exportarRegistrosCSV`),
  `importar(archivo)` (lee el `File` con `archivo.text()`, obtiene la
  configuración actual y llama a `importarRegistrosCSV`).
- `src/presentation/pages/ImportarExportarPage.jsx` — 2 tarjetas: Exportar
  registros, e Importar desde Excel (con botón de plantilla, input de
  archivo oculto disparado por botón, y resumen de resultado con errores
  fila por fila).

### Etapa 8 — Deploy a GitHub Pages ✅ Hecho
- `vite.config.js` con `base: './'` (ya estaba desde la Etapa 0).
- `.github/workflows/deploy.yml` — build con `npm run build` en cada push a
  `main` (o manual vía `workflow_dispatch`), publica `dist/` usando el
  flujo oficial de GitHub Pages por Actions (`upload-pages-artifact` +
  `deploy-pages`), no la rama `gh-pages` clásica.
- `README.md` actualizado con los pasos: subir a GitHub, activar
  **Settings → Pages → Source: GitHub Actions**, y listo — cada push
  deploya solo.

### Etapa 9 — Recalcular registros existentes (pedido nuevo del usuario)

Botón en Configuración, al lado de "Guardar configuración", que recorre
todos los registros guardados y les recalcula los costos con los
parámetros que se acaban de guardar (hasta ahora, cambiar la configuración
solo afectaba a registros *nuevos*; esto permite además actualizar los
*existentes* a pedido, sin que sea automático).

- **`src/application/RecalcularRegistros.js`** — nuevo caso de uso:
  `recalcularRegistros(configuracion, registroRepository)`. Lista todos los
  registros, para cada uno vuelve a correr `calcularCosto` con sus
  `gramos`/`tiempoMinutos` originales y la configuración nueva, arma el
  registro actualizado (mismo `id`, mismo `fechaCreacion`) y lo guarda.
  Devuelve la cantidad de registros actualizados.
- **`src/presentation/hooks/useConfiguracion.js`** (editar) — agregar
  `recalculando` (estado) y una función `recalcular()` que llama a
  `guardar()` primero (para no recalcular con datos sin guardar) y después
  a `recalcularRegistros`, mostrando cuántos registros se actualizaron en
  `mensaje`.
- **`src/presentation/pages/ConfiguracionPage.jsx`** (editar) — agregar un
  segundo botón junto a "Guardar configuración", ej. "Guardar y actualizar
  modelos existentes", con su propio estado de carga.

### Etapa 10 — Backend FastAPI (opcional, independiente del frontend)

Mismo patrón Clean Architecture en Python, mismas fórmulas, persistencia en
un único archivo `data/registros.json` + `data/configuracion.json`. No se
conecta al frontend salvo que el usuario lo pida explícitamente más
adelante. Estructura:

```
app/
├── domain/entities/registro.py, configuracion.py
├── domain/usecases/calcular_costo.py
├── application/use_cases/*.py
├── infrastructure/persistence/json_registro_repository.py, json_configuracion_repository.py
├── infrastructure/api/routers/*.py + schemas/*.py (Pydantic)
└── main.py
```

## 4. Cómo continuar

Trabajar una etapa a la vez, en orden. Antes de escribir código de una
etapa, releer la sección correspondiente acá arriba. Al terminar una etapa,
actualizar este archivo marcándola como hecha (mover su descripción a la
sección "Estado actual") para que la siguiente sesión no pierda el hilo...
