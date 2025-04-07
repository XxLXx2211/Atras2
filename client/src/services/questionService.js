import API from './api';

// Obtener todas las preguntas
export const getQuestions = async () => {
  try {
    console.log('Solicitando lista de preguntas...');
    const response = await API.get('/questions');
    console.log('Respuesta de preguntas recibida:', response.data.length, 'preguntas');
    return response.data;
  } catch (error) {
    console.error('Error al obtener preguntas:', error);
    console.error('Detalles del error:', error.response ? error.response.data : 'No hay detalles disponibles');
    console.error('URL de la solicitud:', error.config ? error.config.url : 'URL no disponible');
    console.error('URL base:', error.config ? error.config.baseURL : 'Base URL no disponible');
    throw error;
  }
};

// Obtener una pregunta por ID
export const getQuestion = async (id) => {
  try {
    const response = await API.get(`/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener pregunta ${id}:`, error);
    throw error;
  }
};

// Crear una nueva pregunta
export const createQuestion = async (questionData) => {
  try {
    const response = await API.post('/questions', questionData);
    return response.data;
  } catch (error) {
    console.error('Error al crear pregunta:', error);
    throw error;
  }
};

// Actualizar una pregunta
export const updateQuestion = async (id, questionData) => {
  try {
    const response = await API.put(`/questions/${id}`, questionData);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar pregunta ${id}:`, error);
    throw error;
  }
};

// Eliminar una pregunta
export const deleteQuestion = async (id) => {
  try {
    const response = await API.delete(`/questions/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar pregunta ${id}:`, error);
    throw error;
  }
};
