// Sidebar.js
import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import AuthContext from "../../context/AuthContext";
import { useEvents } from "../../context/EventContext";
import PropTypes from 'prop-types';
import '../styles/Sidebar.css'; // Import the CSS file

const Sidebar = ({ className = "" }) => {
  const { events, fetchEvents } = useEvents();
  const { logout } = useContext(AuthContext);
  const [openDropdowns, setOpenDropdowns] = useState({});

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const toggleDropdown = (eventId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  return (
    <div className={`sidebar ${className}`}>
      <div className="sidebar-content">
        <NavLink to="/dashboard" className="nav-item" activeClassName="active">
          <img src="/dot.svg" alt="Dashboard" />
          <span>Dashboard</span>
        </NavLink>
        {events.map((event) => (
          <div key={event.id}>
            <button
              className="nav-item"
              onClick={() => toggleDropdown(event.id)}
            >
              <img src="/arrowlineright.svg" alt="Arrow" />
              <span>{event.eventName}</span>
            </button>
            <ul className={`${openDropdowns[event.id] ? 'block' : 'hidden'} py-2 space-y-2 list-none`}>
              <li>
                <NavLink to={`/dashboard/registered/${event.id}`} className="nav-item" activeClassName="active">
                  <span>Registrations</span>
                </NavLink>
              </li>
              <li>
                <NavLink to={`/dashboard/form/${event.id}`} className="nav-item" activeClassName="active">
                  <span>Forms</span>
                </NavLink>
              </li>
            </ul>
          </div>
        ))}
        <NavLink to="/dashboard/employees" className="nav-item" activeClassName="active">
          <img src="/usersthree.svg" alt="Employees" />
          <span>Employees</span>
        </NavLink>
        <button className="nav-item" onClick={logout}>
          <img src="/identificationbadge.svg" alt="Logout" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;
