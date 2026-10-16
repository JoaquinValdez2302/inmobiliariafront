import { Link } from 'react-router-dom'
import SearchBar from '../components/SearchBar'
import PropertyCard from '../components/PropertyCard'
import { EMPRESA, PROPIEDADES, TIPOS } from '../data/propiedades'

const SERVICIOS = [
  { icono: '🔑', titulo: 'Venta', texto: 'Te acompañamos en todo el proceso de compra y venta de tu propiedad.' },
  { icono: '📄', titulo: 'Alquileres', texto: 'Administración de alquileres con garantía y seguimiento de contratos.' },
  { icono: '📊', titulo: 'Tasaciones', texto: 'Tasaciones profesionales con valores reales de mercado.' },
  { icono: '🏗', titulo: 'Desarrollos', texto: 'Comercializamos emprendimientos y proyectos inmobiliarios.' },
]

export default function Home() {
  const destacadas = PROPIEDADES.filter((p) => p.destacada)

  return (
    <>
      <section className="hero">
        <div className="container hero-content">
          <h1>Encontrá la propiedad que estás buscando</h1>
          <p>
            Desarrollos inmobiliarios, compra, venta, alquileres y tasaciones de casas, terrenos y departamentos en
            Resistencia, Chaco.
          </p>
          <SearchBar />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Buscá por tipo de propiedad</h2>
          <div className="tipos-grid">
            {TIPOS.map((t) => (
              <Link key={t.id} to={`/propiedades?tipo=${t.id}`} className="tipo-card">
                <span className="tipo-icono">{t.icono}</span>
                <strong>{t.nombre}</strong>
                <small>{PROPIEDADES.filter((p) => p.tipo === t.id).length} propiedades</small>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 className="section-title">Propiedades destacadas</h2>
          <div className="cards-grid">
            {destacadas.map((p) => (
              <PropertyCard key={p.id} propiedad={p} />
            ))}
          </div>
          <div className="center">
            <Link to="/propiedades" className="btn btn-outline">Ver todas las propiedades</Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="section-title">Nuestros servicios</h2>
          <div className="servicios-grid">
            {SERVICIOS.map((s) => (
              <div key={s.titulo} className="servicio">
                <span className="servicio-icono">{s.icono}</span>
                <h3>{s.titulo}</h3>
                <p>{s.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <div>
            <h2>Somos una empresa inmobiliaria desde {EMPRESA.desde}</h2>
            <p>Más de {new Date().getFullYear() - EMPRESA.desde} años brindando confianza y un servicio profesional.</p>
          </div>
          <Link to="/contacto" className="btn btn-light">Contactanos</Link>
        </div>
      </section>
    </>
  )
}
