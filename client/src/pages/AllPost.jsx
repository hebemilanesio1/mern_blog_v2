import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PostItem from '../components/PostItem';  
const AllPosts = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {

        const fetchAllPosts = async () => {
            try {

                const response = await axios.get('http://localhost:5000/api/posts');

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

export default AllPosts;

