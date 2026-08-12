import { NavLink, Route, Routes, Navigate } from 'react-router-dom'
import CalculadoraPage from './presentation/pages/CalculadoraPage.jsx'
import ModelosYGastosPage from './presentation/pages/ModelosYGastosPage.jsx'
import ConfiguracionPage from './presentation/pages/ConfiguracionPage.jsx'
import ImportarExportarPage from './presentation/pages/ImportarExportarPage.jsx'

const SECCIONES = [
  { to: '/calculadora', label: 'Calculadora' },
  { to: '/modelos', label: 'Modelos y gastos' },
  { to: '/configuracion', label: 'Configuración' },
  { to: '/importar-exportar', label: 'Importar / Exportar' },
]

function linkClases({ isActive }) {
  return [
    'px-3 py-2 text-sm font-medium rounded-md transition-colors',
    isActive ? 'bg-accent text-white' : 'text-steel hover:bg-line/60',
  ].join(' ')
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-line bg-surface">
        <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
          <span className="font-mono text-sm font-semibold text-steel tracking-wide">
            CALCULADORA_3D
          </span>
          <nav className="flex gap-1">
            {SECCIONES.map((s) => (
              <NavLink key={s.to} to={s.to} className={linkClases}>
                {s.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <main className="flex-1 max-w-4xl w-full mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Navigate to="/calculadora" replace />} />
          <Route path="/calculadora" element={<CalculadoraPage />} />
          <Route path="/modelos" element={<ModelosYGastosPage />} />
          <Route path="/configuracion" element={<ConfiguracionPage />} />
          <Route path="/importar-exportar" element={<ImportarExportarPage />} />
        </Routes>
      </main>
    </div>
  )
}
