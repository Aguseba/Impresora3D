/** @param {import('../domain/repositories/IConfiguracionRepository.js').IConfiguracionRepository} configuracionRepository */
export async function obtenerConfiguracion(configuracionRepository) {
  return configuracionRepository.obtener()
}
