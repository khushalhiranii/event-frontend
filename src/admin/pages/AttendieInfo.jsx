import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useRegisteredUsers } from '../context/RegisteredUsersContext';
import ReactToPrint from 'react-to-print';
import '../styles/AttendieInfo.css';
import DefaultInput from '../DesignSystem/DefaultInput';

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
    <div className=' p-4'>
    <div className="attendie-info-container flex flex-row justify-between mb-[16px]">
      <div className="text-sm font-semibold flex items-center">Attendee Details</div>
      <div className="no-print">
        {/* Non-printable content, like buttons */}
        <ReactToPrint
          trigger={() => (
            <button className="bg-blue-500 text-white py-2 px-4 rounded">
              Print
            </button>
          )}
          content
          ={() => componentRef.current}
        />
      </div>
      </div>
      <div className="print-container w-[50%]" ref={componentRef}>
        <div className="print-detail">
          <div className="label text-lg font-semibold mb-[16px]">Form Fields</div>
          <div className="form-values-list">
            {formValues.map((field, index) => (
              <div key={index} className="form-value-item mb-[16px] mr-[16px]">
                <div className="label mb-[4px] text-base">{field.label}</div>
                <DefaultInput 
                img={'/user1.svg'}
                value={field.value}
                />
              </div>
            ))}
          </div>
        </div>
        <div className="label mb-[4px] text-lg font-bold">QR Code</div>
        <img src={attendie.QR} alt="QR Code" />
      </div>
    </div>
  );
};

export default AttendieInfo;
