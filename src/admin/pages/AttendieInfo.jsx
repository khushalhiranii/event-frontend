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
  }, [attendieId]);

  const handlePrint = () => {
    window.print();
  };

  if (!attendie) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Attendie Info</h1>
      <div className="no-print">
        {/* Non-printable content, like buttons */}
        <button onClick={handlePrint} className="bg-blue-500 text-white py-2 px-4 rounded">Print</button>
      </div>
      <div className="print-container">
        <h1 className="print-title">Attendie Information</h1>
        <p className="print-detail"><strong>Name:</strong> {attendie.userName}</p>
        <p className="print-detail"><strong>Phone No.:</strong> {attendie.phoneNo}</p>
        <p className="print-detail"><strong>Mode of Registration:</strong> {attendie.modeOfRegistration}</p>
      </div>
    </div>
  );
};

export default AttendieInfo;
