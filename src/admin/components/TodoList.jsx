import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './TodoList.css';
import { useEvents } from '../../context/EventContext';
import { useLoading } from '../../context/Loadingcontext';

const TodoList = () => {
  const { events, fetchEvents, deleteEvent } = useEvents();
  const { startLoading, stopLoading } = useLoading();

  useEffect(() => {
    startLoading()
    const timer = setTimeout(() => {
        fetchEvents();
    }, 1500);
    stopLoading()
    // Cleanup the timer if the component is unmounted before the timer ends
    return () => clearTimeout(timer);
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
            <p>{event.startDate}</p>
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
