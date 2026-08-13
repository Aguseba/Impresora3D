import { useEffect, useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { calcularCosto } from '../../domain/usecases/calcularCosto.js'
import { crearRegistro } from '../../application/CrearRegistro.js'
import { actualizarRegistro } from '../../application/ActualizarRegistro.js'
import { obtenerRegistro } from '../../application/ObtenerRegistro.js'
import { obtenerConfiguracion } from '../../application/ObtenerConfiguracion.js'
import { registroRepository, configuracionRepository } from '../../infrastructure/repositorios.js'

/**
 * Sirve tanto para crear (ruta /calculadora) como para editar
 * (ruta /calculadora/:id) — Modelos y gastos reutiliza esta misma
 * página para "Editar", como está definido en el plan.
 */
export function useCalculadora() {
  const { id } = useParams()
  const navigate = useNavigate()
  const esEdicion = Boolean(id)

  const [nombre, setNombre] = useState('')
  const [gramos, setGramos] = useState('')
  const [tiempoMinutos, setTiempoMinutos] = useState('')
  const [notas, setNotas] = useState('')
  const [configuracion, setConfiguracion] = useState(null)
  const [cargando, setCargando] = useState(esEdicion)
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState(null) // { tipo: 'exito' | 'error', texto }

  useEffect(() => {
    obtenerConfiguracion(configuracionRepository).then(setConfiguracion)
  }, [])

  useEffect(() => {
    if (!esEdicion) return
    obtenerRegistro(id, registroRepository).then((registro) => {
      if (registro) {
        setNombre(registro.nombre)
        setGramos(String(registro.gramos))
        setTiempoMinutos(String(registro.tiempoMinutos))
        setNotas(registro.notas)
      }
      setCargando(false)
    })
  }, [id, esEdicion])

  const gramosNumero = Number(gramos)
  const tiempoNumero = Number(tiempoMinutos)
  const datosValidos =
    nombre.trim() !== '' && gramosNumero > 0 && tiempoNumero > 0 && configuracion !== null

  const costos = useMemo(() => {
    if (!datosValidos) return null
    return calcularCosto({ gramos: gramosNumero, tiempoMinutos: tiempoNumero }, configuracion)
  }, [datosValidos, gramosNumero, tiempoNumero, configuracion])

  async function guardar() {
    if (!datosValidos) return
    setGuardando(true)
    setMensaje(null)
    const datos = { nombre, gramos: gramosNumero, tiempoMinutos: tiempoNumero, notas }

    try {
      if (esEdicion) {
        await actualizarRegistro(id, datos, configuracion, registroRepository)
        navigate('/modelos')
      } else {
        await crearRegistro(datos, configuracion, registroRepository)
        setMensaje({ tipo: 'exito', texto: 'Registro guardado.' })
        setNombre('')
        setGramos('')
        setTiempoMinutos('')
        setNotas('')
      }
    } catch (error) {
      setMensaje({ tipo: 'error', texto: error.message })
    } finally {
      setGuardando(false)
    }
  }

  return {
    esEdicion,
    cargando,
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
