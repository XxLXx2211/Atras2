import axios from 'axios';

// Obtener la URL base de la API
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';
console.log('API URL:', API_URL);

// Crear una instancia de axios con la URL base y timeout
const API = axios.create({
  baseURL: API_URL,
  timeout: 15000, // 15 segundos de timeout
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

// Interceptor para agregar el token a las solicitudes
API.interceptors.request.use(
  (config) => {
    console.log(`Realizando solicitud a: ${config.method.toUpperCase()} ${config.baseURL}${config.url}`);

    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.error('Error en la solicitud:', error);
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de respuesta
API.interceptors.response.use(
  (response) => {
    console.log(`Respuesta exitosa de: ${response.config.url}`);
    return response;
  },
  (error) => {
    // Manejar errores de red o timeout
    if (!error.response) {
      console.error('Error de red o timeout:', error.message);
      return Promise.reject({
        response: {
          status: 0,
          data: { error: 'Error de conexión. Por favor, verifica tu conexión a internet o inténtalo más tarde.' }
        }
      });
    }

    // Si el error es 401 (no autorizado), redirigir al login
    if (error.response.status === 401) {
      console.error('Error 401: No autorizado');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/auth/login';
    }

    // Si el error es 500, mostrar mensaje personalizado
    if (error.response.status === 500) {
      console.error('Error 500 del servidor:', error.response.data);
    }

    return Promise.reject(error);
  }
);

export default API;
