const categoryController = require('../controllers/categoryController');


// Rutas para los artículos
module.exports = (app) => {
  app.get('/category', categoryController.obtenerCategorias);
  app.get('/category/:id', categoryController.obtenerCategoriaPorId);
  app.post('/category', categoryController.crearCategoria);
  app.post('/category/:id', categoryController.actualizarCategoria);
  app.delete('/category/:id', categoryController.eliminarCategoria);
}