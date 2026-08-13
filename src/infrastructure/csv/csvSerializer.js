const COLUMNAS = [
  'nombre',
  'gramos',
  'tiempo_minutos',
  'notas',
  'costo_filamento',
  'costo_electricidad',
  'costo_desgaste',
  'subtotal',
  'total',
  'fecha',
]

/**
 * Convierte un array de Registro (ver domain/entities/Registro.js) a
 * texto CSV, con columnas en un orden fijo para que la plantilla de
 * import/export sea siempre consistente.
 *
 * @param {Array<object>} registros
 * @returns {string}
 */
export function serializarCSV(registros) {
  const filas = registros.map((r) =>
    [
      escaparCampo(r.nombre),
      r.gramos,
      r.tiempoMinutos,
      escaparCampo(r.notas ?? ''),
      r.costoFilamento,
      r.costoElectricidad,
      r.costoDesgaste,
      r.subtotal,
      r.total,
      r.fechaCreacion,
    ].join(','),
  )

  return [COLUMNAS.join(','), ...filas].join('\n')
}

/** Si un campo de texto tiene comas, lo envuelve en comillas. */
function escaparCampo(valor) {
  const texto = String(valor ?? '')
  return texto.includes(',') ? `"${texto}"` : texto
}
