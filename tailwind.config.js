/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta pensada como "taller de impresión": base neutra fría
        // (superficie de la impresora) + un acento azul LED, no el
        // terracota/violeta genérico de IA.
        ink: '#1C2126',       // texto principal
        paper: '#F6F7F8',     // fondo de página
        surface: '#FFFFFF',   // tarjetas / paneles
        line: '#DDE1E5',      // bordes, divisores
        steel: '#3A4A5C',     // navegación, texto secundario
        accent: '#2E7DA6',    // acento principal (azul LED de impresora)
        accentDark: '#215A79',
        warn: '#B5502B',      // alertas / eliminar
      },
      fontFamily: {
        // Inter para UI general, IBM Plex Mono para números y montos:
        // referencia visual al display LCD de una impresora 3D.
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
}
