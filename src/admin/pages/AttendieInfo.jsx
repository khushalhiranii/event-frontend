import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRegisteredUsers } from '../context/RegisteredUsersContext';
import ReactToPrint from 'react-to-print';
import '../styles/AttendieInfo.css';

const AttendieInfo = () => {
  const { attendieId } = useParams();
  const { registeredUsers } = useRegisteredUsers();
  const [attendie, setAttendie] = useState(null);
  const [formValues, setFormValues] = useState([]);
  const componentRef = useRef();

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

  if (!attendie) return <p>Loading...</p>;

  return (
    <div className="attendie-info-container p-4">
      <h1 className="text-xl font-bold mb-4">Attendee's Info</h1>
      <div className="no-print">
        {/* Non-printable content, like buttons */}
        <ReactToPrint
          trigger={() => (
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Print
            </button>
          )}
          content={() => componentRef.current}
        />
      </div>
      <div className="print-container" ref={componentRef}>
        <div className="print-detail mt-4">
          <h2 className="label text-lg font-semibold mb-2">Form Values:</h2>
          <div className="form-values-list">
            {formValues.map((field, index) => (
              <div key={index} className="form-value-item">
                <strong className="label">{field.label}:</strong> <span className="value">{field.value}</span>
              </div>
            ))}
          </div>
        </div>
        <img src={attendie.QR} alt="QR Code" />
      </div>
    </div>
  );
};

export default AttendieInfo;
