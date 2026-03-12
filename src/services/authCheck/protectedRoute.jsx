import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ allowedRole }) => {
    const userRole = localStorage.getItem("role");

    if (!userRole) {
        return <Navigate to="/" replace />;
    }

    if (allowedRole && userRole !== allowedRole) {

        if (userRole === "seller") return <Navigate to="/seller-layout" replace />
        if (userRole === "customer") return <Navigate to="/customer-layout" replace />
        if (userRole === "admin") return <Navigate to="/admin" replace />
    }

    return <Outlet />;
};

export default ProtectedRoute;
