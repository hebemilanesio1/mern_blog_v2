import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });
    const [error, setError] = useState(null);  // Para manejar errores
    const [successMessage, setSuccessMessage] = useState('');  // Para manejar el mensaje de éxito
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Verificar si las contraseñas coinciden
        if (userData.password !== userData.password2) {
            setError("Las contraseñas no coinciden");
            return;
        }

        // Enviar los datos al backend
        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: userData.name,
                    email: userData.email,
                    password: userData.password,
                }),
            });

            const responseData = await response.json();

            if (response.ok) {
                // Si la respuesta es exitosa, mostrar un mensaje de éxito
                setSuccessMessage(responseData.message || 'Usuario registrado con éxito');
                setError(null); // Limpiar los posibles errores
                setTimeout(() => navigate('/login'), 2000);  // Redirigir a login después de 2 segundos
            } else {
                // Si hay un error, mostrar el mensaje de error
                setError(responseData.message || 'Hubo un error al registrar el usuario');
                setSuccessMessage('');  // Limpiar mensaje de éxito
            }
        } catch (err) {
            setError("Error de red: " + err.message);
            setSuccessMessage('');
        }
    };

    return (
        <section className="register">
            <div className="container">
                <h2>Registrate</h2>

                {/* Mostrar el mensaje de éxito o error */}
                {successMessage && <p className="success-message">{successMessage}</p>}
                {error && <p className="error-message">{error}</p>}

                <form className="form register__form" onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={userData.password2}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btn primary">
                        Register
                    </button>
                </form>

                <small>¿Ya tienes una cuenta? <Link to="/login">Ingresar</Link></small>
            </div>
        </section>
    );
};

export default Register;

