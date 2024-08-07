import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import apiClient from '../admin/axiosSetup';
import LogIn from '../pages/log-in';

const PrivateRoute = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const location = useLocation();

  useEffect(() => {
    const getQueryParam = (param) => new URLSearchParams(location.search).get(param);
    const accessTokenFromUrl = getQueryParam('accessToken');
    const refreshTokenFromUrl = getQueryParam('refreshToken');

    if (accessTokenFromUrl && refreshTokenFromUrl) {
      localStorage.setItem('accessToken', accessTokenFromUrl);
      localStorage.setItem('refreshToken', refreshTokenFromUrl);
      setIsAuthenticated(true);
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
        setIsAuthenticated(response.status === 201);
      } catch (error) {
        console.error('Token validation failed', error);
        setIsAuthenticated(false);
      }
    };

    validateToken();
  }, [location.search]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to={"/"}/>;
};

export default PrivateRoute;
