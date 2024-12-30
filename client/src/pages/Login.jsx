import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
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
        console.log('Datos enviados:', userData);
    
        try {
            const response = await axios.post('http://localhost:5000/api/auth/login', userData);
    
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/my-posts');  // Redirigir al componente CreatePost
            }
        } catch (error) {
            console.error('Error en el inicio de sesión:', error.response?.data || error.message);
            setError('Email o contraseña incorrectos');
        }
    };    

    return (
        <section className="login">
            <div className="container">
                <h2>Ingresar</h2>
                {error && <p className="form__error-message">{error}</p>}
                <form className="form login__form" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit" className="btn primary">
                        Iniciar sesión
                    </button>
                </form>
                <small>
                    ¿No tienes cuenta? <Link to="/register">Registrarse</Link>
                </small>
            </div>
        </section>
    );
};

export default Login;
