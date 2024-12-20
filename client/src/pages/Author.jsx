import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import Avatar1 from '../images/avatar1.jpg';
import Avatar2 from '../images/avatar2.jpg';
import Avatar3 from '../images/avatar3.jpg';
import Avatar4 from '../images/avatar4.jpg';
import Avatar5 from '../images/avatar5.jpg';

const authorsData = [
    { id: 1, avatar: Avatar1, name: 'Emily Thompson', posts: 3 },
    { id: 2, avatar: Avatar2, name: 'Ernest Achiever', posts: 5 },
    { id: 3, avatar: Avatar3, name: 'Daniel Johnson', posts: 0 },
    { id: 4, avatar: Avatar4, name: 'Olivia Wilson', posts: 2 },
    { id: 5, avatar: Avatar5, name: 'Maia Brown', posts: 1 },
];

const Author = () => {
    const [authors] = useState(authorsData);

    return (
        <section className="authors">
            {authors.length > 0 ? (
                <div className="container authors__container">
                    {authors.map(({ id, avatar, name, posts }) => (
                        <Link key={id} to={`/posts/users/${id}`} className="author__card">
                            <div className="author__avatar">
                                <img
                                    src={avatar}
                                    alt={`Avatar of ${name}`}
                                />
                                <div className="author__details">
                                    <h3>{name}</h3>
                                    <p>{posts} {posts === 1 ? 'post' : 'posts'}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            ) : (
                <h2 className="center">No users/authors found.</h2>
            )}
        </section>
    );
};

export default Author;

