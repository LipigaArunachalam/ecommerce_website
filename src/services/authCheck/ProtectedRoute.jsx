import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRole }) => {
    const userRole = localStorage.getItem("role");

    if (!userRole) {
        // Not logged in
        return <Navigate to="/" replace />;
    }

    if (allowedRole && userRole !== allowedRole) {
        // Unauthorized role
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
