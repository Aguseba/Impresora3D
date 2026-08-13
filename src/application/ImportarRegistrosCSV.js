import { parsearCSV } from '../infrastructure/csv/csvParser.js'
import { calcularCosto } from '../domain/usecases/calcularCosto.js'
import { crearRegistro as crearRegistroEntidad } from '../domain/entities/Registro.js'

/**
 * Importa registros desde un CSV con columnas nombre, gramos,
 * tiempo_minutos, notas (opcional). Cualquier columna de costos que
 * traiga el archivo se ignora a propósito: los costos siempre se
 * recalculan con la configuración vigente, para no arrastrar precios
 * viejos de un Excel.
 *
 * @param {string} textoCSV
 * @param {object} configuracion
 * @param {import('../domain/repositories/IRegistroRepository.js').IRegistroRepository} registroRepository
 * @returns {Promise<{importados: number, errores: Array<{fila: number, motivo: string}>}>}
 */
export async function importarRegistrosCSV(textoCSV, configuracion, registroRepository) {
  const filas = parsearCSV(textoCSV)
  const resultado = { importados: 0, errores: [] }

  for (const [indice, fila] of filas.entries()) {
    const numeroFila = indice + 2 // fila 1 = headers

    try {
      const datos = {
        nombre: fila['nombre'],
        gramos: Number(fila['gramos']),
        tiempoMinutos: Number(fila['tiempo_minutos']),
        notas: fila['notas'] ?? '',
      }

      const costos = calcularCosto(datos, configuracion)
      const registro = crearRegistroEntidad({ ...datos, costos })
      await registroRepository.guardar(registro)
      resultado.importados += 1
    } catch (error) {
      resultado.errores.push({ fila: numeroFila, motivo: error.message })
    }
  }

  return resultado
}
