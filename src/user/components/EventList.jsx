// src/components/EventList.js
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { EventContext } from '../context/EventContext';

const EventList = () => {
  const { events } = useContext(EventContext);

  return (
    <div>
      <h1>Events</h1>
      <ul>
        {events.map((event) => (
          <li key={event.id}>
            <Link to={`/events/${event.id}`}>
              {event.eventName} - {new Date(event.eventDate).toLocaleString()}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;
