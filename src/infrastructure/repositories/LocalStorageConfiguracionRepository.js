import { IConfiguracionRepository } from '../../domain/repositories/IConfiguracionRepository.js'
import { CONFIGURACION_INICIAL } from '../../domain/entities/Configuracion.js'

const CLAVE = 'calculadora3d.configuracion'

/** Implementación concreta de IConfiguracionRepository sobre localStorage. */
export class LocalStorageConfiguracionRepository extends IConfiguracionRepository {
  async obtener() {
    const crudo = localStorage.getItem(CLAVE)
    if (!crudo) return { ...CONFIGURACION_INICIAL }
    try {
      // merge con los valores iniciales por si en el futuro se agrega
      // un parámetro nuevo y el localStorage del usuario es viejo.
      return { ...CONFIGURACION_INICIAL, ...JSON.parse(crudo) }
    } catch {
      return { ...CONFIGURACION_INICIAL }
    }
  }

  async guardar(configuracion) {
    localStorage.setItem(CLAVE, JSON.stringify(configuracion))
    return configuracion
  }
}
