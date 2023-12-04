const Category = require('../models/categoryModel');

// Obtener todas las categorías
const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Category.find();
        res.json({ categorias });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener categorías', error: error.message });
    }
};

// Obteniendo las categorías por ID
const obtenerCategoriaPorId = async (req, res) => {
    const { id } = req.params;

    try {
        const categoria = await Category.findById(id);
        if (!categoria) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada' });
        }
        res.json({ categoria });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al obtener la categoría', error: error.message });
    }
};

// Crear una nueva categoría
const crearCategoria = async (req, res) => {
    const { nombre } = req.body;

    try {
        const nuevaCategoria = new Category({ nombre });
        const categoriaGuardada = await nuevaCategoria.save();
        res.json({ mensaje: 'Categoría creada con éxito', categoria: categoriaGuardada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al crear la categoría', error: error.message });
    }
};

// Actualizando las categorias
const actualizarCategoria = async (req, res) => {
    const { id } = req.params;
    const { nombre } = req.body;

    try {
        const categoriaActualizada = await Category.findByIdAndUpdate(id, { nombre }, { new: true });
        if (!categoriaActualizada) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada para actualizar' });
        }
        res.json({ mensaje: 'Categoría actualizada con éxito', categoria: categoriaActualizada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la categoría', error: error.message });
    }
};

// Eliminando las categorias
const eliminarCategoria = async (req, res) => {
    const { id } = req.params;

    try {
        const categoriaEliminada = await Category.findByIdAndDelete(id);
        if (!categoriaEliminada) {
            return res.status(404).json({ mensaje: 'Categoría no encontrada para eliminar' });
        }
        res.json({ mensaje: 'Categoría eliminada con éxito', categoria: categoriaEliminada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la categoría', error: error.message });
    }
};

module.exports = {
    obtenerCategorias,
    crearCategoria,
    obtenerCategoriaPorId,
    actualizarCategoria,
    eliminarCategoria,
};
