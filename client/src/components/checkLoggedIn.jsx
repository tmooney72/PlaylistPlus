// ./components/checkLoggedIn.jsx
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';

const ProtectedRoute = () => {
  const user = localStorage.getItem('user');
  console.log('ProtectedRoute user:', user); // Debug: See what you get in the console
  return user ? <Outlet /> : <Navigate to="/Login" replace />;
};

export default ProtectedRoute;