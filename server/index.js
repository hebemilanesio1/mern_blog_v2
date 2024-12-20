const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const postRoutes = require('./routes/PostRoutes');

const app = express();
const port = 5000;

// Middlewares
app.use(cors());
app.use(express.json()); // Para parsear JSON en las solicitudes

// Usar las rutas de los posts
app.use('/api/posts', postRoutes);

// Conectar con MongoDB
mongoose.connect('mongodb://localhost/bbdd_mern_blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Conectado a MongoDB');
}).catch(err => {
    console.error('Error al conectar con MongoDB:', err);
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});


