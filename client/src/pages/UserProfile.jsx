import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import defaultAvatar from '../images/avatar14.jpg';
import { FaEdit, FaCheck } from 'react-icons/fa';
import axios from 'axios';

const UserProfile = () => {
    const [avatar, setAvatar] = useState(defaultAvatar);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    
    const navigate = useNavigate(); // Hook de navegación para redirigir

    // Función para verificar si el usuario está autenticado
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); // Redirigir al login si no está autenticado
        } else {
            getUserData();
        }
    }, [navigate]);

    // Función para obtener los datos del usuario
    const getUserData = async () => {
        const token = localStorage.getItem('token');
        if (token) {
            try {
                const response = await axios.get('http://localhost:5000/api/auth/me', {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                const userData = response.data;
                setUsername(userData.username);
                setEmail(userData.email);
                setAvatar(userData.avatar || defaultAvatar); // Si no tiene avatar, usar el avatar por defecto
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        }
    };

    // Función para cerrar sesión
    const logout = () => {
        localStorage.removeItem('token'); // Eliminar el token de localStorage
        navigate('/login'); // Redirigir a la página de login
    };

    // Función para actualizar el avatar
    const handleAvatarChange = (e) => {
        setAvatar(URL.createObjectURL(e.target.files[0]));
    };

    return (
        <section className="profile">
            <div className="container profile__container">
                <Link to="/myposts" className="btn">
                    My posts
                </Link>

                <div className="profile__details">
                    <div className="avatar__wrapper">
                        <div className="profile__avatar">
                            <img src={avatar} alt="User Avatar" />
                        </div>

                        {/* Form to Update Avatar */}
                        <form className="avatar__form">
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                accept=".jpg,.png"
                                onChange={handleAvatarChange}
                            />
                            <label htmlFor="avatar">
                                <FaEdit />
                            </label>
                        </form>
                        <button className="profile__avatar-btn">
                            <FaCheck />
                        </button>
                    </div>

                    {/* User Name */}
                    <h1>{username}</h1>

                    {/* Profile Update Form */}
                    <form className="form profile__form">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                    </form>

                    <button onClick={logout} className="btn logout-btn">
                        Log out
                    </button>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;
