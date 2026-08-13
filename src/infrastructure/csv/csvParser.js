/**
 * Parsea texto CSV a un array de objetos, usando la primera fila como
 * headers. Formato simple: separado por comas, sin comillas ni comas
 * dentro de un campo (alcanza para exportaciones de Excel con columnas
 * simples como nombre/gramos/tiempo/notas).
 *
 * @param {string} texto
 * @returns {Array<Record<string, string>>}
 */
export function parsearCSV(texto) {
  const lineas = texto
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0)

  if (lineas.length === 0) return []

  const headers = lineas[0].split(',').map((h) => h.trim().toLowerCase())

  return lineas.slice(1).map((linea) => {
    const valores = linea.split(',').map((v) => v.trim())
    const fila = {}
    headers.forEach((header, i) => {
      fila[header] = valores[i] ?? ''
    })
    return fila
  })
}
