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
  }, [])
  

  return (
    <div className="agent-list">
      <h1>Agents</h1>
      <button onClick={() => navigate('/dashboard/employees/add')}>Add Agent</button>
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
          {agents.map((agent) => (
            <tr key={agent.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
            <td className="w-4 p-4">
              <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
            </td>
            <td className="px-6 py-4">{agent.name}</td>
            <td className="px-6 py-4">{agent.phoneNo}</td>
            <td className="px-6 py-4">{agent.loginId}</td>
              <td>
                <div className='flex flex-row'>
                <button onClick={() => navigate(`/dashboard/employees/edit/${agent.id}`)}>Edit</button>
                <button onClick={() => deleteAgent(agent.id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AgentList;
