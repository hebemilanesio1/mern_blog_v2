import React from 'react';
import { Link } from 'react-router-dom';

const PostAuthor = ({ creator }) => {
    if (!creator) return null; // Asegúrate de manejar el caso donde creator sea nulo

    return (
        <Link to={`/users/${creator._id}`} className="post__author">
            <div className="post__author-details">
                <small>{creator.username || 'Autor desconocido'}</small>
            </div>
        </Link>
    );
};

export default PostAuthor;
