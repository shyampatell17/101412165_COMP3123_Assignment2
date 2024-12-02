import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';

export const Signup = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState(""); // To display success/error messages
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === 'username') setUsername(value);
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const signup = {
            username: username,
            email: email,
            password: password,
        };

        try {
            const token = localStorage.getItem('token');
            const response = await apiClient.post('/api/v1/user/signup', signup, {
                headers: { Authorization: `Bearer ${token}` },
            });

            console.log(response.data);
            setSubmitted(true);
            setUsername("");
            setEmail("");
            setPassword("");
        } catch (error) {
            console.error("Error: ", error.message);
            setMessage("An error occurred while signing up.");
        }

        setTimeout(() => {
            navigate('/login');
        }, 2000);
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100" style={{ maxWidth: "500px" }}>
            <div className="card shadow-lg p-4">
                <h2 className="text-center text-primary mb-4">Sign Up</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="username"
                            placeholder="Enter your username"
                            value={username}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Enter Password"
                            value={password}
                            onChange={handleInput}
                            required
                        />
                    </div>

                    <button type="submit" className="btn btn-primary w-100 mb-3">Sign Up</button>
                </form>

                {submitted && <p className="mt-3 text-success">Sign Up Successful! Redirecting to login...</p>}
                {message && <p className="mt-3 text-danger">{message}</p>}

                <p className="mt-3">
                    Already Have an account? <a href='/login' className="text-primary">Login</a>
                </p>
            </div>
        </div>
    );
};
