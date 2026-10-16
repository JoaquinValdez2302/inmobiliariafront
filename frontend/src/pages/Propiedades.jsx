import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import PropertyCard from '../components/PropertyCard'
import { PROPIEDADES, nombreOperacion, nombreTipo } from '../data/propiedades'

export default function Propiedades() {
  const [params] = useSearchParams()
  const [orden, setOrden] = useState('')
  const filtros = Object.fromEntries(params)

  const resultados = useMemo(() => {
    const q = (filtros.q ?? '').toLowerCase()
    const lista = PROPIEDADES.filter(
      (p) =>
        (!filtros.operacion || p.operacion === filtros.operacion) &&
        (!filtros.tipo || p.tipo === filtros.tipo) &&
        (!filtros.dormitorios || p.dormitorios >= Number(filtros.dormitorios)) &&
        (!q || `${p.id} ${p.titulo} ${p.barrio} ${p.descripcion}`.toLowerCase().includes(q)),
    )
    if (orden === 'menor') lista.sort((a, b) => a.precio - b.precio)
    if (orden === 'mayor') lista.sort((a, b) => b.precio - a.precio)
    if (orden === 'superficie') lista.sort((a, b) => b.superficie - a.superficie)
    return lista
  }, [params, orden]) // eslint-disable-line react-hooks/exhaustive-deps

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

          {resultados.length ? (
            <div className="cards-grid">
              {resultados.map((p) => (
                <PropertyCard key={p.id} propiedad={p} />
              ))}
            </div>
          ) : (
            <p className="empty">No encontramos propiedades con esos filtros. Probá con otra búsqueda.</p>
          )}
        </div>
      </section>
    </>
  )
}
