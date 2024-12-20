const express = require('express');
const router = express.Router();
const Post = require('../models/Post'); // Importa el modelo de Post
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // Configuración de multer para manejar imágenes

// Ruta para crear un nuevo post
router.post('/', upload.single('thumbnail'), async (req, res) => {
    try {
        const thumbnailUrl = req.file ? req.file.path : ''; // Asignamos la URL de la imagen (si se carga una)

        const newPost = new Post({
            title: req.body.title,
            category: req.body.category,
            description: req.body.description,
            thumbnail: thumbnailUrl, // Guardamos la ruta de la imagen o URL
            author: req.user._id, // Asumiendo que tienes un sistema de autenticación
        });

        await newPost.save();
        res.status(201).json(newPost); // Respondemos con el post creado
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el post', error });
    }
});

module.exports = router;
