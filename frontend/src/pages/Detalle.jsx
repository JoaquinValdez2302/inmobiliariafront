import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import ContactForm from '../components/ContactForm'
import { inmueblesService } from '../services/api'
import { EMPRESA, formatearPrecio, nombreOperacion, nombreTipo } from '../data/propiedades'

export default function Detalle() {
  const { id } = useParams()
  const navigate = useNavigate()

  const [propiedad, setPropiedad] = useState(null)
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)
  const [foto, setFoto] = useState(0)

  useEffect(() => {
    async function cargarDetalle() {
      try {
        setCargando(true)
        setError(null)
        // Petición al backend en Go: GET /api/v1/inmuebles/{id}
        const data = await inmueblesService.obtenerPorId(id)
        setPropiedad(data)
        setFoto(0) // Reinicia el índice de imagen seleccionada
      } catch (err) {
        console.error('Error al cargar la propiedad:', err)
        setError(err.message || 'No se pudo cargar la propiedad.')
      } finally {
        setCargando(false)
      }
    }

    if (id) {
      cargarDetalle()
    }
  }, [id])

  if (cargando) {
    return (
      <div className="container section">
        <p>Cargando detalles de la propiedad...</p>
      </div>
    )
  }

  if (error || !propiedad) {
    return (
      <div className="container section">
        <h2>{error ? 'Ocurrió un error' : 'Propiedad no encontrada'}</h2>
        {error && <p>{error}</p>}
        <Link to="/propiedades" className="btn">Volver al listado</Link>
      </div>
    )
  }

  // Normalización de imágenes
  const imagenesRaw = propiedad.imagenes || []
  const imagenes = imagenesRaw.map((img) => img.urlArchivo || img).filter(Boolean)
  const imagenFallback = 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=900&q=70'
  const listaImagenes = imagenes.length > 0 ? imagenes : [imagenFallback]

  // Atributos mapeados desde el backend
  const operacion = propiedad.tipoOperacion || ''
  const tipo = propiedad.tipoInmueble || ''
  const superficie = propiedad.superficieTotal || propiedad.superficieCubierta || 0
  const dormitorios = propiedad.cantHabitaciones || propiedad.cantAmbientes || 0
  const banos = propiedad.cantBanos || 0
  const ubicacion = [propiedad.barrio, propiedad.ciudad].filter(Boolean).join(' · ') || 'Ubicación no especificada'

  const mensajeWsp = encodeURIComponent(`Hola, me interesa la propiedad: ${propiedad.titulo} (ID: ${propiedad.id})`)

  return (
    <div className="container section detalle">
      <button className="volver" onClick={() => navigate(-1)}>← Volver</button>

      <div className="detalle-grid">
        <div>
          <div className="galeria-principal">
            <img src={listaImagenes[foto] || imagenFallback} alt={propiedad.titulo} />
            <span className={`badge badge-${operacion.toLowerCase()}`}>
              {nombreOperacion(operacion)}
            </span>
          </div>
          {listaImagenes.length > 1 && (
            <div className="galeria-thumbs">
              {listaImagenes.map((src, i) => (
                <button key={src + i} className={i === foto ? 'active' : ''} onClick={() => setFoto(i)}>
                  <img src={src} alt={`Foto ${i + 1}`} />
                </button>
              ))}
            </div>
          )}

          <h1 className="detalle-titulo">{propiedad.titulo}</h1>
          <p className="card-location">📍 {ubicacion} · {nombreTipo(tipo)}</p>

          <div className="detalle-features">
            {superficie > 0 && (
              <div>
                <strong>{superficie.toLocaleString('es-AR')}</strong>
                <span>m² totales</span>
              </div>
            )}
            {dormitorios > 0 && (
              <div>
                <strong>{dormitorios}</strong>
                <span>Dormitorios</span>
              </div>
            )}
            {banos > 0 && (
              <div>
                <strong>{banos}</strong>
                <span>Baños</span>
              </div>
            )}
          </div>

          {propiedad.descripcion && (
            <>
              <h2>Descripción</h2>
              <p style={{ whiteSpace: 'pre-line' }}>{propiedad.descripcion}</p>
            </>
          )}
        </div>

        <aside className="detalle-aside">
          <div className="precio-box">
            <small>{nombreOperacion(operacion)}</small>
            <div className="detalle-precio">
              {formatearPrecio(propiedad.precio, propiedad.moneda)}
            </div>
            <a
              className="btn btn-wsp"
              href={`https://wa.me/${EMPRESA.whatsapp}?text=${mensajeWsp}`}
              target="_blank"
              rel="noreferrer"
            >
              Consultar por WhatsApp
            </a>
          </div>

          <div className="precio-box">
            <h3>Consultar por esta propiedad</h3>
            <ContactForm 
              inmuebleId={propiedad.id}
              mensajeInicial={`Hola, me interesa la propiedad: ${propiedad.titulo}`} 
            />
          </div>
        </aside>
      </div>
    </div>
  )
}