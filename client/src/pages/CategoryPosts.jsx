import React, { useState } from 'react'; // Se importa useState
import PostItem from '../components/PostItem';
import { DUMMY_POSTS } from '../data';

const CategoryPosts = () => {
    const [posts] = useState(DUMMY_POSTS); // useState inicializado correctamente

    return (
        <section>
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
                <h2>No posts found</h2>
            )}
        </section>
    );
};

export default CategoryPosts;