import { useState } from 'react'
import { exportarRegistrosCSV } from '../../application/ExportarRegistrosCSV.js'
import { importarRegistrosCSV } from '../../application/ImportarRegistrosCSV.js'
import { obtenerConfiguracion } from '../../application/ObtenerConfiguracion.js'
import { registroRepository, configuracionRepository } from '../../infrastructure/repositorios.js'
import { descargarArchivo } from '../shared/descargarArchivo.js'

const PLANTILLA_CSV = 'nombre,gramos,tiempo_minutos,notas\n'

export function useImportarExportar() {
  const [importando, setImportando] = useState(false)
  const [resultado, setResultado] = useState(null) // { importados, errores } | null

  function descargarPlantilla() {
    descargarArchivo('calculadora-3d-plantilla.csv', PLANTILLA_CSV)
  }

  async function exportar() {
    const csv = await exportarRegistrosCSV(registroRepository)
    descargarArchivo('calculadora-3d-export.csv', csv)
  }

  async function importar(archivo) {
    setImportando(true)
    setResultado(null)
    try {
      const texto = await archivo.text()
      const configuracion = await obtenerConfiguracion(configuracionRepository)
      const resultadoImport = await importarRegistrosCSV(texto, configuracion, registroRepository)
      setResultado(resultadoImport)
    } finally {
      setImportando(false)
    }
  }

  return { importando, resultado, descargarPlantilla, exportar, importar }
}
