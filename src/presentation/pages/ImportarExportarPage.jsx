import { useRef } from 'react'
import { useImportarExportar } from '../hooks/useImportarExportar.js'

export default function ImportarExportarPage() {
  const { importando, resultado, descargarPlantilla, exportar, importar } = useImportarExportar()
  const inputRef = useRef(null)

  function manejarArchivoSeleccionado(e) {
    const archivo = e.target.files?.[0]
    if (archivo) importar(archivo)
    e.target.value = '' // permite reintentar con el mismo archivo si hace falta
  }

  return (
    <section className="max-w-lg space-y-6">
      <div>
        <h1 className="text-xl font-semibold mb-1">Importar / Exportar</h1>
        <p className="text-steel text-sm">
          Todo funciona con archivos CSV locales — nada se sube a ningún
          servidor.
        </p>
      </div>

      <Tarjeta
        titulo="Exportar registros"
        descripcion="Descarga todos tus registros guardados como CSV, con el desglose completo de costos."
      >
        <button
          onClick={exportar}
          className="px-4 py-2 text-sm rounded-md border border-line hover:bg-paper"
        >
          Exportar CSV
        </button>
      </Tarjeta>

      <Tarjeta
        titulo="Importar desde Excel"
        descripcion="Renombrá en tu Excel las columnas a nombre, gramos, tiempo_minutos y notas (opcional), exportalo como CSV y subilo acá. Los costos siempre se recalculan con la configuración actual — cualquier columna de precio del Excel se ignora."
      >
        <div className="flex flex-wrap gap-3">
          <button
            onClick={descargarPlantilla}
            className="px-4 py-2 text-sm rounded-md border border-line hover:bg-paper"
          >
            Descargar plantilla
          </button>
          <button
            onClick={() => inputRef.current?.click()}
            disabled={importando}
            className="px-4 py-2 text-sm rounded-md bg-accent hover:bg-accentDark disabled:bg-line disabled:text-steel text-white font-medium transition-colors"
          >
            {importando ? 'Importando…' : 'Elegir archivo CSV'}
          </button>
          <input
            ref={inputRef}
            type="file"
            accept=".csv,text/csv"
            className="hidden"
            onChange={manejarArchivoSeleccionado}
          />
        </div>

        {resultado && (
          <div className="mt-4 text-sm">
            <p className="text-accentDark">
              {resultado.importados} registro(s) importado(s) correctamente.
            </p>
            {resultado.errores.length > 0 && (
              <div className="mt-2 text-warn">
                <p>{resultado.errores.length} fila(s) con error:</p>
                <ul className="list-disc list-inside">
                  {resultado.errores.map((e) => (
                    <li key={e.fila}>
                      Fila {e.fila}: {e.motivo}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </Tarjeta>
    </section>
  )
}

function Tarjeta({ titulo, descripcion, children }) {
  return (
    <div className="bg-surface border border-line rounded-lg p-5">
      <h2 className="font-semibold">{titulo}</h2>
      <p className="text-steel text-sm mt-1 mb-3">{descripcion}</p>
      {children}
    </div>
  )
}
