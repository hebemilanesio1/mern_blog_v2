const express = require('express');  // Elimina la duplicación
const router = express.Router();
const User = require('../models/User'); // Importa el modelo User
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // 'Bearer <token>'
    if (!token) {
        return res.status(401).json({ error: 'Token no proporcionado' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            console.error('Error al verificar el token:', err); // Agrega un log para ver qué error ocurre
            return res.status(403).json({ error: 'Token no válido' });
        }
        req.user = user; // Adjunta el usuario decodificado al objeto de la solicitud
        next();
    });
};


// Ruta para registrar un nuevo usuario
router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;

        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'Usuario ya existe' });
        }

        // Encriptar la contraseña antes de guardar el usuario
        const salt = await bcrypt.genSalt(10); // Genera un "salt"
        const hashedPassword = await bcrypt.hash(password, salt); // Encripta la contraseña

        // Crear el nuevo usuario con la contraseña encriptada
        const newUser = new User({ 
            username, 
            email, 
            password: hashedPassword 
        });

        // Guardar el usuario en la base de datos
        await newUser.save();

        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al crear el usuario', error });
    }
});

// Ruta para iniciar sesión
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Verifica si el usuario existe
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        // Verifica la contraseña
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Contraseña incorrecta' });
        }

        // Genera el token JWT
        const token = jwt.sign(
            { userId: user._id },
            process.env.JWT_SECRET || 'defaultSecretKey', // Usa una clave segura
            { expiresIn: '1h' } // Expira en 1 hora
        );

        res.status(200).json({
            message: 'Inicio de sesión exitoso',
            token,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al iniciar sesión', error });
    }
});

router.get('/me', authenticateToken, async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password'); // Evita devolver la contraseña
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        res.json({
            email: user.email,
            username: user.username,
            avatar: user.avatar || null, // Si tienes una foto de perfil, devuélvela aquí
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error del servidor' });
    }
});

module.exports = router;
