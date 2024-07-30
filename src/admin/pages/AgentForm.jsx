// src/components/AgentForm.js
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAgents } from '../context/AgentContext';
import '../styles/AgentForm.css';

const AgentForm = () => {
  const { addAgent, editAgent, agents } = useAgents();
  const { id } = useParams();
  const navigate = useNavigate();

  const [agent, setAgent] = useState({
    name: '',
    phoneNo: '',
    loginId: '',
    password: ''
  });

  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (id) {
      const agentToEdit = agents.find((agent) => agent.id === parseInt(id, 10));
      if (agentToEdit) setAgent(agentToEdit);
    }
  }, [id, agents]);

  useEffect(() => {
    // Check if all fields are filled
    const isValid =
      agent.name.trim() !== '' &&
      agent.phoneNo.trim() !== '' &&
      agent.loginId.trim() !== '' &&
      agent.password.trim() !== '';

    setIsFormValid(isValid);
  }, [agent]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgent({ ...agent, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await editAgent(agent);
    } else {
      console.log(agent);
      await addAgent(agent);
    }
    navigate('/dashboard/employees');
  };

  return (
    <div className="agent-form">
      <h2>{id ? 'Edit Agent' : 'Add Agent'}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={agent.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number</label>
          <input
            type="text"
            name="phoneNo"
            value={agent.phoneNo}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Username</label>
          <input
            type="text"
            name="loginId"
            value={agent.loginId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="text"
            name="password"
            value={agent.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          className={isFormValid ? 'enabled' : 'disabled'}
        >
          {id ? 'Update Agent' : 'Add Agent'}
        </button>
      </form>
    </div>
  );
};

export default AgentForm;
