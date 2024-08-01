// src/context/RegisteredUsersContext.js
import React, { createContext, useContext, useEffect, useState } from 'react';
import apiClient from '../axiosSetup';

const RegisteredUsersContext = createContext();

export const useRegisteredUsers = () => useContext(RegisteredUsersContext);

export const RegisteredUsersProvider = ({ children }) => {
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchRegisteredUsers = async (eventId) => {
    try {
      setLoading(true);
      const response = await apiClient.get(`/admin/event/users/${eventId}`);
      setRegisteredUsers(response.data.data);
      console.log(response.data.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch registered users.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <RegisteredUsersContext.Provider value={{ registeredUsers, fetchRegisteredUsers, loading, error }}>
      {children}
    </RegisteredUsersContext.Provider>
  );
};
