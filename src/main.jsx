import React from 'react'
import ReactDOM from 'react-dom/client'
import { HashRouter } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

// HashRouter (no BrowserRouter): GitHub Pages sirve archivos estáticos
// y no sabe resolver rutas como /modelos al recargar la página.
// Con hash (#/modelos) el ruteo lo resuelve el navegador, sin backend.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
