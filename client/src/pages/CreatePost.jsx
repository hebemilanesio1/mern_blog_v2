import React, { useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CreatePost = () => {
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('Uncategorized');
    const [description, setDescription] = useState('');

    const [file, setFile] = useState(null); // Guarda el archivo
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const POST_CATEGORIES = ["Agriculture", "Business", "Education", "Entertainment", "Art", "Investment", "Uncategorized", "Weather"];

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('category', category);
        formData.append('description', description);
        if (file) {
            formData.append('thumbnail', file);
        }

        console.log('Datos a enviar:', Object.fromEntries(formData));

        try {
            const token = localStorage.getItem('token');
            const response = await axios.post('http://localhost:5000/api/posts', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                }
            });

            console.log('Post creado:', response.data);
            navigate('/all-post');
        } catch (error) {
            console.error('Error al crear el post:', error);
        }
    };

    const handleLoginRedirect = () => {
        if (!isAuthenticated) {
            navigate('/login');
        }
    };

    return (
        <section className="create-post">
            <div className="container">
                <h2>Crear nuevo posteo</h2>

                {!isAuthenticated && (
                    <p className="form__error-message">
                        Para crear un posteo, por favor, <button className="btn secondary" onClick={handleLoginRedirect}>Inicia sesión</button>
                    </p>
                )}

                {isAuthenticated && (
                    <form className="form create-post__form" onSubmit={handleSubmit}>
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
                        <input
                            type="file"
                            accept="image/*"
                            onChange={handleFileChange}
                        />
                        <button type="submit" className="btn primary">Crear</button>
                    </form>
                )}
            </div>
        </section>
    );
};

export default CreatePost;
