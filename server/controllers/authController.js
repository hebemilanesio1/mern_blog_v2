const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Obtener el token
            token = req.headers.authorization.split(' ')[1];

            // Verificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Adjuntar el usuario al request
            req.user = await User.findById(decoded.userId).select('-password');

            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: 'No autorizado, token no válido' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'No autorizado, token no proporcionado' });
    }
};

module.exports = { protect };
