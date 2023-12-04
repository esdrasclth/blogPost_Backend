const express = require('express');
const conectarBD = require('./config/db');
const AuthRoutes = require('./routes/authRoutes');
const PostRoutes = require('./routes/postRoutes');
const CategoryRoutes = require('./routes/categoryRoutes');
const { fileUpload } = require('./controllers/fileController');
const fileUploadMiddleware = require('./middlewares/uploadMiddleware');

const app = express();

// Conectar a la base de datos MongoDB
conectarBD();

// Configuración de middleware
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Servidor web en ejecución!");
});

// Configuración de rutas
AuthRoutes(app);
PostRoutes(app);
CategoryRoutes(app);

// Ruta para subir archivos
app.post('/upload', fileUploadMiddleware, fileUpload);

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});
