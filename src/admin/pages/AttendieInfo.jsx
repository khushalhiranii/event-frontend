// src/components/AttendieInfo.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRegisteredUsers } from '../context/RegisteredUsersContext';

const AttendieInfo = () => {
  const { attendieId } = useParams();
  const { registeredUsers } = useRegisteredUsers();
  const [attendie, setAttendie] = useState(null);

  useEffect(() => {
    const user = registeredUsers.find(user => user.id === parseInt(attendieId, 10));
    setAttendie(user);
  }, [registeredUsers, attendieId]);

  const handlePrint = () => {
    window.print();
  };

  if (!attendie) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Attendie Info</h1>
      <div className="mb-4">
        <p><strong>Name:</strong> {attendie.userName}</p>
        <p><strong>Phone No.:</strong> {attendie.phoneNo}</p>
        <p><strong>Mode of Registration:</strong> {attendie.modeOfRegistration}</p>
      </div>
      <button onClick={handlePrint} className="bg-blue-500 text-white py-2 px-4 rounded">Print</button>
    </div>
  );
};

export default AttendieInfo;
