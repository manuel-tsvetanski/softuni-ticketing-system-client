import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

function ProtectedRoute({ children, isAuthRequired = true, redirectTo }) {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  if (isAuthRequired && !isAuthenticated) {
    return <Navigate to={redirectTo} />;
  }

  if (!isAuthRequired && isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return children;
}

ProtectedRoute.propTypes = {
  children: PropTypes.node.isRequired,
  isAuthRequired: PropTypes.bool,
  redirectTo: PropTypes.string.isRequired,
};

export default ProtectedRoute;
