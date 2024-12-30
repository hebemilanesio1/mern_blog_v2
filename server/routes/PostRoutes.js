const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const authenticateToken = require('../middleware/authenticateToken');
const Post = require('../models/Post'); // Asegúrate de importar el modelo Post
const { createPost } = require('../controllers/postController');
const { getMyPosts } = require('../controllers/postController');
const { getPostById } = require('../controllers/postController');
const { updatePost } = require('../controllers/postController'); 
const { getAllPosts } = require('../controllers/postController')
const { getPostWithCreator } = require('../controllers/postController')

router.post('/', protect, createPost);

router.get('/', getAllPosts);

// Obtener los posts del usuario logueado
router.get('/my-posts', authenticateToken, getMyPosts);

// Obtener un post por ID
router.get('/:id', getPostById);

// Ruta para actualizar un post
router.put('/:id', protect, updatePost); // Aquí agregamos el endpoint PUT para actualizar el post

router.delete('/:id', async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.status(200).json({ message: 'Post eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar el post', error });
    }
});

router.get('/post-with-creator/:id', getPostWithCreator);

module.exports = router;
