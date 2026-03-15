import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useLogout from '../../Components/pages/auth/Logout';

const ProtectedRoute = ({ allowedRole }) => {
    const userRole = localStorage.getItem("role");
    const { handleLogout } = useLogout();

    if (!userRole) {
        return <Navigate to="/" replace />;

    }

    if (allowedRole && userRole !== allowedRole) {
        localStorage.clear();
        handleLogout();
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
