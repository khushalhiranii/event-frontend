import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TodoList.css';
import { useEvents } from '../../context/EventContext';

const TodoList = () => {
  const { events, fetchEvents, deleteEvent } = useEvents();

  useEffect(() => {
    setTimeout(fetchEvents(), 1000)
  }, []);

  const navigate = useNavigate();

  const copyToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      alert('Form HTML copied to clipboard!');
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
          <button onClick={() => copyToClipboard(`<iframe src="https://event-frontend-omega.vercel.app/events/${event.id}" width="" height=""></iframe>`)}>Copy Form HTML</button>

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
