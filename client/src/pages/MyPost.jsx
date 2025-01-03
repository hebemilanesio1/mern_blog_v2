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

        const fetchMyPosts = async () => {
            try {

                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login'); 
                    return;
                }
                const response = await axios.get('http://localhost:5000/api/posts/my-posts', {
                    headers: {
                        'Authorization': `Bearer ${token}`, 
                    },
                });

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
                            key={_id}  
                            postID={_id} 
                            thumbnail={thumbnail}
                            category={category}
                            title={title}
                            description={description}
                            creator={creator} 
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
