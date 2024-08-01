// src/components/AttendieInfo.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRegisteredUsers } from '../context/RegisteredUsersContext';
import '../styles/AttendieInfo.css'; // Ensure you create this CSS file

const AttendieInfo = () => {
  const { attendieId } = useParams();
  const { registeredUsers } = useRegisteredUsers();
  const [attendie, setAttendie] = useState(null);
  const [formValues, setFormValues] = useState([]);

  useEffect(() => {
    const user = registeredUsers.find(user => user.id === parseInt(attendieId, 10));
    setAttendie(user);

    if (user && user.formValues) {
      const formValueEntries = Object.values(user.formValues).map(field => ({
        label: field.label,
        value: field.value,
      }));
      setFormValues(formValueEntries);
    }
  }, [attendieId, registeredUsers]);

  const handlePrint = () => {
    window.print();
  };

  if (!attendie) return <p>Loading...</p>;

  return (
    <div className="attendie-info-container p-4">
      <h1 className="text-xl font-bold mb-4">Attendie Info</h1>
      <div className="no-print">
        <button onClick={handlePrint} className="bg-blue-500 text-white py-2 px-4 rounded">Print</button>
      </div>
      <div className="print-container">
        {/* <h1 className="print-title">Attendie Information</h1>
        <p className="print-detail"><strong>Name:</strong> {attendie.userName}</p>
        <p className="print-detail"><strong>Phone No.:</strong> {attendie.phoneNo}</p>
        <p className="print-detail"><strong>Mode of Registration:</strong> {attendie.modeOfRegistration}</p> */}
        <div className="print-detail mt-4">
          <h2 className="text-lg font-semibold mb-2">Form Values:</h2>
          <div className="form-values-list">
            {formValues.map((field, index) => (
              <div key={index} className="form-value-item">
                <strong>{field.label}:</strong> {field.value}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendieInfo;
