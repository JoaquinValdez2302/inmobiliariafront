// Datos de ejemplo. Más adelante se pueden reemplazar por un fetch al backend.

export const EMPRESA = {
  nombre: 'Inmobiliaria Norte',
  telefonos: ['362 400-0000', '362 400-0001'],
  whatsapp: '5493624000000',
  email: 'contacto@inmobiliarianorte.com.ar',
  direccion: 'Av. Siempre Viva 123, Resistencia, Chaco',
  horario: 'Lunes a Viernes de 9 a 19 hs',
  desde: 1996,
}

export const TIPOS = [
  { id: 'casa', nombre: 'Casas', icono: '🏠' },
  { id: 'departamento', nombre: 'Departamentos', icono: '🏢' },
  { id: 'terreno', nombre: 'Terrenos', icono: '🌳' },
  { id: 'local', nombre: 'Locales', icono: '🏪' },
  { id: 'galpon', nombre: 'Galpones', icono: '🏭' },
  { id: 'campo', nombre: 'Campos', icono: '🌾' },
]

export const OPERACIONES = [
  { id: 'venta', nombre: 'Venta' },
  { id: 'alquiler', nombre: 'Alquiler' },
  { id: 'temporario', nombre: 'Alquiler temporario' },
]

const img = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=70`



export const formatearPrecio = (precio, moneda) =>
  `${moneda === 'USD' ? 'USD' : '$'} ${precio.toLocaleString('es-AR')}`

export const nombreOperacion = (id) => OPERACIONES.find((o) => o.id === id)?.nombre ?? id
export const nombreTipo = (id) => TIPOS.find((t) => t.id === id)?.nombre ?? id
