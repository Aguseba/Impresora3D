/**
 * Entidad Configuración: los 6 parámetros globales que usa calcularCosto().
 * Estos son los valores iniciales que diste — se usan solo si todavía
 * no hay nada guardado en el repositorio.
 */
export const CONFIGURACION_INICIAL = {
  precioKg: 33000,       // ARS por kg de filamento (PLA)
  precioKwh: 135,        // ARS por kWh
  consumoW: 350,         // Consumo de la impresora, en watts
  precioRepuestos: 33000, // ARS, costo de repuestos a amortizar
  vidaUtilHoras: 500,     // Horas de vida útil de esos repuestos
  margenPct: 30,          // % de margen de ganancia
}

const CAMPOS = Object.keys(CONFIGURACION_INICIAL)

/** Valida que los 6 parámetros sean números válidos (>= 0). */
export function validarConfiguracion(configuracion) {
  const errores = []
  for (const campo of CAMPOS) {
    const valor = configuracion?.[campo]
    if (typeof valor !== 'number' || Number.isNaN(valor) || valor < 0) {
      errores.push(`El parámetro "${campo}" debe ser un número mayor o igual a 0.`)
    }
  }
  return errores
}
