import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../admin/axiosSetup';

const PublicRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      setIsAuthenticated(false);
      return;
    }

    const validateToken = async () => {
      try {
        const response = await apiClient.get(`/auth/validate`);

        if (response.status === 201) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Token validation failed', error);
        setIsAuthenticated(false);
      }
    };

    validateToken();
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return isAuthenticated ? <Navigate to="/dashboard" /> : children;
};

export default PublicRoute;
