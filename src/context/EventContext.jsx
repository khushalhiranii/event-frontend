import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../admin/axiosSetup';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(() => {
    const storedEvents = sessionStorage.getItem('events');
    return storedEvents ? JSON.parse(storedEvents) : [];
  });

  const fetchEvents = async () => {
    try {
      const response = await apiClient.get('/admin/event?status=ACTIVE');
      const fetchedEvents = response.data.data;
      setEvents(fetchedEvents);
      sessionStorage.setItem('events', JSON.stringify(fetchedEvents));
    } catch (error) {
      console.error('Failed to fetch events', error);
    }
  };

  const addEvent = async (event) => {
    try {
      const response = await apiClient.post('/admin/event/register', event);
      const newEvent = response.data;
      setEvents((prevEvents) => {
        const updatedEvents = [...prevEvents, newEvent];
        sessionStorage.setItem('events', JSON.stringify(updatedEvents));
        return updatedEvents;
      });
    } catch (error) {
      console.error('Failed to add event', error);
    }
  };

  const updateEvent = async (id, updatedEvent) => {
    try {
      await apiClient.put(`/admin/event/${id}`, updatedEvent);
      setEvents((prevEvents) => {
        const updatedEvents = prevEvents.map((event) =>
          event.id === id ? { ...event, ...updatedEvent } : event
        );
        sessionStorage.setItem('events', JSON.stringify(updatedEvents));
        return updatedEvents;
      });
    } catch (error) {
      console.error('Failed to update event', error);
    }
  };

  const deleteEvent = async (id) => {
    try {
      await apiClient.delete(`/admin/event/${id}`);
      setEvents((prevEvents) => {
        const updatedEvents = prevEvents.filter((event) => event.id !== id);
        sessionStorage.setItem('events', JSON.stringify(updatedEvents));
        return updatedEvents;
      });
    } catch (error) {
      console.error('Failed to delete event', error);
    }
  };

  return (
    <EventContext.Provider value={{ events, fetchEvents, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);
