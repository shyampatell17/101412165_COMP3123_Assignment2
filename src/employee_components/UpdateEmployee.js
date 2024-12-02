import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import apiClient from '../apiClient';

export const UpdateEmployee = () => {
    const { id } = useParams(); // Get the employee ID from the URL
    const navigate = useNavigate(); // Hook for navigation
    const [updateEmployee, setUpdateEmployee] = useState(null);
    const [loading, setLoading] = useState(true); // State to track loading
    const [error, setError] = useState(null);

    // Fetch the employee details on component mount
    useEffect(() => {
        const fetchEmployee = async () => {
            try {
                const response = await apiClient.get(`/api/v1/emp/employees/${id}`);
                setUpdateEmployee(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching employee:', error);
                setError(error.response?.data?.message || 'Failed to load employee details.');
                setLoading(false); // Turn off loading on error
            }
        };
        fetchEmployee();
    }, [id]); // Fetch data every time the ID changes

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await apiClient.put(`/api/v1/emp/employees/${id}`, updateEmployee, {
                headers: { Authorization: `Bearer ${token}` },
            });
            alert('Employee updated successfully!');
            navigate("/employeelist"); // After updating, redirect to the employee list
        } catch (error) {
            console.error('Error updating employee:', error);
            alert('Failed to update employee. Please try again.');
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setUpdateEmployee((prev) => ({ ...prev, [name]: value }));
    };

    if (loading) {
        return <p>Loading employee details...</p>;
    }

    if (error) {
        return <p className="text-danger">{error}</p>;
    }

    if (!updateEmployee) {
        return <p>No employee data available.</p>; // Ensure employee is not null
    }

    return (
        <div className="container">
            <h1>Update Employee</h1>
            <form onSubmit={handleSubmit} className="mt-4">
                <div className="form-group">
                    <label>First Name:</label>
                    <input
                        type="text"
                        name="first_name"
                        value={updateEmployee.first_name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Last Name:</label>
                    <input
                        type="text"
                        name="last_name"
                        value={updateEmployee.last_name}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Email:</label>
                    <input
                        type="email"
                        name="email"
                        value={updateEmployee.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Position:</label>
                    <input
                        type="text"
                        name="position"
                        value={updateEmployee.position}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Salary:</label>
                    <input
                        type="number"
                        name="salary"
                        value={updateEmployee.salary}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="form-group">
                    <label>Department:</label>
                    <input
                        type="text"
                        name="department"
                        value={updateEmployee.department}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>

                <div className="mt-4">
                  <button type="submit" className="btn btn-primary" style={{ marginRight: '10px' }}>
                      Update Employee
                  </button>
                  <button type="button" onClick={() => navigate('/employeelist')} className="btn btn-secondary" style={{ marginLeft: '10px' }}>
                      Cancel
                  </button>
                </div>

            </form>
        </div>
    );
};
