/** Dispara la descarga de un string como archivo del navegador. */
export function descargarArchivo(nombreArchivo, contenido, tipoMime = 'text/csv') {
  const blob = new Blob([contenido], { type: tipoMime })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = nombreArchivo
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
