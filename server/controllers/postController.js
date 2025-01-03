const Post = require('../models/Post');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage }).single('thumbnail');

const createPost = async (req, res) => {
    upload(req, res, async (err) => {
        if (err) {
            return res.status(500).json({ message: 'Error subiendo la imagen', err });
        }

        try {
            const { title, category, description } = req.body;

            console.log('Usuario autenticado:', req.user); 

            if (!req.user || !req.user.userId) {
                return res.status(400).json({ message: 'Usuario no autenticado' });
            }

            const newPost = new Post({
                title,
                category,
                description,
                thumbnail: req.file ? req.file.filename : null,
                creator: req.user.userId, 
            });

            const savedPost = await newPost.save();

            res.status(201).json({
                id: savedPost._id,
                thumbnail: `uploads/${savedPost.thumbnail}`,
                category: savedPost.category,
                title: savedPost.title,
                description: savedPost.description,
                creator: savedPost.creator,
            });
        } catch (error) {
            console.error('Error al guardar el post:', error);
            res.status(500).json({ message: 'Error al crear el post' });
        }
    });
};

const getMyPosts = async (req, res) => {
    try {
        const userId = req.user.id; 

        if (!userId) {
            return res.status(400).json({ message: 'Usuario no autenticado' });
        }

        console.log('Buscando posts para el usuario con ID:', userId);

        const posts = await Post.find({ creator: userId }).populate('creator');

        res.status(200).json(posts);  
    } catch (error) {
        console.error('Error al obtener los posteos:', error);
        res.status(500).json({ message: 'Error al obtener los posteos' });
    }
};


const getPostById = async (req, res) => {
    try {
        console.log('Post ID:', req.params.id); 
        const post = await Post.findById(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.status(200).json(post);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching post', error });
    }
};

const getPostWithCreator = async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('creator', 'username email');
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }
        res.status(200).json(post);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al obtener el post con datos del creador', error });
    }
};

const updatePost = async (req, res) => {
    const postId = req.params.id;
    const { title, description, category, thumbnail } = req.body;

    if (!postId) {
        return res.status(400).json({ message: 'ID de post no proporcionado' });
    }

    if (!title || !description || !category) {
        return res.status(400).json({ message: 'Título, descripción o categoría faltante' });
    }

    try {
        const post = await Post.findById(postId);
        
        if (!post) {
            return res.status(404).json({ message: 'Post no encontrado' });
        }

        post.title = title;
        post.description = description;
        post.category = category;
        post.thumbnail = thumbnail;

        await post.save();

        return res.status(200).json(post);
    } catch (error) {
        console.error('Error al actualizar el post:', error);
        return res.status(500).json({ message: 'Error al actualizar el post' });
    }
};

const getAllPosts = async (req, res) => {
    try {
        const posts = await Post.find(); 
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener los posteos', error });
    }
};


module.exports = { createPost, getMyPosts, getPostById, updatePost, getAllPosts, getPostWithCreator};

