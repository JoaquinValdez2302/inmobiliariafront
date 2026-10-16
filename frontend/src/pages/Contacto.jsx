import ContactForm from '../components/ContactForm'
import { EMPRESA } from '../data/propiedades'

export default function Contacto() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Contacto</h1>
          <p>Escribinos y te respondemos a la brevedad.</p>
        </div>
      </section>
      <section className="section">
        <div className="container two-cols">
          <div>
            <h2>Datos de contacto</h2>
            <ul className="contact-list">
              <li>📍 {EMPRESA.direccion}</li>
              <li>📞 {EMPRESA.telefonos.join(' / ')}</li>
              <li>✉️ {EMPRESA.email}</li>
              <li>🕘 {EMPRESA.horario}</li>
            </ul>
            <iframe
              className="mapa"
              title="Mapa"
              loading="lazy"
              src={`https://maps.google.com/maps?q=${encodeURIComponent(EMPRESA.direccion)}&output=embed`}
            />
          </div>
          <div className="precio-box">
            <h3>Envianos tu consulta</h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  )
}
