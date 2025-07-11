import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert, Card } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({});
    const [showAlert, setShowAlert] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email is invalid';
        }

        if (!formData.password) {
            newErrors.password = 'Password is required';
        }

        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const newErrors = validateForm();
        
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setIsLoading(true);

        // Simulate API call delay
        setTimeout(() => {
            // Check user credentials
            const existingUsers = JSON.parse(localStorage.getItem('movieAppUsers') || '[]');
            const user = existingUsers.find(
                user => user.email === formData.email && user.password === formData.password
            );

            if (user) {
                // Save current user session
                const userSession = {
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    loginTime: new Date().toISOString()
                };
                
                localStorage.setItem('movieAppCurrentUser', JSON.stringify(userSession));
                
                setAlertMessage('Login successful! Redirecting...');
                setShowAlert(true);
                
                // Redirect to home page after 1.5 seconds
                setTimeout(() => {
                    navigate('/');
                }, 1500);
            } else {
                setAlertMessage('Invalid email or password. Please try again.');
                setShowAlert(true);
            }
            
            setIsLoading(false);
        }, 1000);
    };

    return (
        <Container className="mt-5">
            <Row className="justify-content-center">
                <Col md={6} lg={4}>
                    <Card className="shadow">
                        <Card.Body className="p-4">
                            <h2 className="text-center mb-4" style={{ color: '#2c3e50' }}>
                                Welcome Back
                            </h2>
                            
                            {showAlert && (
                                <Alert 
                                    variant={alertMessage.includes('successful') ? 'success' : 'danger'}
                                    onClose={() => setShowAlert(false)} 
                                    dismissible
                                >
                                    {alertMessage}
                                </Alert>
                            )}

                            <Form onSubmit={handleSubmit}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        isInvalid={!!errors.email}
                                        placeholder="Enter your email"
                                        disabled={isLoading}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.email}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-4">
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        isInvalid={!!errors.password}
                                        placeholder="Enter your password"
                                        disabled={isLoading}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {errors.password}
                                    </Form.Control.Feedback>
                                </Form.Group>

                                <Button
                                    type="submit"
                                    className="w-100 mb-3"
                                    style={{ backgroundColor: '#2c3e50', border: 'none' }}
                                    size="lg"
                                    disabled={isLoading}
                                >
                                    {isLoading ? 'Signing in...' : 'Sign In'}
                                </Button>
                            </Form>

                            <div className="text-center">
                                <p className="mb-0">
                                    Don't have an account?{' '}
                                    <Link to="/register" style={{ color: '#2c3e50' }}>
                                        Create one here
                                    </Link>
                                </p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;