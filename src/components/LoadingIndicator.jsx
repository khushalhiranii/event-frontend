// src/components/LoadingIndicator.js
import React from 'react';
import { useLoading } from '../context/Loadingcontext';
import '../css/LoadingIndicator.css'

const LoadingIndicator = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  return (
    <div className="loading-indicator">
      <div className="spinner"></div>
    </div>
  );
};

export default LoadingIndicator;
