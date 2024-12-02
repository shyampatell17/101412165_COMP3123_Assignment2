import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for styling

export const LandingPage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate('/login');  // Navigate to login page
    };

    const handleSignupClick = () => {
        navigate('/signup');  // Navigate to signup page
    };

    return (
        <div className="container d-flex justify-content-center align-items-center vh-100">
            <div className="card shadow-lg p-5" style={{ width: '30rem' }}>
                <h2 className="text-center text-primary mb-4">Welcome to the Dashboard</h2>
                <div className="text-center">
                    <button 
                        className="btn btn-primary mb-3" 
                        onClick={handleLoginClick} 
                        style={{ width: '100%' }}>
                        Login
                    </button>
                    <br />
                    <button 
                        className="btn btn-secondary" 
                        onClick={handleSignupClick} 
                        style={{ width: '100%' }}>
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};
