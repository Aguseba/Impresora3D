/** 185 → "3h 5m". Si es menos de una hora, solo muestra minutos. */
export function formatearTiempo(minutos) {
  const total = Math.max(0, Math.round(Number(minutos) || 0))
  const horas = Math.floor(total / 60)
  const mins = total % 60
  return horas === 0 ? `${mins}m` : `${horas}h ${mins}m`
}

/** 5421.75 → "$ 5.421,75" */
export function formatearMoneda(valor) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(Number(valor) || 0)
}
