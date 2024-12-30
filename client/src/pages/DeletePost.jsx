import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const DeletePost = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const handleDelete = async () => {
        try {
            await axios.delete(`http://localhost:5000/api/posts/${id}`);
            alert('Post eliminado');
            navigate('/');  // Redirigir después de eliminar
        } catch (error) {
            console.error('Error al eliminar el post:', error);
        }
    };

    return (
        <div className="delete-post">
            <h2>¿Estás seguro de que quieres eliminar este post?</h2>
            <button onClick={handleDelete} className='btn danger'>Eliminar</button>
            <button onClick={() => navigate(-1)} className='btn'>Cancelar</button>
        </div>
    );
};

export default DeletePost;
