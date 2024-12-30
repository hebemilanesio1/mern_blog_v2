import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import PostAuthor from '../components/PostAuthor';

const PostDetail = () => {
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [userId, setUserId] = useState(null); // ID del usuario autenticado
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setIsAuthenticated(true);
            const decoded = jwtDecode(token); // Decodificar el token
            setUserId(decoded.userId); // Cambia esto al campo que representa al usuario en tu token
        }

        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/post-with-creator/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                setPost(response.data);
            } catch (error) {
                console.error('Error al obtener el post:', error);
                if (error.response && error.response.status === 401) {
                    navigate('/login');
                }
            }
        };

        fetchPost();
    }, [id, navigate]);

    const handleDelete = async () => {
        const confirm = window.confirm('¿Estás seguro de que quieres eliminar este post?');
        if (confirm) {
            try {
                const token = localStorage.getItem('token');
                await axios.delete(`http://localhost:5000/api/posts/${post._id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                    },
                });
                alert('Post eliminado correctamente');
                navigate('/');
            } catch (error) {
                console.error('Error al eliminar el post:', error);
                alert('No se pudo eliminar el post');
            }
        }
    };

    if (!post) {
        return <p>Cargando...</p>;
    }

    const imageUrl = post.thumbnail ? `http://localhost:5000/uploads/${post.thumbnail}` : '';

    return (
        <section className="post-detail">
            <div className="container post-detail__container">
                <div className="post-detail__header">
                    <PostAuthor creator={post.creator} />
                    {isAuthenticated && userId === post.creator._id && ( // Compara IDs
                        <div className="post-detail__buttons">
                            <Link to={`/posts/${post._id}/edit`} className="btn sm primary">
                                Editar
                            </Link>
                            <Link 
                                to="#" 
                                onClick={handleDelete} 
                                className="btn sm danger"
                            >
                                Eliminar
                            </Link>
                        </div>
                    )}
                </div>
                <h1>{post.title}</h1>
                <div className="post-detail__thumbnail">
                    {imageUrl && <img src={imageUrl} alt="Post Thumbnail" />}
                </div>
                <div 
                    className="post-detail__description"
                    dangerouslySetInnerHTML={{ __html: post.description }}
                />
            </div>
        </section>
    );
};

export default PostDetail;
