import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AssignAgent.css'; // Import the CSS file
import apiClient from '../axiosSetup';

const AssignAgent = () => {
  const { eventId } = useParams();
  const [employees, setEmployees] = useState([]);
  const [originalFlags, setOriginalFlags] = useState({});
  const [changedFlags, setChangedFlags] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    apiClient.get(`/admin/employee/event/${eventId}`)
      .then(response => {
        console.log(response)
        const employeesData = response.data.data;
        setEmployees(employeesData);
        // Store the original flags
        const flags = employeesData.reduce((acc, employee) => {
          acc[employee.id] = employee.flag;
          return acc;
        }, {});
        setOriginalFlags(flags);
      })
      .catch(error => console.error('Error fetching employees:', error));
  }, [eventId]);

  const handleCheckboxChange = (employeeId) => {
    setEmployees(prevEmployees =>
      prevEmployees.map(employee =>
        employee.id === employeeId
          ? { ...employee, flag: !employee.flag }
          : employee
      )
    );

    setChangedFlags(prevChangedFlags => ({
      ...prevChangedFlags,
      [employeeId]: !originalFlags[employeeId],
    }));
  };

  const handleSubmit = () => {
    const changedEmployeeData = employees.filter(employee =>
      changedFlags[employee.id] !== undefined
    ).map(employee => ({
      id: employee.id,
      flag: employee.flag,
    }));

    console.log(changedEmployeeData)

    apiClient.post(`/admin/employee/event/${eventId}`, { employees: JSON.stringify(changedEmployeeData) })
      .then((response) => {
        console.log(response);
        alert('Agents assigned successfully');
        navigate('/dashboard');
      })
      .catch(error => console.error('Error assigning agents:', error));
  };

  return (
    <div className="assign-agent-container">
      <h1>Assign Agents to Event</h1>
      <ul className="employee-list">
        {employees.map(employee => (
          <li key={employee.id} className="employee-item">
            <label>
              <input
                type="checkbox"
                checked={employee.flag}
                onChange={() => handleCheckboxChange(employee.id)}
              />
              {employee.name}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} className="assign-button">
        Assign Selected Agents
      </button>
    </div>
  );
};

export default AssignAgent;
