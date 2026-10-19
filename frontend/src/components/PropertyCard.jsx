import { Link } from 'react-router-dom'
import { formatearPrecio } from '../data/propiedades'

export default function PropertyCard({ propiedad }) {
  // Aseguramos compatibilidad por si alguna imagen viene como array o URL directa
  const imagenPrincipal = 
    propiedad.imagenes?.[0]?.urlArchivo || 
    propiedad.imagenes?.[0] || 
    'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=70'; // Imagen por defecto si no hay

  return (
    <div className="property-card">
      <div className="card-image-container">
        <img src={imagenPrincipal} alt={propiedad.titulo || 'Inmueble'} className="card-image" />
        <span className="badge-operacion">{propiedad.tipoOperacion}</span>
      </div>

      <div className="card-content">
        <h3>{propiedad.titulo}</h3>
        <p className="card-price">
          {formatearPrecio(propiedad.precio, propiedad.moneda)}
        </p>
        <p className="card-location">📍 {propiedad.barrio || 'Ubicación no especificada'}</p>

        <div className="card-features">
          {propiedad.cantHabitaciones !== undefined && (
            <span>🛏️ {propiedad.cantHabitaciones} dorm.</span>
          )}
          {propiedad.cantBanos !== undefined && (
            <span>🚿 {propiedad.cantBanos} baños</span>
          )}
          {propiedad.superficieTotal !== undefined && (
            <span>📐 {propiedad.superficieTotal} m²</span>
          )}
        </div>

        <Link to={`/propiedades/${propiedad.id}`} className="btn-detalle">
          Ver detalles
        </Link>
      </div>
    </div>
  )
}
