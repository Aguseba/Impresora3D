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

## Cómo publicarla en GitHub Pages

1. Subí este proyecto a un repositorio de GitHub (rama `main`).
2. En el repo, andá a **Settings → Pages** y en "Build and deployment"
   elegí **Source: GitHub Actions**.
3. Cada push a `main` dispara `.github/workflows/deploy.yml`, que
   instala dependencias, corre `npm run build` y publica `dist/`
   automáticamente. También podés dispararlo a mano desde la pestaña
   **Actions** (`workflow_dispatch`).
4. La URL final queda en `Settings → Pages` una vez que termine el
   primer deploy (normalmente `https://tu-usuario.github.io/tu-repo/`).

No hace falta ningún paso manual de build ni de copiar archivos: el
workflow se encarga de todo.

## Estructura (Clean Architecture)

- `src/domain` — entidades y reglas de negocio puras (fórmulas de costo).
- `src/application` — casos de uso que orquestan domain + repositorios.
- `src/infrastructure` — implementaciones concretas (localStorage, CSV).
- `src/presentation` — UI en React (páginas, componentes, hooks).
