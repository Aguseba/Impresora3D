/**
 * Contrato para leer/guardar la configuración global. Igual que
 * IRegistroRepository: la capa de application solo conoce esta forma,
 * no dónde se guardan realmente los datos.
 */
export class IConfiguracionRepository {
  /** @returns {Promise<object>} */
  async obtener() {
    throw new Error('IConfiguracionRepository.obtener no implementado')
  }

  async guardar(configuracion) {
    throw new Error('IConfiguracionRepository.guardar no implementado')
  }
}
