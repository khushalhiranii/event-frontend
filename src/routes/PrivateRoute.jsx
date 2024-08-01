// import React, { useEffect, useState } from 'react';
// import { Navigate } from 'react-router-dom';
// import axios from 'axios';

// const PrivateRoute = ({ children }) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const validateToken = async () => {
//       try {
//         const response = await axios.get(`${import.meta.env.VITE_API_URL}/auth/validate`, {
//           withCredentials: true,
//         });
//         console.log(response.data.data)
        
//         if (response.status === 201) {
//           setIsAuthenticated(true);
//         }
//       } catch (error) {
//         console.error('Token validation failed', error);
//         setIsAuthenticated(false);
//       }
//     };

//     validateToken();
//   }, []);

//   if (isAuthenticated === null) {
//     return <div>Loading...</div>; // or a loading spinner
//   }

//   return isAuthenticated ? children : <Navigate to="/" />;
// };

// export default PrivateRoute;


import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
  // Check if accessToken exists in localStorage
  const accessToken = localStorage.getItem('accessToken');

  // If accessToken is not present, redirect to home page
  if (!accessToken) {
    return <Navigate to="/" />;
  }

  // If accessToken is present, render the children components
  return children;
};

export default PrivateRoute;
