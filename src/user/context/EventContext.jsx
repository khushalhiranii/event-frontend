// src/context/EventContext.js
import React, { createContext, useState, useEffect } from 'react';
import apiClient from '../../admin/axiosSetup';

const EventContext = createContext();

const EventProvider2 = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiClient.get('/event'); // Adjust this URL to your backend endpoint
        setEvents(response.data.data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <EventContext.Provider value={{ events, setEvents }}>
      {children}
    </EventContext.Provider>
  );
};

export { EventContext, EventProvider2 };
