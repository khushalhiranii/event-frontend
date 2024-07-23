// src/components/TodoList.js
import React from 'react';
import PropTypes from 'prop-types';
import { Link, useNavigate } from 'react-router-dom';
import "./TodoList.css"

const TodoList = ({ todos, onDelete }) => {
  const navigate = useNavigate()
  const addTodo = () => {
    navigate("/dashboard/add")
  }
  return (
    <div className="todo-list">
      <h1>Anginat Events</h1>
      <button onClick={addTodo}>Register Event</button>
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <div>
            <h2>{todo.eventName}</h2>
            <p>{todo.eventDate}</p>
          </div>
          <div>
            <Link to={`/dashboard/edit/${todo.id}`}><button>Edit</button></Link>
            <button onClick={() => onDelete(todo.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default TodoList;
