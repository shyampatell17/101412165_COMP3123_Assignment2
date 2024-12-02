import React, { useState } from 'react';
import apiClient from '../apiClient';
import { useNavigate } from 'react-router-dom';

export const AddEmployee = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState('Employee'); 
    const [salary, setSalary] = useState("");
    const [dateOfJoining, setDateOfJoining] = useState("");
    const [department, setDepartment] = useState("");
    const [success, setSuccess] = useState(null);

    const positions = ['HR', 'Manager', 'Employee', 'Intern']; // Predefined options

    const navigate = useNavigate(); // Hook for navigation

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccess(null);

        const employeeData = {
            first_name: firstname,
            last_name: lastname,
            email: email,
            position: position,
            salary: salary,
            date_of_joining: dateOfJoining, 
            department: department,
        };

        try {
            // Retrieve the token from local Storage
            const token = localStorage.getItem('token');

            // Axios to make POST Request
            const response = await apiClient.post('/api/v1/emp/employees', employeeData, {
                headers: { Authorization: `Bearer ${token}`},
            });

            console.log("Employee added:", response.data);

            // Update the State to clear the form
            setFirstname("");
            setLastname("");
            setEmail("");
            setPosition("Employee");
            setSalary("");
            setDepartment("");

            setSuccess("Employee added successfully!");

        } catch (error) {
            console.log("Error: ", error.message);
        }
    }

    const handleCancel = () => {
        navigate(-1); // Go back to the previous page
    };

    return (
        <div className="container mt-4">
            <h2 className="mb-4">Add Employee</h2>

            {success && <p className="text-success">{success}</p>}

            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
                <div className="mb-3">
                    <label className="form-label">First Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Last Name:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Email:</label>
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Position:</label>
                    <select
                        className="form-select"
                        value={position}
                        onChange={(e) => setPosition(e.target.value)}
                    >
                        {positions.map((pos) => (
                            <option key={pos} value={pos}>
                                {pos}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="mb-3">
                    <label className="form-label">Salary:</label>
                    <input
                        type="number"
                        className="form-control"
                        value={salary}
                        onChange={(e) => setSalary(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Date of Joining:</label>
                    <input
                        type="date"
                        className="form-control"
                        value={dateOfJoining}
                        onChange={(e) => setDateOfJoining(e.target.value)}
                        required
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Department:</label>
                    <input
                        type="text"
                        className="form-control"
                        value={department}
                        onChange={(e) => setDepartment(e.target.value)}
                        required
                    />
                </div>

                <div className="mt-4">
                    <button type="submit" className="btn btn-primary me-3">
                        Add Employee
                    </button>
                    <button type="button" className="btn btn-secondary" onClick={handleCancel}>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};
