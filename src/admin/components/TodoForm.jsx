import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactFormBuilder } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import $ from 'jquery';

const TodoForm = ({ todos = [], onSubmit }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [todo, setTodo] = useState({
    image: null, // Changed to null
    eventName: '',
    isPaid: false,
    city: '',
    eventDate: '',
    userJourney: ['Attendance', 'Food', 'Kit'],
    eventTemplate: '',
    attendieType: ['Audience', 'NRI'],
    address: ''
  });

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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    setTodo({
      ...todo,
      image: file,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('image', todo.image);
    formData.append('eventName', todo.eventName);
    formData.append('isPaid', todo.isPaid);
    formData.append('city', todo.city);
    formData.append('eventDate', todo.eventDate);
    formData.append('userJourney', JSON.stringify(todo.userJourney));
    formData.append('eventTemplate', todo.eventTemplate);
    formData.append('attendieType', JSON.stringify(todo.attendieType));
    formData.append('address', todo.address);

    if (id) {
      onSubmit(parseInt(id, 10), formData);
    } else {
      console.log(todo);
      onSubmit(formData);
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
            onChange={handleImageChange} // Removed value attribute
          />
        </div>
      </form>
      <ReactFormBuilder saveUrl='' onPost={handleSave} onLoad={handleLoad} />
      <button type='submit' onClick={handleSubmit}>{id ? 'Update' : 'Register'} Event</button>
    </div>
  );
};

export default TodoForm;
