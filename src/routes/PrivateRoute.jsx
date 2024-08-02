// src/components/PrivateRoute.jsx
import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import apiClient from '../admin/axiosSetup';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    // Helper function to get URL parameters
    const getQueryParam = (param) => {
      return new URLSearchParams(location.search).get(param);
    };

    // Extract tokens from URL, if present
    const accessTokenFromUrl = getQueryParam('accessToken');
    const refreshTokenFromUrl = getQueryParam('refreshToken');

    // If tokens are present in the URL, store them in localStorage
    if (accessTokenFromUrl && refreshTokenFromUrl) {
      localStorage.setItem('accessToken', accessTokenFromUrl);
      localStorage.setItem('refreshToken', refreshTokenFromUrl);
      setIsAuthenticated(true); // Assume authentication success when tokens are stored
      return;
    }

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
  }, [location.search]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>; // or a loading spinner
  }

  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;
