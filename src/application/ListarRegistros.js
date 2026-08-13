/** @param {import('../domain/repositories/IRegistroRepository.js').IRegistroRepository} registroRepository */
export async function listarRegistros(registroRepository) {
  return registroRepository.listar()
}
