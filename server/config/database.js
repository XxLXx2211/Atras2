const mongoose = require('mongoose');
require('dotenv').config();

// Configurar conexión a MongoDB
const connectMainDatabase = async () => {
  try {
    // Usar MongoDB Atlas como base de datos principal
    const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/feedback-system';

    if (!MONGODB_URI) {
      throw new Error('No se ha definido la URL de conexión a MongoDB');
    }

    // Opciones de conexión optimizadas para Render
    const mongooseOptions = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 60000, // Aumentado a 60 segundos para Render
      socketTimeoutMS: 60000, // Aumentado a 60 segundos para Render
      connectTimeoutMS: 60000, // Aumentado a 60 segundos para Render
      family: 4, // Forzar IPv4
      retryWrites: true,
      w: 'majority',
      maxPoolSize: 10,
      minPoolSize: 1,
      // Opciones adicionales para mejorar la estabilidad en Render
      autoIndex: true,
      autoCreate: true
    };

    console.log('Intentando conectar a la base de datos principal...');
    console.log(`URI: ${MONGODB_URI.replace(/:[^:]*@/, ':****@')}`);

    // Intentar conectar con reintentos
    let retries = 5; // Aumentado a 5 intentos para Render
    let lastError = null;

    while (retries > 0) {
      try {
        await mongoose.connect(MONGODB_URI, mongooseOptions);
        console.log('Conectado exitosamente a la base de datos principal');

        // Configurar eventos de conexión para mejor manejo de errores
        mongoose.connection.on('error', (err) => {
          console.error('Error en la conexión a MongoDB:', err);
          // No cerramos la conexión aquí, dejamos que mongoose intente reconectar
        });

        mongoose.connection.on('disconnected', () => {
          console.log('MongoDB desconectado. Intentando reconectar...');
        });

        mongoose.connection.on('reconnected', () => {
          console.log('Reconectado exitosamente a MongoDB');
        });

        return true;
      } catch (attemptError) {
        lastError = attemptError;
        retries--;

        if (retries > 0) {
          console.log(`Error al conectar a la base de datos principal (intento ${5-retries}/5). Reintentando...`);
          await new Promise(resolve => setTimeout(resolve, 3000)); // Aumentado a 3 segundos para Render
        }
      }
    }

    // Si llegamos aquí, todos los intentos fallaron
    throw lastError || new Error('No se pudo conectar a la base de datos principal después de varios intentos');
  } catch (error) {
    console.error('Error al conectar a la base de datos principal:', error);
    throw error; // Propagar el error para que la aplicación falle si no puede conectarse
  }
};

module.exports = { connectMainDatabase };
