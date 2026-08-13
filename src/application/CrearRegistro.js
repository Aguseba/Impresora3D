import { calcularCosto } from '../domain/usecases/calcularCosto.js'
import { crearRegistro as crearRegistroEntidad } from '../domain/entities/Registro.js'

/**
 * @param {{nombre: string, gramos: number, tiempoMinutos: number, notas?: string}} datos
 * @param {object} configuracion
 * @param {import('../domain/repositories/IRegistroRepository.js').IRegistroRepository} registroRepository
 */
export async function crearRegistro(datos, configuracion, registroRepository) {
  const costos = calcularCosto(datos, configuracion)
  const registro = crearRegistroEntidad({ ...datos, costos })
  await registroRepository.guardar(registro)
  return registro
}
