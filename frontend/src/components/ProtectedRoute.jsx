import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { getToken, tokenIsValid } from '../utils/auth';

const ProtectedRoute = ({ children }) => {
  const token = getToken();
  const location = useLocation();

  if (!token || !tokenIsValid(token)) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
