import { LocalStorageRegistroRepository } from './repositories/LocalStorageRegistroRepository.js'
import { LocalStorageConfiguracionRepository } from './repositories/LocalStorageConfiguracionRepository.js'

// Único lugar del proyecto donde se elige la implementación concreta de
// los repositorios. Si algún día se reemplaza localStorage por una API,
// alcanza con cambiar estas dos líneas — nada de application ni de
// presentation necesita tocarse.
export const registroRepository = new LocalStorageRegistroRepository()
export const configuracionRepository = new LocalStorageConfiguracionRepository()
