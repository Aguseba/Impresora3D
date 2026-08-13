import { useConfiguracion } from '../hooks/useConfiguracion.js'

const inputClases =
  'w-full rounded-md border border-line bg-paper px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent'

export default function ConfiguracionPage() {
  const { valores, setCampo, guardar, guardando, mensaje } = useConfiguracion()

  if (!valores) {
    return <p className="text-steel text-sm">Cargando…</p>
  }

  return (
    <section className="max-w-lg">
      <h1 className="text-xl font-semibold mb-1">Configuración</h1>
      <p className="text-steel text-sm mb-5">
        Estos parámetros los usa la Calculadora para cada cálculo nuevo. Los
        registros ya guardados no se recalculan solos: conservan el costo
        que tenían al momento de crearlos.
      </p>

      <form
        onSubmit={(e) => {
          e.preventDefault()
          guardar()
        }}
        className="bg-surface border border-line rounded-lg p-5 space-y-6"
      >
        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-steel uppercase tracking-wide">
            Materiales
          </legend>
          <Campo label="Tipo">
            <input className={inputClases} value="PLA" disabled />
          </Campo>
          <Campo label="Precio por Kg (ARS)">
            <input
              type="number"
              min="0"
              className={inputClases}
              value={valores.precioKg}
              onChange={(e) => setCampo('precioKg', e.target.value)}
            />
          </Campo>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-steel uppercase tracking-wide">
            Costos operativos
          </legend>
          <Campo label="Precio kWh (ARS)">
            <input
              type="number"
              min="0"
              className={inputClases}
              value={valores.precioKwh}
              onChange={(e) => setCampo('precioKwh', e.target.value)}
            />
          </Campo>
          <Campo label="Consumo impresora (W)">
            <input
              type="number"
              min="0"
              className={inputClases}
              value={valores.consumoW}
              onChange={(e) => setCampo('consumoW', e.target.value)}
            />
          </Campo>
          <Campo label="Precio repuestos (ARS)">
            <input
              type="number"
              min="0"
              className={inputClases}
              value={valores.precioRepuestos}
              onChange={(e) => setCampo('precioRepuestos', e.target.value)}
            />
          </Campo>
          <Campo label="Vida útil (horas)">
            <input
              type="number"
              min="0"
              className={inputClases}
              value={valores.vidaUtilHoras}
              onChange={(e) => setCampo('vidaUtilHoras', e.target.value)}
            />
          </Campo>
        </fieldset>

        <fieldset className="space-y-3">
          <legend className="text-sm font-semibold text-steel uppercase tracking-wide">
            Margen de ganancia
          </legend>
          <Campo label="Margen (%)">
            <input
              type="number"
              min="0"
              className={inputClases}
              value={valores.margenPct}
              onChange={(e) => setCampo('margenPct', e.target.value)}
            />
          </Campo>
        </fieldset>

        {mensaje && (
          <p className={`text-sm ${mensaje.tipo === 'exito' ? 'text-accentDark' : 'text-warn'}`}>
            {mensaje.texto}
          </p>
        )}

        <button
          type="submit"
          disabled={guardando}
          className="w-full bg-accent hover:bg-accentDark disabled:bg-line disabled:text-steel text-white font-medium rounded-md py-2 transition-colors"
        >
          {guardando ? 'Guardando…' : 'Guardar configuración'}
        </button>
      </form>
    </section>
  )
}

function Campo({ label, children }) {
  return (
    <label className="block">
      <span className="text-sm text-steel">{label}</span>
      <div className="mt-1">{children}</div>
    </label>
  )
}
