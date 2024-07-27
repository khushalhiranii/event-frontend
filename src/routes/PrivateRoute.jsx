// src/components/PrivateRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


const PrivateRoute = ({ children }) => {
  const { getCookie, logout } = useContext(AuthContext)
  const accessToken = getCookie('accessToken');

  if (!accessToken) {
    logout();
    return <Navigate to="/" />;
  }

  return children;
};

export default PrivateRoute;
