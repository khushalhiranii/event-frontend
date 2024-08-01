// import React, { useEffect, useState } from "react";
// import { Navigate } from "react-router-dom";
// import axios from "axios";

// const PublicRoute = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const validateToken = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/validate`, {
//           withCredentials: true,
//         });

//         if (response.status === 200) {
//           setIsAuthenticated(true);
//         } else {
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         console.error('Token validation failed', error);
//         setIsAuthenticated(false); // Consider the user unauthenticated on failure
//       }
//     };

//     validateToken();
//   }, []);

//   if (isAuthenticated === null) {
//     // Optionally, you can return a loading indicator here
//     return <div>Loading...</div>;
//   }

//   if (isAuthenticated) {
//     return <Navigate to="/dashboard" />;
//   }

//   return children;
// };

// export default PublicRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
  // Check if accessToken exists in localStorage
  const accessToken = localStorage.getItem('accessToken');

  // If accessToken is not present, redirect to home page
  if (!accessToken) {
    return children;
  }

  // If accessToken is present, render the children components
  return <Navigate to="/dashboard" />;
  
};

export default PublicRoute;