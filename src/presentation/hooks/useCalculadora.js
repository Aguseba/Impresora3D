import { useEffect, useMemo, useState } from 'react'
import { calcularCosto } from '../../domain/usecases/calcularCosto.js'
import { crearRegistro } from '../../application/CrearRegistro.js'
import { obtenerConfiguracion } from '../../application/ObtenerConfiguracion.js'
import { registroRepository, configuracionRepository } from '../../infrastructure/repositorios.js'

export function useCalculadora() {
  const [nombre, setNombre] = useState('')
  const [gramos, setGramos] = useState('')
  const [tiempoMinutos, setTiempoMinutos] = useState('')
  const [notas, setNotas] = useState('')
  const [configuracion, setConfiguracion] = useState(null)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState(null) // { tipo: 'exito' | 'error', texto }

  useEffect(() => {
    obtenerConfiguracion(configuracionRepository).then(setConfiguracion)
  }, [])

  const gramosNumero = Number(gramos)
  const tiempoNumero = Number(tiempoMinutos)
  const datosValidos =
    nombre.trim() !== '' && gramosNumero > 0 && tiempoNumero > 0 && configuracion !== null

  // Cálculo en vivo mientras se tipea, sin tocar el repositorio.
  const costos = useMemo(() => {
    if (!datosValidos) return null
    return calcularCosto({ gramos: gramosNumero, tiempoMinutos: tiempoNumero }, configuracion)
  }, [datosValidos, gramosNumero, tiempoNumero, configuracion])

  async function guardar() {
    if (!datosValidos) return
    setGuardando(true)
    setMensaje(null)
    try {
      await crearRegistro(
        { nombre, gramos: gramosNumero, tiempoMinutos: tiempoNumero, notas },
        configuracion,
        registroRepository,
      )
      setMensaje({ tipo: 'exito', texto: 'Registro guardado.' })
      setNombre('')
      setGramos('')
      setTiempoMinutos('')
      setNotas('')
    } catch (error) {
      setMensaje({ tipo: 'error', texto: error.message })
    } finally {
      setGuardando(false)
    }
  }

  return {
    nombre,
    setNombre,
    gramos,
    setGramos,
    tiempoMinutos,
    setTiempoMinutos,
    notas,
    setNotas,
    costos,
    datosValidos,
    guardando,
    mensaje,
    guardar,
  }
}
