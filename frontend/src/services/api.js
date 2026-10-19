// src/services/api.js

const API_URL = import.meta.env.VITE_API_URL || '';

/**
 * Función genérica para realizar peticiones al backend en Go
 */
async function fetchAPI(endpoint, options = {}) {
  const token = localStorage.getItem('token'); // Por si necesitas enviar autenticación en rutas privadas

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 204) {
    return null; // Respuesta vacía exitosa (ej. Delete)
  }

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.error?.message || 'Ocurrió un error en la solicitud');
  }

  return result.data; // Retorna directamente la propiedad "data" que devuelve tu backend en Go
}

/**
 * Servicios específicos para Inmuebles
 */
export const inmueblesService = {
  // Obtener lista de inmuebles (admite filtros opcionales como query params)
  async listar(filtros = {}) {
    const params = new URLSearchParams();
    Object.entries(filtros).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        params.append(key, value);
      }
    });

    const queryString = params.toString() ? `?${params.toString()}` : '';
    return fetchAPI(`/api/v1/inmuebles${queryString}`);
  },

  // Obtener un inmueble por su ID
  async obtenerPorId(id) {
    return fetchAPI(`/api/v1/inmuebles/${id}`);
  },

  // Enviar consulta pública sobre un inmueble
  async enviarConsultaPublica(inmuebleId, datosConsulta) {
    return fetchAPI(`/api/v1/inmuebles/${inmuebleId}/consultas`, {
      method: 'POST',
      body: JSON.stringify(datosConsulta),
    });
  },
};