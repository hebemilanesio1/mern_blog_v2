import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from '../components/PostItem';  // Suponiendo que ya tienes un componente PostItem para mostrar cada post

const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // Función para obtener todos los posteos
        const fetchAllPosts = async () => {
            try {
                // Hacemos una solicitud al backend para obtener todos los posteos
                const response = await axios.get('http://localhost:5000/api/posts');

                // Actualizamos el estado con los posteos obtenidos
                setPosts(response.data);
                setLoading(false);
            } catch (error) {
                setError('Error al obtener los posteos');
                setLoading(false);
            }
        };

        fetchAllPosts();
    }, []);

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

export default AllPosts;

