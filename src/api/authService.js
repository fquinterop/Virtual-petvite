// src/api/authService.js
// Conecta con el backend Spring Boot para registro y login de clientes

import axios from 'axios'

const BASE = import.meta.env.VITE_API_URL || 'http://localhost:8080'

const api = axios.create({ baseURL: BASE })

export const authService = {

  // POST /clientes/registro
  register: async ({ name, email, password }) => {
    const { data } = await api.post('/clientes/registro', {
      nombre: name,
      email,
      password,
    })
    // Devuelve { token, user: { id, name, email, role } }
    return data
  },

  // POST /clientes/login
  login: async ({ email, password }) => {
    const { data } = await api.post('/clientes/login', { email, password })
    return data
  },

  logout: async () => true,
}
