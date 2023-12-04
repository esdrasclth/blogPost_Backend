const postController = require('../controllers/postController');
const auth = require('../auth/auth');


// Rutas para los artículos
module.exports = (app) => {
  app.get('/posts', postController.obtenerPosts);
  app.get('/posts/:id', postController.obtenerPostPorId);
  app.post('/posts', auth.authenticate, postController.crearPost);
  app.post('/posts/:id', auth.authenticate, postController.actualizarPost);
  app.delete('/posts/:id', auth.authenticate, postController.eliminarPost);
}