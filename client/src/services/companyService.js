import API from './api';

// Obtener todas las empresas
export const getCompanies = async () => {
  try {
    console.log('Solicitando lista de empresas...');
    const response = await API.get('/companies');
    console.log('Respuesta de empresas recibida:', response.data.length, 'empresas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener empresas:', error);
    console.error('Detalles del error:', error.response ? error.response.data : 'No hay detalles disponibles');
    console.error('URL de la solicitud:', error.config ? error.config.url : 'URL no disponible');
    console.error('URL base:', error.config ? error.config.baseURL : 'Base URL no disponible');
    throw error;
  }
};

// Obtener una empresa por ID
export const getCompany = async (id) => {
  try {
    const response = await API.get(`/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener empresa ${id}:`, error);
    throw error;
  }
};

// Crear una nueva empresa
export const createCompany = async (companyData) => {
  try {
    console.log('Creando empresa con datos:', companyData);
    const response = await API.post('/companies', companyData);
    console.log('Respuesta al crear empresa:', response);
    return response.data;
  } catch (error) {
    console.error('Error al crear empresa:', error);
    throw error;
  }
};

// Actualizar una empresa
export const updateCompany = async (id, companyData) => {
  try {
    const response = await API.put(`/companies/${id}`, companyData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar empresa ${id}:`, error);
    throw error;
  }
};

// Eliminar una empresa
export const deleteCompany = async (id) => {
  try {
    const response = await API.delete(`/companies/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar empresa ${id}:`, error);
    throw error;
  }
};
