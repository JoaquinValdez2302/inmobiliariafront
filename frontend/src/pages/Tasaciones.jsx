import ContactForm from '../components/ContactForm'

export default function Tasaciones() {
  return (
    <>
      <section className="page-header">
        <div className="container">
          <h1>Tasaciones</h1>
          <p>Conocé el valor real de mercado de tu propiedad.</p>
        </div>
      </section>
      <section className="section">
        <div className="container two-cols">
          <div>
            <h2>¿Por qué tasar con nosotros?</h2>
            <ul className="check-list">
              <li>Martilleros y corredores matriculados.</li>
              <li>Conocimiento del mercado local desde hace décadas.</li>
              <li>Informe de tasación por escrito.</li>
              <li>Visita a la propiedad sin cargo.</li>
            </ul>
          </div>
          <div className="precio-box">
            <h3>Solicitá tu tasación</h3>
            <ContactForm
              campos={[{ name: 'direccion', placeholder: 'Dirección de la propiedad' }]}
              mensajeInicial="Quisiera solicitar una tasación de mi propiedad."
            />
          </div>
        </div>
      </section>
    </>
  )
}
