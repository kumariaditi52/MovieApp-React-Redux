import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const currentUser = JSON.parse(localStorage.getItem('movieAppCurrentUser'));
    
    if (!currentUser) {
        return <Navigate to="/login" replace />;
    }
    
    return children;
};

export default ProtectedRoute;