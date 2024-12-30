const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: { type: String, required: true },
    category: { type: String, required: true },
    description: { type: String, required: true },
    thumbnail: { type: String, required: false },
    creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Asegúrate de que 'creator' sea un ObjectId y esté referenciando el modelo User
}, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);
