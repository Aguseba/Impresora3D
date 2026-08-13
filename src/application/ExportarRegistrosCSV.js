import { serializarCSV } from '../infrastructure/csv/csvSerializer.js'

/** @param {import('../domain/repositories/IRegistroRepository.js').IRegistroRepository} registroRepository */
export async function exportarRegistrosCSV(registroRepository) {
  const registros = await registroRepository.listar()
  return serializarCSV(registros)
}
