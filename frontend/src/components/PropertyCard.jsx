import { Link } from 'react-router-dom'
import { formatearPrecio, nombreOperacion, nombreTipo } from '../data/propiedades'

export default function PropertyCard({ propiedad: p }) {
  return (
    <Link to={`/propiedad/${p.id}`} className="card">
      <div className="card-img">
        <img src={p.imagenes[0]} alt={p.titulo} loading="lazy" />
        <span className={`badge badge-${p.operacion}`}>{nombreOperacion(p.operacion)}</span>
        <span className="card-code">Cód. {p.id}</span>
      </div>
      <div className="card-body">
        <div className="card-price">{formatearPrecio(p.precio, p.moneda)}</div>
        <h3 className="card-title">{p.titulo}</h3>
        <p className="card-location">📍 {p.barrio} · {nombreTipo(p.tipo)}</p>
        <div className="card-features">
          {p.dormitorios > 0 && <span>🛏 {p.dormitorios} dorm.</span>}
          {p.banos > 0 && <span>🛁 {p.banos} baño{p.banos > 1 ? 's' : ''}</span>}
          <span>📐 {p.superficie.toLocaleString('es-AR')} m²</span>
        </div>
      </div>
    </Link>
  )
}
