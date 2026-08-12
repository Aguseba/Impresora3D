# Calculadora 3D

App local para calcular el costo de impresiones 3D. Sin backend en producción:
todos los datos se guardan en el `localStorage` del navegador.

## Cómo correrla

```bash
npm install
npm run dev
```

## Cómo generar el build para GitHub Pages

```bash
npm run build
```

Esto genera la carpeta `dist/`, lista para publicar en GitHub Pages
(el proyecto usa rutas relativas y hash-routing, así que funciona
tanto en la raíz de un dominio como en una subcarpeta de repo).

## Estructura (Clean Architecture)

- `src/domain` — entidades y reglas de negocio puras (fórmulas de costo).
- `src/application` — casos de uso que orquestan domain + repositorios.
- `src/infrastructure` — implementaciones concretas (localStorage, CSV).
- `src/presentation` — UI en React (páginas, componentes, hooks).
