import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../admin/axiosSetup';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await apiClient.get('/admin/event?status=ACTIVE');
        setEvents(response.data.data);
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };
    fetchEvents();
  }, []);

  const addEvent = async (event) => {
    try {
      const response = await apiClient.post('/admin/event/register', event);
      setEvents((prevEvents) => [...prevEvents, response.data]);
    } catch (error) {
      console.error('Failed to add event', error);
    }
  };

  const updateEvent = async (id, updatedEvent) => {
    
    try {
      await apiClient.patch(`/admin/event/${id}`, updatedEvent);
      setEvents((prevEvents) =>
        prevEvents.map((event) => (event.id === id ? { ...event, ...updatedEvent } : event))
      );
      
    } catch (error) {
      console.error('Failed to update event', error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await apiClient.delete(`/admin/event/${id}`);
      setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
    } catch (error) {
      console.error('Failed to delete event', error);
    }
  };

  return (
    <EventContext.Provider value={{ events, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
