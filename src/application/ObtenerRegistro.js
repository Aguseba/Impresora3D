/** @param {import('../domain/repositories/IRegistroRepository.js').IRegistroRepository} registroRepository */
export async function obtenerRegistro(id, registroRepository) {
  return registroRepository.obtener(id)
}
