import React, { createContext, useContext, useState, useEffect } from 'react';
import apiClient from '../admin/axiosSetup';

const EventContext = createContext();

export const EventProvider = ({ children }) => {
  const [events, setEvents] = useState([]);

  
    const fetchEvents = async () => {
      try {
        const response = await apiClient.get('/admin/event?status=ACTIVE');
        // console.log(response)
        setEvents(response.data.data);
        sessionStorage.setItem("events", JSON.stringify(response.data.data));
      } catch (error) {
        console.error('Failed to fetch events', error);
      }
    };
    

    const addEvent = async (event) => {
      try {
        console.log("Adding event: ", {event});
        const response = await apiClient.post('/admin/event/register', event);
    
        if (response.status === 201) {
          console.log("Event added successfully:", response.data);
          setEvents((prevEvents) => [...prevEvents, response.data]);
          // Optionally, you could set a status message or redirect the user here
        } else {
          console.log("Unexpected response:", response);
        }
      } catch (error) {
        if (error.response) {
          // Handle known error responses from the server
          const { status, data } = error.response;
          switch (status) {
            case 400:
              console.error(`Error: ${data.message}`);
              break;
            case 500:
              console.error(`Server Error: ${data.message}`);
              break;
            default:
              console.error('Unknown error occurred:', data);
          }
        } else {
          console.error('Error: Unable to connect to the server', error);
        }
      }
    };
    

  const updateEvent = async (id, updatedEvent) => {
    
    try {
        
        
      await apiClient.put(`/admin/event/${id}`, updatedEvent).then((res)=>{
        // console.log(res);
      }).catch((e)=>{
        console.log(e);
      });
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
    <EventContext.Provider value={{ events, fetchEvents, addEvent, updateEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export const useEvents = () => useContext(EventContext);