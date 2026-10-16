import { EMPRESA } from '../data/propiedades'

export default function Nosotros() {
  const anios = new Date().getFullYear() - EMPRESA.desde

  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Nosotros</h1>
          <p>Somos una empresa inmobiliaria desde {EMPRESA.desde}.</p>
        </div>
      </section>
      <section className="section">
        <div className="container two-cols">
          <div>
            <h2>Nuestra historia</h2>
            <p>
              Desde {EMPRESA.desde} acompañamos a familias, inversores y empresas en la compra, venta y alquiler de
              propiedades. Nuestro compromiso es brindar un servicio profesional, transparente y de confianza.
            </p>
            <p>
              Contamos con un equipo de profesionales matriculados que conocen el mercado local y te asesoran en cada
              paso de la operación.
            </p>
          </div>
          <div className="stats">
            <div><strong>{anios}+</strong><span>años de trayectoria</span></div>
            <div><strong>1500+</strong><span>operaciones realizadas</span></div>
            <div><strong>300+</strong><span>propiedades administradas</span></div>
          </div>
        </div>
      </section>
    </>
  )
}
