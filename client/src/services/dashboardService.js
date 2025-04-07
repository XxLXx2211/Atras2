import API from './api';

// Obtener empleados con sus puntuaciones
export const getEmployeesWithScores = async () => {
  try {
    console.log('Solicitando empleados con puntuaciones...');
    const response = await API.get('/dashboard/employees-with-scores');
    console.log('Respuesta recibida:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error al obtener empleados con puntuaciones:', error);
    console.error('Detalles del error:', error.response ? error.response.data : 'No hay detalles disponibles');
    console.error('URL de la solicitud:', error.config ? error.config.url : 'URL no disponible');
    console.error('URL base:', error.config ? error.config.baseURL : 'Base URL no disponible');
    throw error;
  }
};

// Obtener estadísticas generales del dashboard
export const getDashboardStats = async () => {
  try {
    const response = await API.get('/dashboard/stats');
    return response.data;
  } catch (error) {
    console.error('Error al obtener estadísticas del dashboard:', error);
    throw error;
  }
};
