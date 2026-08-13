import { IRegistroRepository } from '../../domain/repositories/IRegistroRepository.js'

const CLAVE = 'calculadora3d.registros'

/** Implementación concreta de IRegistroRepository sobre localStorage. */
export class LocalStorageRegistroRepository extends IRegistroRepository {
  async listar() {
    const crudo = localStorage.getItem(CLAVE)
    if (!crudo) return []
    try {
      return JSON.parse(crudo)
    } catch {
      // localStorage corrupto o editado a mano: no rompemos la app.
      return []
    }
  }

  async obtener(id) {
    const registros = await this.listar()
    return registros.find((r) => r.id === id) ?? null
  }

  async guardar(registro) {
    const registros = await this.listar()
    const indice = registros.findIndex((r) => r.id === registro.id)
    if (indice >= 0) {
      registros[indice] = registro
    } else {
      registros.push(registro)
    }
    localStorage.setItem(CLAVE, JSON.stringify(registros))
    return registro
  }

  async eliminar(id) {
    const registros = await this.listar()
    const filtrados = registros.filter((r) => r.id !== id)
    localStorage.setItem(CLAVE, JSON.stringify(filtrados))
  }
}
