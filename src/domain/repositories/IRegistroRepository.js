/**
 * Contrato que debe cumplir cualquier repositorio de registros
 * (localStorage hoy, podría ser una API mañana). La capa de
 * application depende de esta interfaz, nunca de una implementación
 * concreta directamente.
 */
export class IRegistroRepository {
  /** @returns {Promise<Array<object>>} */
  async listar() {
    throw new Error('IRegistroRepository.listar no implementado')
  }

  /** @returns {Promise<object|null>} */
  async obtener(id) {
    throw new Error('IRegistroRepository.obtener no implementado')
  }

  /** Crea o reemplaza un registro (upsert por id). */
  async guardar(registro) {
    throw new Error('IRegistroRepository.guardar no implementado')
  }

  async eliminar(id) {
    throw new Error('IRegistroRepository.eliminar no implementado')
  }
}
