// src/components/AgentList.js
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAgents } from '../context/AgentContext';
import '../styles/AgentList.css';

const AgentList = () => {
  const { agents, fetchAgents, deleteAgent } = useAgents();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAgents();
  }, [agents])
  

  return (
    <div className="agent-list">
      <h1>Agents</h1>
      <button onClick={() => navigate('/dashboard/employees/add')}>Add Agent</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Phone Number</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {agents.map((agent) => (
            <tr key={agent.id}>
              <td>{agent.name}</td>
              <td>{agent.phoneNo}</td>
              <td>{agent.loginId}</td>
              <td>
                <button onClick={() => navigate(`/dashboard/employees/edit/${agent.id}`)}>Edit</button>
                <button onClick={() => deleteAgent(agent.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentList;
