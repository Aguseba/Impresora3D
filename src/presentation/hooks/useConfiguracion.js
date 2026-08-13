import { useEffect, useState } from 'react'
import { obtenerConfiguracion } from '../../application/ObtenerConfiguracion.js'
import { actualizarConfiguracion as actualizarConfiguracionUseCase } from '../../application/ActualizarConfiguracion.js'
import { configuracionRepository } from '../../infrastructure/repositorios.js'

const CAMPOS = ['precioKg', 'precioKwh', 'consumoW', 'precioRepuestos', 'vidaUtilHoras', 'margenPct']

export function useConfiguracion() {
  const [valores, setValores] = useState(null) // null mientras carga
  const [guardando, setGuardando] = useState(false)
  const [mensaje, setMensaje] = useState(null) // { tipo: 'exito' | 'error', texto }

  useEffect(() => {
    obtenerConfiguracion(configuracionRepository).then((config) => {
      const iniciales = {}
      CAMPOS.forEach((campo) => {
        iniciales[campo] = String(config[campo])
      })
      setValores(iniciales)
    })
  }, [])

  function setCampo(campo, valor) {
    setValores((prev) => ({ ...prev, [campo]: valor }))
  }

  async function guardar() {
    setGuardando(true)
    setMensaje(null)
    try {
      const numerico = {}
      CAMPOS.forEach((campo) => {
        numerico[campo] = Number(valores[campo])
      })
      await actualizarConfiguracionUseCase(numerico, configuracionRepository)
      setMensaje({ tipo: 'exito', texto: 'Configuración guardada.' })
    } catch (error) {
      setMensaje({ tipo: 'error', texto: error.message })
    } finally {
      setGuardando(false)
    }
  }

  return { valores, setCampo, guardar, guardando, mensaje }
}
