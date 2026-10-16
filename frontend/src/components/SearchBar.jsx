import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { OPERACIONES, TIPOS } from '../data/propiedades'

export default function SearchBar({ inicial = {} }) {
  const navigate = useNavigate()
  const [filtros, setFiltros] = useState({
    operacion: inicial.operacion ?? '',
    tipo: inicial.tipo ?? '',
    dormitorios: inicial.dormitorios ?? '',
    q: inicial.q ?? '',
  })

  const cambiar = (e) => setFiltros({ ...filtros, [e.target.name]: e.target.value })

  const buscar = (e) => {
    e.preventDefault()
    const params = new URLSearchParams(Object.entries(filtros).filter(([, v]) => v !== ''))
    navigate(`/propiedades?${params}`)
  }

  return (
    <form className="search" onSubmit={buscar}>
      <select name="operacion" value={filtros.operacion} onChange={cambiar}>
        <option value="">Operación</option>
        {OPERACIONES.map((o) => (
          <option key={o.id} value={o.id}>{o.nombre}</option>
        ))}
      </select>
      <select name="tipo" value={filtros.tipo} onChange={cambiar}>
        <option value="">Tipo de propiedad</option>
        {TIPOS.map((t) => (
          <option key={t.id} value={t.id}>{t.nombre}</option>
        ))}
      </select>
      <select name="dormitorios" value={filtros.dormitorios} onChange={cambiar}>
        <option value="">Dormitorios</option>
        <option value="1">1+</option>
        <option value="2">2+</option>
        <option value="3">3+</option>
        <option value="4">4+</option>
      </select>
      <input name="q" value={filtros.q} onChange={cambiar} placeholder="Barrio, código o palabra clave" />
      <button type="submit" className="btn">Buscar</button>
    </form>
  )
}
