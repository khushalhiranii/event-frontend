// src/components/PublicRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const accessToken = localStorage.getItem("accessToken");

  if (accessToken) {
    return <Navigate to="/dashboard" />;
  }

  return children;
};

export default PublicRoute;
