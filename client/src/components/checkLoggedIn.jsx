// ./components/checkLoggedIn.jsx
import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
// import useIsAuthed from '@/hooks/useIsAuthed';

const ProtectedRoute = () => {
  const user = localStorage.getItem('user');
  const timeStamp = localStorage.getItem('userTimeStamp');
  const currentTime = Date.now();
  if (user && timeStamp && currentTime - timeStamp > 3600000) {
    localStorage.clear();
    return <Navigate to="/Login" replace />;
  }
  return user ? <Outlet /> : <Navigate to="/Login" replace />;
};

export default ProtectedRoute;