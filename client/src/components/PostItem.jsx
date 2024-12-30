import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PostAuthor from '../components/PostAuthor';

const PostItem = ({ postID, category, title = '', description = '', creator, thumbnail, token }) => {
    const [post, setPost] = useState(null);
    const navigate = useNavigate();

    const shortDescription = description.length > 145 ? description.substr(0, 145) + '...' : description;
    const postTitle = title.length > 30 ? title.substr(0, 30) + '...' : title;

    useEffect(() => {
        const fetchPost = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/posts/post-with-creator/${postID}`, {
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
    }, [postID, token, navigate]);

    // Asegúrate de que el thumbnail tenga la ruta correcta
    const imageUrl = thumbnail ? `http://localhost:5000/uploads/${thumbnail}` : '';

    return (
        <article className="post">
            <div className="post__thumbnail">
                {/* Si hay una imagen, muestra el thumbnail, sino muestra un valor por defecto */}
                <img src={imageUrl} alt={postTitle} />
            </div>
            <div className="post__content">
                <Link to={`/posts/${postID}`}>
                    <h3>{postTitle}</h3>
                </Link>
                <p 
                    dangerouslySetInnerHTML={{ __html: shortDescription }}
                />
                <div className="post__footer">
                    {/* Aquí pasamos el objeto creator directamente a PostAuthor */}
                    <PostAuthor creator={post ? post.creator : creator} />
                    <h5>{category}</h5>
                </div>
            </div>
        </article>
    );
}

export default PostItem;
