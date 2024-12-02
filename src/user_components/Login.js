import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';

export const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [submitted, setSubmitted] = useState(false);
    const [message, setMessage] = useState(""); // To display success/error messages
    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    // Handle form submission
    const handleLogin = async (e) => {
        e.preventDefault(); // Prevent default form refresh
        setMessage(""); // Clear previous messages

        try {
            const response = await apiClient.post("/api/v1/user/login", {
                email,
                password,
            });

            if (response.status === 200) {
                setMessage("Login successful!");

                // Store the token for authentication persistence
                localStorage.setItem("token", response.data.token);

                // Navigate to the protected route after successful login
                navigate("/employeelist");
            }
        } catch (error) {
            // Handle errors from API response
            if (error.response && error.response.data) {
              // Display backend error message
                setMessage(error.response.data.message); 
            } else {
                setMessage("An error occurred while logging in.");
            }
        }
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100" style={{ maxWidth: "500px" }}>
            <div className="card shadow-lg p-4">
                <h2 className="text-center text-primary mb-4">Login</h2>
                <form onSubmit={handleLogin}>
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

                    <button type="submit" className="btn btn-primary w-100 mb-3">Login</button>
                </form>

                {message && <p className="mt-3 text-success">{message}</p>}
                <p className="mt-3">
                    Don't have an account? <a href="/signup" className="text-primary">Sign up</a>
                </p>
            </div>
        </div>
    );
};
