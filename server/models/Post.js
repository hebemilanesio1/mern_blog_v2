const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment", "Uncategorized", "Weather"],
        default: "Uncategorized"
    },
    description: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String, // Aquí puedes guardar la URL de la imagen
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Hace referencia al modelo de Usuario
        required: true
    }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
