export default function ConfirmDialog({ titulo, mensaje, onConfirmar, onCancelar }) {
  return (
    <div className="fixed inset-0 bg-ink/40 flex items-center justify-center p-4 z-50">
      <div className="bg-surface rounded-lg p-5 max-w-sm w-full space-y-4">
        <h2 className="font-semibold">{titulo}</h2>
        <p className="text-sm text-steel">{mensaje}</p>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancelar}
            className="px-3 py-1.5 text-sm rounded-md border border-line hover:bg-paper"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirmar}
            className="px-3 py-1.5 text-sm rounded-md bg-warn text-white hover:opacity-90"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  )
}
