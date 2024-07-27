// src/components/TodoList.js
import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TodoList.css';
import { useEvents } from '../../context/EventContext';

const TodoList = () => {
  console.log('Hi Hi Hi');
  const { events, fetchEvents, deleteEvent } = useEvents();
  useEffect(()=>{
    fetchEvents();
  },[events])
  console.log('events:', events); // Debugging log

  const navigate = useNavigate();

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert('URL copied to clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const addTodo = () => {
    navigate('/dashboard/add');
  };

  return (
    <div className="todo-list">
      <h1>Anginat Events</h1>
      <button onClick={addTodo}>Create Event</button>
      {events.map((event) => (
        <div key={event.id} className="todo">
          <div>
            <h2>{event.eventName}</h2>
            <p>{event.eventDate}</p>
          </div>
          <div>
            <button onClick={() => copyToClipboard(`https://event-frontend-omega.vercel.app/events/${event.id}`)}>
              Copy Form URL
            </button>
            <Link to={`/dashboard/edit/${event.id}`}>
              <button>Edit</button>
            </Link>
            <button onClick={() => deleteEvent(event.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
