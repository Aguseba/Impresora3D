import { formatearTiempo, formatearMoneda } from '../shared/formatters.js'

export default function DetalleRegistroModal({ registro, onCerrar }) {
  return (
    <div className="fixed inset-0 bg-ink/40 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg p-5 max-w-md w-full space-y-3">
        <div className="flex justify-between items-start">
          <h2 className="font-semibold text-lg">{registro.nombre}</h2>
          <button onClick={onCerrar} className="text-steel hover:text-ink" aria-label="Cerrar">
            ✕
          </button>
        </div>

        <dl className="text-sm space-y-1 font-mono">
          <FilaDetalle label="Peso" valor={`${registro.gramos} g`} />
          <FilaDetalle label="Tiempo" valor={formatearTiempo(registro.tiempoMinutos)} />
          <hr className="border-line my-1" />
          <FilaDetalle label="Filamento" valor={formatearMoneda(registro.costoFilamento)} />
          <FilaDetalle label="Eléctrico" valor={formatearMoneda(registro.costoElectricidad)} />
          <FilaDetalle label="Desgaste" valor={formatearMoneda(registro.costoDesgaste)} />
          <FilaDetalle label="Subtotal" valor={formatearMoneda(registro.subtotal)} />
          <FilaDetalle label="Total" valor={formatearMoneda(registro.total)} destacado />
        </dl>

        {registro.notas && (
          <p className="text-sm text-steel border-t border-line pt-3">{registro.notas}</p>
        )}
      </div>
    </div>
  )
}

function FilaDetalle({ label, valor, destacado }) {
  return (
    <div className={`flex justify-between ${destacado ? 'font-semibold text-ink' : 'text-steel'}`}>
      <dt>{label}</dt>
      <dd>{valor}</dd>
    </div>
  )
}
