/**
 * Calcula los costos de una impresión a partir de sus datos y la
 * configuración global. Es una función pura: mismos inputs, mismo
 * resultado siempre, sin leer ni escribir nada externo.
 *
 * @param {{ gramos: number, tiempoMinutos: number }} datos
 * @param {import('../entities/Configuracion.js').CONFIGURACION_INICIAL} configuracion
 * @returns {{
 *   costoFilamento: number, costoElectricidad: number, costoDesgaste: number,
 *   subtotal: number, margenPct: number, total: number
 * }}
 */
export function calcularCosto({ gramos, tiempoMinutos }, configuracion) {
  const { precioKg, precioKwh, consumoW, precioRepuestos, vidaUtilHoras, margenPct } = configuracion

  const tiempoHoras = tiempoMinutos / 60

  const costoFilamento = (gramos / 1000) * precioKg
  const costoElectricidad = ((consumoW * tiempoHoras) / 1000) * precioKwh
  const costoDesgaste = tiempoHoras * (precioRepuestos / vidaUtilHoras)
  const subtotal = costoFilamento + costoElectricidad + costoDesgaste
  const total = subtotal * (1 + margenPct / 100)

  return {
    costoFilamento: redondear(costoFilamento),
    costoElectricidad: redondear(costoElectricidad),
    costoDesgaste: redondear(costoDesgaste),
    subtotal: redondear(subtotal),
    margenPct,
    total: redondear(total),
  }
}

/** Redondea a 2 decimales (centavos de ARS). */
function redondear(valor) {
  return Math.round(valor * 100) / 100
}
