import { Link } from 'react-router-dom'
import { EMPRESA } from '../data/propiedades'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h3>{EMPRESA.nombre}</h3>
          <p>
            Empresa inmobiliaria desde {EMPRESA.desde}. Compra, venta, alquileres y tasaciones de casas, terrenos y
            departamentos.
          </p>
        </div>
        <div>
          <h4>Propiedades</h4>
          <ul>
            <li><Link to="/propiedades?operacion=venta">En venta</Link></li>
            <li><Link to="/propiedades?operacion=alquiler">En alquiler</Link></li>
            <li><Link to="/propiedades?operacion=temporario">Alquiler temporario</Link></li>
            <li><Link to="/tasaciones">Tasaciones</Link></li>
          </ul>
        </div>
        <div>
          <h4>Contacto</h4>
          <ul>
            <li>📍 {EMPRESA.direccion}</li>
            <li>📞 {EMPRESA.telefonos.join(' / ')}</li>
            <li>✉️ {EMPRESA.email}</li>
            <li>🕘 {EMPRESA.horario}</li>
          </ul>
        </div>
        <div>
          <h4>Seguinos</h4>
          <div className="socials">
            <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">© {new Date().getFullYear()} {EMPRESA.nombre}. Todos los derechos reservados.</div>

      <a
        className="whatsapp-float"
        href={`https://wa.me/${EMPRESA.whatsapp}`}
        target="_blank"
        rel="noreferrer"
        aria-label="WhatsApp"
      >
        💬
      </a>
    </footer>
  )
}
