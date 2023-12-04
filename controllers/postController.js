const Post = require('../models/postModel');

// Obtener todos los posts
const obtenerPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 9; // Número predeterminado de elementos por página

        const skip = (page - 1) * limit;

        const posts = await Post.find()
            .skip(skip)
            .limit(limit);

        const totalPosts = await Post.countDocuments(); // Total de posts sin paginar

        const totalPages = Math.ceil(totalPosts / limit);

        res.json({ posts, totalPages, currentPage: page });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener los posts', error: error.message });
    }
};

// Obtener un post por ID
const obtenerPostPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ mensaje: 'Post no encontrado' });
        }

        res.json({ post });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener el post', error: error.message });
    }
};

// Crear un nuevo post
const crearPost = async (req, res) => {
    const { titulo, contenido, autor, categoria } = req.body;

    try {
        const nuevoPost = new Post({
            titulo,
            contenido,
            autor,
            categoria,
        });

        const postGuardado = await nuevoPost.save();
        res.json({ mensaje: 'Post creado con éxito', post: postGuardado });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear el post', error: error.message });
    }
};

// Actualizar un post por ID
const actualizarPost = async (req, res) => {
    const { id } = req.params;
    const { titulo, contenido, autor, categoria } = req.body;

    try {
        const post = await Post.findByIdAndUpdate(
            id,
            { titulo, contenido, autor, categoria },
            { new: true }
        );

        if (!post) {
            return res.status(404).json({ mensaje: 'Post no encontrado' });
        }

        res.json({ mensaje: 'Post actualizado con éxito', post });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar el post', error: error.message });
    }
};

// Eliminar un post por ID
const eliminarPost = async (req, res) => {
    const { id } = req.params;

    try {
        const post = await Post.findByIdAndDelete(id);
        if (!post) {
            return res.status(404).json({ mensaje: 'Post no encontrado' });
        }

        res.json({ mensaje: 'Post eliminado con éxito', post });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar el post', error: error.message });
    }
};

module.exports = {
    obtenerPosts,
    obtenerPostPorId,
    crearPost,
    actualizarPost,
    eliminarPost,
};