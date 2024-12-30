import React, { useState, useEffect } from 'react'; // Importa useState y useEffect
import { useParams } from 'react-router-dom'; // Importa useParams para acceder a los parámetros de la URL
import PostItem from '../components/PostItem'; // Componente para mostrar cada post
import { DUMMY_POSTS } from '../data'; // Datos ficticios de los posts

const CategoryPosts = () => {
    const { categoryName } = useParams(); // Obtén el nombre de la categoría desde la URL
    const [posts, setPosts] = useState([]); // Estado para los posts filtrados

    useEffect(() => {
        // Filtra los posts cuando se cargue el componente o cambie la categoría
        const filteredPosts = DUMMY_POSTS.filter(post => post.category === categoryName);
        setPosts(filteredPosts); // Actualiza el estado con los posts filtrados
    }, [categoryName]); // Solo se ejecuta cuando cambia la categoría en la URL

    return (
        <section>
            <h1>Posts in {categoryName} Category</h1> {/* Título con el nombre de la categoría */}
            {posts.length > 0 ? (
                <div className="container posts__container">
                    {posts.map(({ id, thumbnail, category, title, description, authorID }) => (
                        <PostItem
                            key={id}
                            postID={id}
                            thumbnail={thumbnail}
                            category={category}
                            title={title}
                            description={description}
                            authorID={authorID}
                        />
                    ))}
                </div>
            ) : (
                <h2>No posts found in this category</h2>
            )}
        </section>
    );
};

export default CategoryPosts;
