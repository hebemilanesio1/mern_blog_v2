import React, { useState } from 'react'; // Importar useState
import {Link } from 'react-router-dom'
const Login = () => {
    const [userData, setUserData] = useState({
        email: '',
        password: '',
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
        <section className="login">
            <div className="container">
                <h2>Sign In</h2>
                <form className="form login__form" onSubmit={handleSubmit}>
                    <p className="form__error-message">This is an error message</p>
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
                    <button type="submit" className="btn primary">
                        Login
                    </button>
                </form>
                <small>Don't have an account? <Link to = "/register">Sign Up</Link></small>
            </div>
        </section>
    );
};

export default Login;