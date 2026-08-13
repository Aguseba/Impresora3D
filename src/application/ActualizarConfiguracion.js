import { validarConfiguracion } from '../domain/entities/Configuracion.js'

/**
 * @param {object} configuracion
 * @param {import('../domain/repositories/IConfiguracionRepository.js').IConfiguracionRepository} configuracionRepository
 */
export async function actualizarConfiguracion(configuracion, configuracionRepository) {
  const errores = validarConfiguracion(configuracion)
  if (errores.length > 0) {
    throw new Error(errores.join(' '))
  }
  await configuracionRepository.guardar(configuracion)
  return configuracion
}
