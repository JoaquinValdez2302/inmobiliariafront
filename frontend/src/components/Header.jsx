import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { EMPRESA } from '../data/propiedades'

const LINKS = [
  { to: '/', label: 'Inicio', end: true },
  { to: '/propiedades?operacion=venta', label: 'Venta' },
  { to: '/propiedades?operacion=alquiler', label: 'Alquiler' },
  { to: '/propiedades?operacion=temporario', label: 'Temporario' },
  { to: '/tasaciones', label: 'Tasaciones' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/contacto', label: 'Contacto' },
]

export default function Header() {
  const [abierto, setAbierto] = useState(false)

  return (
    <header className="header">
      <div className="topbar">
        <div className="container topbar-inner">
          <span>📞 {EMPRESA.telefonos.join(' / ')}</span>
          <span>✉️ {EMPRESA.email}</span>
          <span className="hide-mobile">📍 {EMPRESA.direccion}</span>
          <span className="hide-mobile">🕘 {EMPRESA.horario}</span>
        </div>
      </div>

      <nav className="navbar">
        <div className="container navbar-inner">
          <Link to="/" className="logo" onClick={() => setAbierto(false)}>
            <span className="logo-mark">N</span>
            <span>
              {EMPRESA.nombre}
              <small>Desde {EMPRESA.desde}</small>
            </span>
          </Link>

          <button className="menu-btn" onClick={() => setAbierto(!abierto)} aria-label="Abrir menú">
            ☰
          </button>

          <ul className={`nav-links ${abierto ? 'open' : ''}`}>
            {LINKS.map((l) => (
              <li key={l.to}>
                <NavLink to={l.to} end={l.end} onClick={() => setAbierto(false)}>
                  {l.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  )
}
