// src/apiClient.js
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

// const {logout} = useContext(AuthContext);

// Create an Axios instance
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Replace with your API URL
  //withCredentials: true, // Allow cookies to be sent with requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to include access token
apiClient.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem('accessToken');
  const refreshToken = localStorage.getItem('refreshToken');
  if (accessToken && refreshToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
    config.headers.refreshToken = `${refreshToken}`;
  }
  return config;
});

// Response interceptor to handle token refreshing and 401 errors
apiClient.interceptors.response.use(
  (response) => {
    console.log(`response from interceptor ${response}`)
    // Check if a new access token is provided in headers
    const newAccessToken = response.headers.get('accessToken');
    const newRefreshToken = response.headers.get('refreshToken');
    if (newAccessToken) {
      localStorage.setItem('accessToken', newAccessToken);
      localStorage.setItem('refreshToken', newRefreshToken);
    }

    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Clear tokens and redirect to the home page
      localStorage.clear();
      sessionStorage.clear();
      // localStorage.removeItem('refreshToken');
      // logout();
      // window.location.href = '/'; // Redirect to home page
    }
    return Promise.reject(error);
  }
);

export default apiClient;
