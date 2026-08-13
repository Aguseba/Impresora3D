/** @param {import('../domain/repositories/IRegistroRepository.js').IRegistroRepository} registroRepository */
export async function eliminarRegistro(id, registroRepository) {
  await registroRepository.eliminar(id)
}
