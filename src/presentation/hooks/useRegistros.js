import { useCallback, useEffect, useState } from 'react'
import { listarRegistros } from '../../application/ListarRegistros.js'
import { eliminarRegistro as eliminarRegistroUseCase } from '../../application/EliminarRegistro.js'
import { registroRepository } from '../../infrastructure/repositorios.js'

export function useRegistros() {
  const [registros, setRegistros] = useState([])
  const [cargando, setCargando] = useState(true)

  const refrescar = useCallback(async () => {
    setCargando(true)
    const lista = await listarRegistros(registroRepository)
    setRegistros(lista)
    setCargando(false)
  }, [])

  useEffect(() => {
    refrescar()
  }, [refrescar])

  async function eliminar(id) {
    await eliminarRegistroUseCase(id, registroRepository)
    await refrescar()
  }

  return { registros, cargando, eliminar, refrescar }
}
