// src/components/Registration.jsx
import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRegisteredUsers } from '../context/RegisteredUsersContext';

const Registration = () => {
  const { id } = useParams();
  const { registeredUsers, fetchRegisteredUsers, loading, error } = useRegisteredUsers();
  const navigate = useNavigate();

  useEffect(() => {
    fetchRegisteredUsers(id);
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Registered Users</h1>
      {registeredUsers.length === 0 ? (
        <p>No registered users found.</p>
      ) : (
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-4">
                <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
              </th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Phone No.</th>
              <th className="px-6 py-3">Mode</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {registeredUsers.map((user) => (
              <tr key={user.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                <td className="w-4 p-4">
                  <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
                </td>
                <td className="px-6 py-4">{user.userName}</td>
                <td className="px-6 py-4">{user.phoneNo}</td>
                <td className="px-6 py-4">{user.modeOfRegistration}</td>
                <td className="px-6 py-4">
                  <button onClick={() => navigate(`/dashboard/registered/${id}/${user.id}`)} className="text-blue-600 bg-white hover:underline">
                    View
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Registration;
