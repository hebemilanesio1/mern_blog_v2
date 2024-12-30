const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const { GridFsStorage } = require('multer-gridfs-storage');
const crypto = require('crypto');
const path = require('path');
const app = express();
const authRoutes = require('./routes/authRoutes');
const postRoutes = require('./routes/PostRoutes');
require('dotenv').config();

// Configuración de CORS
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Middleware para parsear JSON
app.use(bodyParser.json());


// Configurar la carpeta de uploads para servir archivos estáticos
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Conectar a la base de datos MongoDB
const mongoURI = 'mongodb://localhost:27017/bbdd_mern_blog';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Conectado a la base de datos'))
    .catch((error) => console.log(error));

// Configuración de GridFS
let gfs;
const conn = mongoose.connection;
conn.once('open', () => {
    gfs = new mongoose.mongo.GridFSBucket(conn.db, { bucketName: 'uploads' });
});

const storage = new GridFsStorage({
    url: mongoURI,
    options: { useUnifiedTopology: true },
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                const filename = buf.toString('hex') + path.extname(file.originalname);
                const fileInfo = {
                    filename: filename,
                    bucketName: 'uploads',
                };
                resolve(fileInfo);
            });
        });
    },
});
const upload = multer({ storage });

app.use('/api/uploads', upload.single('file'), (req, res) => {
    res.json({ file: req.file });
});

app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes); 

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

