import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import defaultAvatar from '../images/avatar14.jpg';
import { FaEdit, FaCheck } from 'react-icons/fa';

const UserProfile = () => {
    const [avatar, setAvatar] = useState(defaultAvatar);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    return (
        <section className="profile">
            <div className="container profile__container">
                {/* Link to My Posts */}
                <Link to={`/myposts/sdfsdf`} className="btn">
                    My posts
                </Link>

                <div className="profile__details">
                    <div className="avatar__wrapper">
                        {/* Profile Avatar */}
                        <div className="profile__avatar">
                            <img src={avatar || avatar} alt="User Avatar" />
                        </div>

                        {/* Form to Update Avatar */}
                        <form className="avatar__form">
                            <input
                                type="file"
                                id="avatar"
                                name="avatar"
                                accept=".jpg,.png"
                                onChange={(e) => setAvatar(URL.createObjectURL(e.target.files[0]))}
                            />
                            <label htmlFor="avatar">
                                <FaEdit />
                            </label>
                        </form>
                        <button className="profile__avatar-btn">
                            <FaCheck />
                        </button>
                    </div>

                    {/* User Name */}
                    <h1>Andrea Taylor</h1>

                    {/* Profile Update Form */}
                    <form className="form profile__form">
                        <p className="form__error-message">This is an error message</p>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Current Password"
                            value={currentPassword}
                            onChange={(e) => setCurrentPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            placeholder="Confirm Password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button type="submit" className="btn primary">
                            Update Details
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default UserProfile;

