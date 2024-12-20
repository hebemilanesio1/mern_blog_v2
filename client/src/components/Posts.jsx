import React, { useState } from 'react';
import PostItem from '../components/PostItem';

import { DUMMY_POSTS } from '../data';
const Posts = () => {
    const [posts] = useState(DUMMY_POSTS);

    return (
        <section className="posts">
            {posts.length > 0 ? <div className="posts__container">
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
            </div> : <h2>No posts found</h2>}
        </section>
    );
};

export default Posts;
