import { calcularCosto } from '../domain/usecases/calcularCosto.js'
import { actualizarRegistro as actualizarRegistroEntidad } from '../domain/entities/Registro.js'

/**
 * @param {string} id
 * @param {{nombre: string, gramos: number, tiempoMinutos: number, notas?: string}} datos
 * @param {object} configuracion
 * @param {import('../domain/repositories/IRegistroRepository.js').IRegistroRepository} registroRepository
 */
export async function actualizarRegistro(id, datos, configuracion, registroRepository) {
  const existente = await registroRepository.obtener(id)
  if (!existente) {
    throw new Error('El registro que intentás editar no existe.')
  }

  const costos = calcularCosto(datos, configuracion)
  const actualizado = actualizarRegistroEntidad(existente, { ...datos, costos })
  await registroRepository.guardar(actualizado)
  return actualizado
}
