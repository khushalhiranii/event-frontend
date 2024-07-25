import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactFormBuilder } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import { useEvents } from '../../context/EventContext';

const TodoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, addEvent, updateEvent } = useEvents();
  const [todo, setTodo] = useState({
    image: null,
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
    if (id) {
      const existingTodo = events.find((t) => t.id === parseInt(id, 10));
      console.log(existingTodo);
      if (existingTodo) {
        setTodo(existingTodo);
      }
    }
  }, [id, events]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTodo({
      ...todo,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(todo);
    // handleLoad();
  }, [todo]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
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
    if(id){
      formData.append('eventTemplate', JSON.stringify(todo.eventTemplate));
    }else{
      formData.append('eventTemplate', todo.eventTemplate);

    }
    formData.append('attendieType', JSON.stringify(todo.attendieType));
    formData.append('address', todo.address);

    // Debugging: log the FormData object
    

    if (id) {
      updateEvent(parseInt(id, 10), formData);
    } else {
      addEvent(formData);
    }
    navigate('/dashboard');
  };

  const handleSave = (data) => {
    console.log('Saving form data:', data);
    setTodo((prevTodo) => ({
      ...prevTodo,
      eventTemplate: JSON.stringify(data.task_data),
    }));
  };
  const handleLoad = () => {
    if (id) { 
      const existingTodo = events.find((t) => t.id === parseInt(id, 10));
      console.log(existingTodo)
      // const formData2 = existingTodo.eventTemplate;
      // let existingData = {
      //   task_data: formData2
      // }
      // console.log('Loading form data:', existingData);
      return Promise.resolve(existingData);
    } else {
      return Promise.resolve([]);
    }
  };

  return (
    <div className='p-10'>
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
            onChange={handleImageChange}
          />
        </div>
      </form>
      <ReactFormBuilder saveUrl='' onPost={handleSave} onLoad={handleLoad} />
      <button type='submit' onClick={handleSubmit}>
        {id ? 'Update' : 'Register'} Event
      </button>
    </div>
  );
};

export default TodoForm;
