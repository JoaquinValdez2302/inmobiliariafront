import { useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import PropertyCard from '../components/PropertyCard'
import { inmueblesService } from '../services/api'
import { nombreOperacion, nombreTipo } from '../data/propiedades'

export default function Propiedades() {
  const [params] = useSearchParams()
  const [orden, setOrden] = useState('')
  const [propiedadesAPI, setPropiedadesAPI] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState(null)

  const filtros = Object.fromEntries(params)

  // 1. Efecto para obtener las propiedades desde el backend en Render
  useEffect(() => {
    async function cargarPropiedades() {
      try {
        setCargando(true)
        setError(null)

        // Convertimos los filtros de la URL a los query params que espera Go
        const queryParams = {}
        if (filtros.q) queryParams.q = filtros.q
        if (filtros.operacion) queryParams.tipoOperacion = filtros.operacion
        if (filtros.tipo) queryParams.tipoInmueble = filtros.tipo
        if (filtros.dormitorios) queryParams.cantHabitacionesMin = filtros.dormitorios

        // Llamada al backend
        const data = await inmueblesService.listar(queryParams)
        setPropiedadesAPI(data || [])
      } catch (err) {
        console.error('Error cargando propiedades desde la API:', err)
        setError(err.message || 'Error al conectar con el servidor')
      } finally {
        setCargando(false)
      }
    }

    cargarPropiedades()
  }, [params.toString()]) // Se vuelve a ejecutar cada vez que cambian los filtros de la URL

  // 2. Ordenamiento en el cliente sobre los resultados recibidos de la API
  const resultados = useMemo(() => {
    // Si tu PropertyCard espera campos específicos, puedes mapearlos o normalizarlos aquí si es necesario
    const lista = [...propiedadesAPI]

    if (orden === 'menor') {
      lista.sort((a, b) => (a.precio || 0) - (b.precio || 0))
    } else if (orden === 'mayor') {
      lista.sort((a, b) => (b.precio || 0) - (a.precio || 0))
    } else if (orden === 'superficie') {
      lista.sort((a, b) => (b.superficieTotal || b.superficie || 0) - (a.superficieTotal || a.superficie || 0))
    }

    return lista
  }, [propiedadesAPI, orden])

  const titulo = [
    filtros.tipo ? nombreTipo(filtros.tipo) : 'Propiedades',
    filtros.operacion ? `en ${nombreOperacion(filtros.operacion).toLowerCase()}` : '',
  ].join(' ')

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>{titulo}</h1>
          {/* key fuerza a reiniciar el formulario cuando cambian los filtros de la URL */}
          <SearchBar key={params.toString()} inicial={filtros} />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="results-bar">
            <span>{resultados.length} resultado{resultados.length !== 1 && 's'}</span>
            <select value={orden} onChange={(e) => setOrden(e.target.value)}>
              <option value="">Ordenar por</option>
              <option value="menor">Menor precio</option>
              <option value="mayor">Mayor precio</option>
              <option value="superficie">Mayor superficie</option>
            </select>
          </div>

          {cargando && (
            <p className="empty">Cargando propiedades desde el servidor...</p>
          )}

          {error && (
            <div style={{ color: '#dc2626', textAlign: 'center', padding: '2rem' }}>
              <p><strong>Error de conexión con la API:</strong> {error}</p>
              <small>Verifica la variable VITE_API_URL y la configuración de CORS en el servidor.</small>
            </div>
          )}

          {!cargando && !error && (
            resultados.length ? (
              <div className="cards-grid">
                {resultados.map((p) => (
                  <PropertyCard key={p.id} propiedad={p} />
                ))}
              </div>
            ) : (
              <p className="empty">No encontramos propiedades con esos filtros. Probá con otra búsqueda.</p>
            )
          )}
        </div>
      </section>
    </>
  )
}