import API from './api';

// Obtener todas las categorías
export const getCategories = async () => {
  try {
    console.log('Solicitando lista de categorías...');
    const response = await API.get('/categories');
    console.log('Respuesta de categorías recibida:', response.data.length, 'categorías');
    return response.data;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    console.error('Detalles del error:', error.response ? error.response.data : 'No hay detalles disponibles');
    console.error('URL de la solicitud:', error.config ? error.config.url : 'URL no disponible');
    console.error('URL base:', error.config ? error.config.baseURL : 'Base URL no disponible');
    throw error;
  }
};

// Obtener una categoría por ID
export const getCategory = async (id) => {
  try {
    const response = await API.get(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener categoría ${id}:`, error);
    throw error;
  }
};

// Crear una nueva categoría
export const createCategory = async (categoryData) => {
  try {
    const response = await API.post('/categories', categoryData);
    return response.data;
  } catch (error) {
    console.error('Error al crear categoría:', error);
    throw error;
  }
};

// Actualizar una categoría existente
export const updateCategory = async (id, categoryData) => {
  try {
    const response = await API.put(`/categories/${id}`, categoryData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar categoría ${id}:`, error);
    throw error;
  }
};

// Eliminar una categoría
export const deleteCategory = async (id) => {
  try {
    const response = await API.delete(`/categories/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar categoría ${id}:`, error);
    throw error;
  }
};

// Obtener preguntas por categoría
export const getQuestionsByCategory = async (categoryId) => {
  try {
    const response = await API.get(`/categories/${categoryId}/questions`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener preguntas de la categoría ${categoryId}:`, error);
    throw error;
  }
};
