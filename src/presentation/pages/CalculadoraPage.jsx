import { useCalculadora } from '../hooks/useCalculadora.js'
import { formatearTiempo, formatearMoneda } from '../shared/formatters.js'

const inputClases =
  'w-full rounded-md border border-line bg-paper px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-accent'

export default function CalculadoraPage() {
  const {
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
  } = useCalculadora()

  if (cargando) {
    return <p className="text-steel text-sm">Cargando registro…</p>
  }

  return (
    <section className="grid gap-6 md:grid-cols-2">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          guardar()
        }}
        className="bg-surface border border-line rounded-lg p-5 space-y-4"
      >
        <h1 className="text-lg font-semibold">{esEdicion ? 'Editar registro' : 'Calculadora'}</h1>

        <Campo label="Nombre del modelo *">
          <input
            className={inputClases}
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            placeholder="Ej: Maceta hexagonal"
          />
        </Campo>

        <Campo label="Peso (g)">
          <input
            type="number"
            step="0.1"
            min="0"
            className={inputClases}
            value={gramos}
            onChange={(e) => setGramos(e.target.value)}
          />
        </Campo>

        <Campo label={`Tiempo (min)${tiempoMinutos ? ' — ' + formatearTiempo(tiempoMinutos) : ''}`}>
          <input
            type="number"
            step="1"
            min="0"
            className={inputClases}
            value={tiempoMinutos}
            onChange={(e) => setTiempoMinutos(e.target.value)}
            placeholder="Luego se convierte a horas y minutos."
          />
        </Campo>

        <Campo label="Notas">
          <textarea
            className={inputClases}
            rows={3}
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            placeholder="Colocar URL del modelo en caso de tener, materiales adicionales, etc."
          />
        </Campo>

        {mensaje && (
          <p className={`text-sm ${mensaje.tipo === 'exito' ? 'text-accentDark' : 'text-warn'}`}>
            {mensaje.texto}
          </p>
        )}

        <button
          type="submit"
          disabled={!datosValidos || guardando}
          className="w-full bg-accent hover:bg-accentDark disabled:bg-line disabled:text-steel text-white font-medium rounded-md py-2 transition-colors"
        >
          {guardando ? 'Guardando…' : esEdicion ? 'Guardar cambios' : 'Guardar registro'}
        </button>
      </form>

      <div className="bg-surface border border-line rounded-lg p-5">
        <h2 className="text-sm font-semibold text-steel uppercase tracking-wide mb-4">
          Resultado
        </h2>
        {costos ? (
          <dl className="space-y-2 font-mono text-sm">
            <Fila label="Costo filamento" valor={costos.costoFilamento} />
            <Fila label="Costo eléctrico" valor={costos.costoElectricidad} />
            <Fila label="Costo de desgaste" valor={costos.costoDesgaste} />
            <hr className="border-line" />
            <Fila label="Subtotal" valor={costos.subtotal} />
            <Fila label={`Margen (${costos.margenPct}%)`} valor={costos.total - costos.subtotal} />
            <hr className="border-line" />
            <Fila label="Total" valor={costos.total} destacado />
          </dl>
        ) : (
          <p className="text-steel text-sm">
            Completá nombre, peso y tiempo para ver el cálculo.
          </p>
        )}
      </div>
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

function Fila({ label, valor, destacado }) {
  return (
    <div className={`flex justify-between ${destacado ? 'text-base font-semibold text-ink' : 'text-steel'}`}>
      <dt>{label}</dt>
      <dd>{formatearMoneda(valor)}</dd>
    </div>
  )
}
