const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  contenido: { type: String, required: true },
  autor: { type: String, required: true },
  categoria: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  fecha: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
