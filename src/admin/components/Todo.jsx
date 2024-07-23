// src/components/Todo.js
import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({ todo, onUpdate, onDelete }) => {
  return (
    <div className="todo">
      <input
        type="text"
        value={todo.text}
        onChange={(e) => onUpdate(todo.id, e.target.value)}
      />
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
};

Todo.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onUpdate: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Todo;
