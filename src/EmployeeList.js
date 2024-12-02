import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap styles
import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import apiClient from './apiClient'; // Import the configured Axios instance

export const EmployeeList = () => {
    const [employeelist, setEmployeeList] = useState([]); // To store the employee state
    const [error, setError] = useState(null); // State for error handling (optional)
    const [searchParams, setSearchParams] = useState({ department: '', position: '' });
    const navigate = useNavigate();

    const positions = ['Positions','HR', 'Manager', 'Employee', 'Intern']; // Predefined options

    // useEffect hook to fetch employees when the component mounts
    useEffect(() => {
        const fetchEmployees = async () => {
            try {
                const token = localStorage.getItem('token'); // assuming 'token' is already stored in localStorage
                const response = await apiClient.get('/api/v1/emp/employees', {
                    headers: { Authorization: `Bearer ${token}` }, // Authenticating the user with the backend server
                });

                setEmployeeList(response.data); // Update the state component
            } catch (error) {
                console.log("Error occurred while fetching employees: ", error);
                setError(error.message); // set the error in state
            }
        };

        // Fetch employee data when component mounts
        fetchEmployees();
    }, []); // It runs only once because there is no dependencies specified

    // Handle a Delete action
    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token'); // Get the token from the localStorage
            const response = await apiClient.delete(`/api/v1/emp/employees/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            setEmployeeList(employeelist.filter((employee) => employee._id !== id)); // Remove the deleted employee from the list
            alert('Employee deleted successfully!');
        } catch (err) {
            console.error('Error deleting employee:', err);
            alert('Failed to delete the employee.');
        }
    };

    // Handle search form submission
    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const query = new URLSearchParams(searchParams).toString();
            const response = await apiClient.get(`/api/v1/emp/employee/search?${query}`);
            setEmployeeList(response.data);
        } catch (err) {
            console.error('Error searching employees:', err);
            setError('Failed to search employees.');
        }
    };

    const handleRefresh = async () => {
        try {
            setSearchParams({ department: '', position: '' });
            const response = await apiClient.get('/api/v1/emp/employees');
            setEmployeeList(response.data); // Update the table with all employees
        } catch (error) {
            console.error('Error refreshing employee list:', error);
            alert('Failed to refresh employee list.');
        }
    };

    // Handle input changes in the search form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchParams((prev) => ({ ...prev, [name]: value }));
    };

    const handleAddButton = () => {
        navigate('/employees/AddEmployee');
    };

    // Handle a View Action
    const handleView = (id) => {
        navigate(`/employees/${id}`); // Navigate to View by Id Page
    };

    // Handle a Update Action
    const HandleUpdate = (id) => {
        navigate(`/employees/${id}/UpdateEmployee`);
    };

    // Handle Logout Action
    const handleLogout = () => {
        localStorage.removeItem('token'); 
        navigate('/'); 
    };
    return (
        <div className="container my-4">
            {/* Add Employee Button */}
            <div className="mb-3">
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleAddButton}
                    className="me-2">
                    Add Employee
                </Button>

                <Button 
                    variant="contained" 
                    className="logout-button" 
                    onClick={handleLogout}>
                    Logout
                </Button>
            </div>

            {/* Search Form */}
            <form onSubmit={handleSearch} className="mb-4">
                <div className="row">
                    <div className="col-md-4 mb-3">
                        <label>Department:</label>
                        <input
                            type="text"
                            name="department"
                            value={searchParams.department}
                            onChange={handleInputChange}
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-4 mb-3">
                        <label>Position:</label>
                        <select 
                            name="position" 
                            value={searchParams.position} 
                            onChange={handleInputChange} 
                            className="form-select">
                            {positions.map((pos) => (
                                <option key={pos} value={pos}>
                                    {pos}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="col-md-4 mb-3 d-flex align-items-end">
                        <button type="submit" className="btn btn-primary me-2">
                            Search
                        </button>
                        <button 
                            type="button" 
                            onClick={handleRefresh} 
                            className="btn btn-secondary">
                            Reset
                        </button>
                    </div>
                </div>
            </form>

            {error && <p className="text-danger">{error}</p>}

            <h2>Employee Dashboard</h2>

            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>

                <tbody>
                    {employeelist.map((employee) => (
                        <tr key={employee._id}>
                            <td>{employee.first_name}</td>
                            <td>{employee.last_name}</td>
                            <td>{employee.email}</td>
                            <td>
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => handleView(employee._id)}
                                    className="me-2"
                                >
                                    View
                                </Button>
                                <Button
                                    variant="contained"
                                    color="btn-light"
                                    onClick={() => HandleUpdate(employee._id)}
                                    className="me-2"
                                >
                                    Update
                                </Button>
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDelete(employee._id)}
                                >
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
