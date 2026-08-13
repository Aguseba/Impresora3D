import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useRegistros } from '../hooks/useRegistros.js'
import { formatearTiempo, formatearMoneda } from '../shared/formatters.js'
import ConfirmDialog from '../components/ConfirmDialog.jsx'
import DetalleRegistroModal from '../components/DetalleRegistroModal.jsx'

export default function ModelosYGastosPage() {
  const { registros, cargando, eliminar } = useRegistros()
  const [registroAVer, setRegistroAVer] = useState(null)
  const [registroAEliminar, setRegistroAEliminar] = useState(null)

  return (
    <section>
      <h1 className="text-xl font-semibold mb-4">Modelos y gastos</h1>

      {cargando ? (
        <p className="text-steel text-sm">Cargando…</p>
      ) : registros.length === 0 ? (
        <p className="text-steel text-sm">Todavía no guardaste ningún registro.</p>
      ) : (
        <div className="bg-surface border border-line rounded-lg overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-paper text-steel text-left">
              <tr>
                <th className="px-4 py-2 font-medium">Modelo</th>
                <th className="px-4 py-2 font-medium">Gramos</th>
                <th className="px-4 py-2 font-medium">Tiempo</th>
                <th className="px-4 py-2 font-medium">Total</th>
                <th className="px-4 py-2 font-medium">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {registros.map((r) => (
                <tr key={r.id} className="border-t border-line">
                  <td className="px-4 py-2">{r.nombre}</td>
                  <td className="px-4 py-2 font-mono">{r.gramos} g</td>
                  <td className="px-4 py-2 font-mono">{formatearTiempo(r.tiempoMinutos)}</td>
                  <td className="px-4 py-2 font-mono">{formatearMoneda(r.total)}</td>
                  <td className="px-4 py-2">
                    <div className="flex gap-3">
                      <button
                        onClick={() => setRegistroAVer(r)}
                        className="text-accent hover:underline"
                      >
                        Ver
                      </button>
                      <Link to={`/calculadora/${r.id}`} className="text-accent hover:underline">
                        Editar
                      </Link>
                      <button
                        onClick={() => setRegistroAEliminar(r)}
                        className="text-warn hover:underline"
                      >
                        Eliminar
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {registroAVer && (
        <DetalleRegistroModal registro={registroAVer} onCerrar={() => setRegistroAVer(null)} />
      )}

      {registroAEliminar && (
        <ConfirmDialog
          titulo="Eliminar registro"
          mensaje={`¿Seguro que querés eliminar "${registroAEliminar.nombre}"? Esta acción no se puede deshacer.`}
          onCancelar={() => setRegistroAEliminar(null)}
          onConfirmar={async () => {
            await eliminar(registroAEliminar.id)
            setRegistroAEliminar(null)
          }}
        />
      )}
    </section>
  )
}
