import React, { useState } from 'react'; // Importar useState
import {Link } from 'react-router-dom'
const Register = () => {
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        password: '',
        password2: '',
    });

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Lógica para manejar el envío del formulario
        console.log('User Data Submitted:', userData);
    };

    return (
        <section className="register">
            <div className="container">
                <h2>Sign Up</h2>
                <form className="form register__form" onSubmit={handleSubmit}>
                    <p className="form__error-message">This is an error message</p>
                    <input
                        type="text"
                        placeholder="Full Name"
                        name="name"
                        value={userData.name}
                        onChange={handleChange}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        name="password"
                        value={userData.password}
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Confirm Password"
                        name="password2"
                        value={userData.password2}
                        onChange={handleChange}
                    />
                    <button type="submit" className="btn primary">
                        Register
                    </button>
                </form>
                <small>Already have an account? <Link to = "/login">Sign In</Link></small>
            </div>
        </section>
    );
};

export default Register;
