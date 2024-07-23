// src/components/TodoForm.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { ReactFormBuilder } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import $ from 'jquery';

const TodoForm = ({ todos = [], onSubmit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState({ image: '', eventName: '', isPaid: false, city: '', eventDate:'', userJourney: `["Attendance", "Food", "Kit"]`, eventTemplate: '', attendieType: `["Audience", "NRI"]`, address: '' });

  useEffect(() => {
    // Ensure jQuery is available globally if needed
    window.$ = $;
    window.jQuery = $;
  }, []);

  useEffect(() => {
    if (id) {
      const existingTodo = todos.find((t) => t.id === parseInt(id, 10));
      if (existingTodo) {
        setTodo(existingTodo);
      }
    }
  }, [id, todos]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      onSubmit(parseInt(id, 10), todo);
    } else {
      console.log(todo)
      onSubmit(todo);
    }
    navigate('/dashboard');
  };

  const handleSave = (data) => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      eventTemplate: JSON.stringify(data.task_data),
    }));
    console.log('Form data saved to state:', data.task_data);
  };

  const handleLoad = () => {
    if (todo.eventTemplate) {
      const formData2 = JSON.parse(todo.eventTemplate);
      console.log('Form data loaded from state:', formData2);
      return Promise.resolve(formData2);
    } else {
      return Promise.resolve([]);
    }
  };

  return (
    <div className='p-10 !sticky'>
      <form className='w-full' onSubmit={handleSubmit}>
        <div>
          <label>Event Name</label>
          <input
            className='border border-black'
            type='text'
            name='eventName'
            value={todo.eventName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>City</label>
          <input
            className='border border-black'
            name='city'
            type='text'
            value={todo.city}
            onChange={handleChange}
          ></input>
        </div>
        <div>
          <label>Event Date</label>
          <input
            className='border border-black'
            type='datetime-local'
            name='eventDate'
            value={todo.eventDate}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Event Address</label>
          <input
            className='border border-black'
            type='text'
            name='address'
            value={todo.address}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Event Poster</label>
          <input
            className='border border-black'
            type='file'
            name='image'
            value={todo.image}
            onChange={handleChange}
          />
        </div>
      </form>
      <ReactFormBuilder saveUrl='' onPost={handleSave} onLoad={handleLoad} />
      <button type='submit' onClick={handleSubmit}>{id ? 'Update' : 'Register'} Event</button>
    </div>
  );
};

TodoForm.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      eventName: PropTypes.string,
      eventDate: PropTypes.string,
      attendieType: PropTypes.string,
    })
  ),
  onSubmit: PropTypes.func.isRequired,
};

export default TodoForm;
