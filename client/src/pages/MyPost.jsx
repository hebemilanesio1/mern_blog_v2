import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from '../components/PostItem';  // Suponiendo que ya tienes un componente PostItem para mostrar cada post
import { useNavigate } from 'react-router-dom';

const MyPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        // Función para obtener los posteos del usuario
        const fetchMyPosts = async () => {
            try {
                // Obtenemos el token desde el localStorage
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login'); // Si no hay token, redirigimos al login
                    return;
                }

                // Hacemos una solicitud al backend para obtener los posteos del usuario
                const response = await axios.get('http://localhost:5000/api/posts/my-posts', {
                    headers: {
                        'Authorization': `Bearer ${token}`,  // Aquí se pasa el token en las cabeceras
                    },
                });

                // Actualizamos el estado con los posteos obtenidos
                setPosts(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error al obtener los posteos');
                setLoading(false);
            }
        };

        fetchMyPosts();
    }, [navigate]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <section className="posts">
            {posts.length > 0 ? (
                <div className="posts__container">
                    {posts.map(({ _id, thumbnail, category, title, description, creator }) => (
                        <PostItem
                            key={_id}  // Usamos _id, ya que es el identificador único del post
                            postID={_id}  // Pasamos el id del post
                            thumbnail={thumbnail}
                            category={category}
                            title={title}
                            description={description}
                            creator={creator}  // Pasamos el creador (creator)
                        />
                    ))}
                </div>
            ) : (
                <h2>No posts found</h2>
            )}
        </section>
    );
};

export default MyPosts;
