import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import apiClient from '../apiClient';
import { Button, Card } from 'react-bootstrap';

export const ViewById = () => {

    const { id } = useParams(); // Get the ID from the URL
    const [viewemp, setviewEmp] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEmployeeId = async () => {
            try {
                console.log(`Fetching details for employee ID: ${id}`);
                const response = await apiClient.get(`/api/v1/emp/employees/${id}`);
                console.log('API Response:', response.data); 
                console.log(response.status);

                setviewEmp(response.data); 
                setLoading(false); 

            } catch (err) {
                setError(err.message);
                setLoading(false); 
            }
        };

        fetchEmployeeId();

    }, [id]);

    if (loading) {
        return <p>Loading employee details...</p>;
    }

    if (error) {
        return <p className="text-danger">Error: {error}</p>;
    }

    if (!viewemp) {
        return <p>No employee details found.</p>;
    }

    return (
        <div className="container mt-5">
            <h1 className="mb-4 text-center">Employee Details</h1>

            <Card className="shadow-lg">
                <Card.Body>
                    <div className="row">
                        <div className="col-md-6">
                            <h5><strong>First Name:</strong> {viewemp.first_name}</h5>
                            <h5><strong>Last Name:</strong> {viewemp.last_name}</h5>
                            <h5><strong>Email:</strong> {viewemp.email}</h5>
                        </div>

                        <div className="col-md-6">
                            <h5><strong>Department:</strong> {viewemp.department}</h5>
                            <h5><strong>Position:</strong> {viewemp.position}</h5>
                            <h5><strong>Salary:</strong> ${viewemp.salary}</h5>
                            <h5><strong>Date of Joining:</strong> {new Date(viewemp.date_of_joining).toLocaleDateString()}</h5>
                        </div>
                    </div>

                    <div className="text-center mt-4">
                        <Button variant="outline-primary" href="/employeelist" className="me-2">
                            Back to Employee List
                        </Button>
                        <Button variant="warning" href={`/employees/${viewemp._id}/UpdateEmployee`}>
                            Update Employee
                        </Button>
                    </div>
                </Card.Body>
            </Card>
        </div>
    );
};
