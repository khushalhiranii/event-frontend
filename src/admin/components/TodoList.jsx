// src/components/TodoList.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./TodoList.css"
import { useEvents } from '../../context/EventContext';

const TodoList = () => {
  const { events, deleteEvent } = useEvents();
  const navigate = useNavigate()
  const addTodo = () => {
    navigate("/dashboard/add")
  }
  return (
    <div className="todo-list">
      <h1>Anginat Events</h1>
      <button onClick={addTodo}>Register Event</button>
      {events.map((event) => (
        <div key={event.id} className="todo">
          <div>
            <h2>{event.eventName}</h2>
            <p>{event.eventDate}</p>
          </div>
          <div>
            <Link to={`/dashboard/edit/${event.id}`}><button>Edit</button></Link>
            <button onClick={() => deleteEvent(event.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
