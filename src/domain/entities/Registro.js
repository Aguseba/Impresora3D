/**
 * Entidad Registro: la forma final de una impresión ya calculada,
 * lista para guardar. No sabe nada de localStorage ni de React.
 *
 * Forma resultante:
 * {
 *   id, nombre, gramos, tiempoMinutos, notas,
 *   costoFilamento, costoElectricidad, costoDesgaste, subtotal, margenPct, total,
 *   fechaCreacion
 * }
 */

/** Valida los datos que ingresa el usuario, antes de calcular costos. */
export function validarDatosRegistro({ nombre, gramos, tiempoMinutos }) {
  const errores = []

  if (!nombre || !nombre.trim()) {
    errores.push('El nombre del modelo es obligatorio.')
  }
  if (typeof gramos !== 'number' || Number.isNaN(gramos) || gramos <= 0) {
    errores.push('El peso en gramos debe ser un número mayor a 0.')
  }
  if (typeof tiempoMinutos !== 'number' || Number.isNaN(tiempoMinutos) || tiempoMinutos <= 0) {
    errores.push('El tiempo en minutos debe ser un número mayor a 0.')
  }

  return errores
}

/**
 * Arma un Registro nuevo. `costos` es el resultado de calcularCosto()
 * (ver usecases/calcularCosto.js) — esta función no calcula nada,
 * solo valida y ensambla.
 */
export function crearRegistro({ nombre, gramos, tiempoMinutos, notas, costos }) {
  const errores = validarDatosRegistro({ nombre, gramos, tiempoMinutos })
  if (errores.length > 0) {
    throw new Error(errores.join(' '))
  }

  return {
    id: crypto.randomUUID(),
    nombre: nombre.trim(),
    gramos,
    tiempoMinutos,
    notas: notas?.trim() || '',
    ...costos,
    fechaCreacion: new Date().toISOString(),
  }
}

/** Devuelve una copia de un registro existente con datos y costos actualizados. */
export function actualizarRegistro(registroExistente, { nombre, gramos, tiempoMinutos, notas, costos }) {
  const errores = validarDatosRegistro({ nombre, gramos, tiempoMinutos })
  if (errores.length > 0) {
    throw new Error(errores.join(' '))
  }

  return {
    ...registroExistente,
    nombre: nombre.trim(),
    gramos,
    tiempoMinutos,
    notas: notas?.trim() || '',
    ...costos,
  }
}
