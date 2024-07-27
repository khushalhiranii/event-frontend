// src/components/PrivateRoute.js
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { getCookie } = useContext(AuthContext);
  const accessToken = getCookie('accessToken');

  if (!accessToken) {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PrivateRoute;
