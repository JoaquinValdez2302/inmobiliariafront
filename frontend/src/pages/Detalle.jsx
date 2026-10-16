import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import { EMPRESA, PROPIEDADES, formatearPrecio, nombreOperacion, nombreTipo } from '../data/propiedades'

export default function Detalle() {
  const { id } = useParams()
  const p = PROPIEDADES.find((x) => x.id === Number(id))
  const [foto, setFoto] = useState(0)
  const navigate = useNavigate()

  if (!p) {
    return (
      <div className="container section">
        <h2>Propiedad no encontrada</h2>
        <Link to="/propiedades" className="btn">Volver al listado</Link>
      </div>
    )
  }

  const mensajeWsp = encodeURIComponent(`Hola, me interesa la propiedad Cód. ${p.id}: ${p.titulo}`)

  return (
    <div className="container section detalle">
      <button className="volver" onClick={() => navigate(-1)}>← Volver</button>

      <div className="detalle-grid">
        <div>
          <div className="galeria-principal">
            <img src={p.imagenes[foto]} alt={p.titulo} />
            <span className={`badge badge-${p.operacion}`}>{nombreOperacion(p.operacion)}</span>
          </div>
          {p.imagenes.length > 1 && (
            <div className="galeria-thumbs">
              {p.imagenes.map((src, i) => (
                <button key={src} className={i === foto ? 'active' : ''} onClick={() => setFoto(i)}>
                  <img src={src} alt={`Foto ${i + 1}`} />
                </button>
              ))}
            </div>
          )}

          <h1 className="detalle-titulo">{p.titulo}</h1>
          <p className="card-location">📍 {p.barrio} · {nombreTipo(p.tipo)} · Cód. {p.id}</p>

          <div className="detalle-features">
            <div><strong>{p.superficie.toLocaleString('es-AR')}</strong><span>m² totales</span></div>
            {p.dormitorios > 0 && <div><strong>{p.dormitorios}</strong><span>Dormitorios</span></div>}
            {p.banos > 0 && <div><strong>{p.banos}</strong><span>Baños</span></div>}
          </div>

          <h2>Descripción</h2>
          <p>{p.descripcion}</p>
        </div>

        <aside className="detalle-aside">
          <div className="precio-box">
            <small>{nombreOperacion(p.operacion)}</small>
            <div className="detalle-precio">{formatearPrecio(p.precio, p.moneda)}</div>
            <a className="btn btn-wsp" href={`https://wa.me/${EMPRESA.whatsapp}?text=${mensajeWsp}`} target="_blank" rel="noreferrer">
              Consultar por WhatsApp
            </a>
          </div>
          <div className="precio-box">
            <h3>Consultar por esta propiedad</h3>
            <ContactForm mensajeInicial={`Hola, me interesa la propiedad Cód. ${p.id}.`} />
          </div>
        </aside>
      </div>
    </div>
  )
}
