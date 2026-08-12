import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base: './' hace que el build funcione tanto en la raíz de un dominio
// como en una subcarpeta de GitHub Pages (usuario.github.io/repo/),
// sin tener que hardcodear el nombre del repo acá.
export default defineConfig({
  plugins: [react()],
  base: './',
})
