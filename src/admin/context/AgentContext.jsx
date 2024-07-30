// src/context/AgentContext.js
import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import apiClient from '../axiosSetup';

const AgentContext = createContext();

export const useAgents = () => useContext(AgentContext);

export const AgentProvider = ({ children }) => {
  const [agents, setAgents] = useState([]);

  // Fetch all agents from the backend
  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await apiClient.get('/admin/employee');
        console.log(`Agents ${response}`)
        setAgents(response.data.data);
      } catch (error) {
        console.error('Failed to fetch agents:', error);
      }
    };

    fetchAgents();
  }, []);

  // Add a new agent
  const addAgent = async (agent) => {
    try {
        console.log(`Add agent ${agent}`)
      const response = await apiClient.post('/admin/employee/register', agent);
      console.log(`Add agent response ${response}`)
      setAgents([...agents, response.data]);
    } catch (error) {
      console.error('Failed to add agent:', error);
    }
  };

  // Edit an existing agent
  const editAgent = async (updatedAgent) => {
    try {
        console.log(`Updated agent ${updatedAgent}`)
        const response = await apiClient.put(`/admin/employee/${updatedAgent.id}`, updatedAgent);
      console.log(`Updated agent response ${response}`)
      setAgents((prevAgents) =>
        prevAgents.map((agent) =>
          agent.id === updatedAgent.id ? updatedAgent : agent
        )
      );
    } catch (error) {
      console.error('Failed to edit agent:', error);
    }
  };

  // Delete an agent
  const deleteAgent = async (id) => {
    try {
      const response = await apiClient.delete(`/admin/employee/${id}`);
      console.log(response);
      setAgents((prevAgents) => prevAgents.filter((agent) => agent.id !== id));
    } catch (error) {
      console.error('Failed to delete agent:', error);
    }
  };

  return (
    <AgentContext.Provider
      value={{ agents, addAgent, editAgent, deleteAgent }}
    >
      {children}
    </AgentContext.Provider>
  );
};
