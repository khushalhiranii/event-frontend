import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import apiClient from '../axiosSetup';

const Registration = () => {
  const { id } = useParams(); // Extract `id` from query parameters
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRegisteredUsers = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get(`/admin/event/users/${id}`); // Replace with your API endpoint
        console.log(response)
        setRegisteredUsers(response.data.data);
      } catch (err) {
        setError('Failed to fetch registered users');
      } finally {
        setLoading(false);
      }
    };

    fetchRegisteredUsers();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Registered Users</h1>
      {registeredUsers.length === 0 ? (
        <p>No registered users found.</p>
      ) : (
        <ul>
          {registeredUsers.map((user) => (
            <li key={user.id} className="border-b py-2">
              <p><strong>Name:</strong> {user.userName}</p>
              <p><strong>Phone:</strong> {user.phoneNo}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Registration;
