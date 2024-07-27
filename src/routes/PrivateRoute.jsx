// src/components/PrivateRoute.js
import React, { useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";


const PrivateRoute = ({ children }) => {
  const { getCookie, logout } = useContext(AuthContext)
  const accessToken = getCookie('accessToken');
  console.log(`access token: ${accessToken}`);
  const navigate = useNavigate();

  if (!accessToken) {
    navigate("/")
    logout();
  }

  return children;
};

export default PrivateRoute;
