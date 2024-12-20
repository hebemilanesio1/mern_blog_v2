import React from 'react'
import PostAuthor from '../components/PostAuthor'
import { Link } from 'react-router-dom'
import Thumbnail from '../images/blog22.jpg'

const PostDetail = () => {
    return (
        <section className="post-detail">
            <div className="container post-detail__container">
                <div className="post-detail__header">
                    <PostAuthor />
                    <div className="post-detail__buttons">
                        <Link to={`/posts/wermer/edit`} className='btn sm primary'>Edit</Link>
                        <Link to={`/posts/wermer/delete`} className='btn sm danger'>Delete</Link>
                    </div>
                </div>
                <h1>This is the post title!</h1>
                <div className="post-detail__thumbnail">
                    <img src={Thumbnail} alt="Post Thumbnail" />
                </div>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Non repudiandae saepe voluptatem in laboriosam libero, tempora, est earum quibusdam quaerat magnam temporibus amet quam sit.
                    Ex harum quo, aut libero ipsam explicabo, possimus doloremque dolor tempora quibusdam deleniti quos? Architecto.
                </p>
                <p>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                    Quam ipsa magni eum, dicta magnam dolores delectus laborum hic error soluta.
                </p>
                <p>
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Est voluptate recusandae placeat.
                </p>
            </div>
        </section>
    )
}

export default PostDetail
