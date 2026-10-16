import { useState } from 'react'

// Formulario de contacto reutilizable. Por ahora solo simula el envío;
// cuando exista el backend, reemplazar el setTimeout por un fetch.
export default function ContactForm({ mensajeInicial = '', campos = [] }) {
  const [datos, setDatos] = useState({ nombre: '', email: '', telefono: '', mensaje: mensajeInicial })
  const [estado, setEstado] = useState('') // '' | 'enviando' | 'ok'

  const cambiar = (e) => setDatos({ ...datos, [e.target.name]: e.target.value })

  const enviar = (e) => {
    e.preventDefault()
    setEstado('enviando')
    setTimeout(() => setEstado('ok'), 800)
  }

  if (estado === 'ok') {
    return <p className="form-ok">¡Gracias {datos.nombre}! Recibimos tu consulta y te contactaremos a la brevedad.</p>
  }

  return (
    <form className="form" onSubmit={enviar}>
      <input name="nombre" placeholder="Nombre y apellido" value={datos.nombre} onChange={cambiar} required />
      <input name="email" type="email" placeholder="Email" value={datos.email} onChange={cambiar} required />
      <input name="telefono" type="tel" placeholder="Teléfono" value={datos.telefono} onChange={cambiar} />
      {campos.map((c) => (
        <input key={c.name} name={c.name} placeholder={c.placeholder} value={datos[c.name] ?? ''} onChange={cambiar} />
      ))}
      <textarea name="mensaje" rows="4" placeholder="Mensaje" value={datos.mensaje} onChange={cambiar} required />
      <button className="btn" disabled={estado === 'enviando'}>
        {estado === 'enviando' ? 'Enviando...' : 'Enviar consulta'}
      </button>
    </form>
  )
}
