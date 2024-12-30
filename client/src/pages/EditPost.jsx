import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const EditPost = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Uncategorized');
    const [description, setDescription] = useState('');
    const [currentThumbnail, setCurrentThumbnail] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);

        if (!token) {
            navigate('/login');
        } else {
            axios.get(`http://localhost:5000/api/posts/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            })
            .then(response => {
                const post = response.data;
                setTitle(post.title || '');
                setCategory(post.category || 'Uncategorized');
                setDescription(post.description || '');
                setCurrentThumbnail(post.thumbnail || ''); // Guarda el nombre de archivo de la imagen
            })
            .catch(error => {
                console.error('Error al cargar el post:', error);
                if (error.response?.status === 404) {
                    alert('Post no encontrado.');
                    navigate('/dashboard');
                }
            });
        }
    }, [id, navigate]);

    const POST_CATEGORIES = ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment", "Uncategorized", "Weather"];

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedData = {
            title,
            category,
            description,
            thumbnail: currentThumbnail, // Mantiene el nombre de la imagen
        };

        try {
            const token = localStorage.getItem('token');
            const response = await axios.put(`http://localhost:5000/api/posts/${id}`, updatedData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            console.log('Post actualizado:', response.data);
            navigate(`/posts/${id}`);
        } catch (error) {
            console.error('Error al actualizar el post:', error);
        }
    };

    return (
        <section className="edit-post">
            <div className="container">
                <h2>Editar posteo</h2>

                {!isAuthenticated && (
                    <p className="form__error-message">
                        Para editar un posteo, por favor, <button className="btn secondary" onClick={() => navigate('/login')}>Inicia sesión</button>
                    </p>
                )}

                {isAuthenticated && (
                    <form className="form edit-post__form" onSubmit={handleSubmit}>
                        <input
                            type="text"
                            placeholder="Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            autoFocus
                        />
                        <select
                            name="category"
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            {POST_CATEGORIES.map((cat, index) => (
                                <option key={index} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <ReactQuill
                            value={description}
                            onChange={setDescription}
                        />
                        {currentThumbnail && (
                            <div className="current-thumbnail">
                                <p>Imagen actual:</p>
                                <img src={`http://localhost:5000/uploads/${currentThumbnail}`} alt="Thumbnail actual" style={{ maxWidth: '100%', height: 'auto' }} />
                            </div>
                        )}
                        <button type="submit" className="btn primary">Actualizar</button>
                    </form>
                )}
            </div>
        </section>
    );
};

export default EditPost;

