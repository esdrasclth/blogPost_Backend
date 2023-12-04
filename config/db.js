const mongoose = require('mongoose');

// URL de conexión a la base de datos MongoDB
const conectarBD = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/BlogPost_Nodejs');
    console.log('Conexión a MongoDB establecida');
  } catch (error) {
    console.error('Error al conectar a la base de datos:', error.message);
    process.exit(1); // Salir del proceso con un código de error
  }
};

module.exports = conectarBD;
