import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactFormBuilder } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import { useEvents } from '../../context/EventContext';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { addDays } from 'date-fns';

const TodoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, addEvent, updateEvent } = useEvents();
  const [todo, setTodo] = useState({
    image: null,
    eventName: '',
    isPaid: false,
    city: '',
    startDate: '',
    endDate: '',
    userJourney: ['Attendance', 'Food', 'Kit'],
    eventTemplate: `[{"id":"E719EE2B-9385-4AF2-81D8-586A6A835FDB","element":"TextInput","text":"Text Input","required":true,"canHaveAnswer":true,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"text_input_103DC733-9828-4C8D-BDD5-E2BCDD96D92A","label":"Name ","dirty":false},{"id":"DBABFE94-29D7-47E2-9ECD-54AE7AFF3391","element":"PhoneNumber","text":"Phone Number","required":true,"canHaveAnswer":true,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"phone_input_0A6EEDDB-E0D5-4BC7-8D4B-CF2D4896B786","label":"Phone Number","dirty":false},{"id":"48C6DE8C-B312-4A40-A4A4-725B2242C109","element":"EmailInput","text":"Email","required":true,"canHaveAnswer":true,"canHavePageBreakBefore":true,"canHaveAlternateForm":true,"canHaveDisplayHorizontal":true,"canHaveOptionCorrect":true,"canHaveOptionValue":true,"canPopulateFromApi":true,"field_name":"email_input_A4A11559-34CB-4A95-BB86-E89C8CABE06C","label":"E-Mail","dirty":false}]`,
    attendieType: ['Audience', 'NRI'],
    address: ''
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    if (id) {
      const x = JSON.parse(sessionStorage.getItem('events'));
      const existingTodo = x.find((t) => t.id === parseInt(id, 10));
      if (existingTodo) {
        setTodo({
          ...existingTodo,
          startDate: existingTodo.startDate.replace('Z', ''),
          endDate: existingTodo.endDate.replace('Z', ''),
        });
        setIsDataLoaded(true);
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setTodo({
      ...todo,
      image: file,
    });
  };

  const handleDateChange = (ranges) => {
    const { selection } = ranges;
    setTodo({
      ...todo,
      startDate: selection.startDate.toISOString(),
      endDate: selection.endDate.toISOString(),
    });
  };

  useEffect(() => {
    const isValidDate = (dateString) => {
      const date = new Date(dateString);
      const now = new Date();
      return date >= now;
    };

    const isFormFilled = todo.eventName && todo.city && todo.startDate && todo.endDate && todo.address && todo.image;
    const isDateRangeValid = new Date(todo.startDate) <= new Date(todo.endDate);

    setIsFormValid(isFormFilled && isValidDate(todo.startDate) && isDateRangeValid);
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(todo);
    const formData = new FormData();
    formData.append('image', todo.image);
    formData.append('eventName', todo.eventName);
    formData.append('isPaid', todo.isPaid);
    formData.append('city', todo.city);
    formData.append('startDate', todo.startDate);
    formData.append('endDate', todo.endDate);
    formData.append('userJourney', JSON.stringify(todo.userJourney));
    formData.append('eventTemplate', todo.eventTemplate);
    formData.append('attendieType', JSON.stringify(todo.attendieType));
    formData.append('address', todo.address);

    if (id) {
      updateEvent(parseInt(id, 10), formData);
    } else {
      addEvent(formData);
    }
    navigate('/dashboard');
  };

  const handleSave = (data) => {
    setTodo((prevTodo) => ({
      ...prevTodo,
      eventTemplate: JSON.stringify(data.task_data),
    }));
  };

  const handleLoad = async () => {
    if (id) {
      const x = JSON.parse(sessionStorage.getItem('events'));
      const existingTodo = x.find((t) => t.id === parseInt(id, 10));
      const formData2 = JSON.parse(existingTodo.eventTemplate);
      return Promise.resolve(formData2);
    } else {
      const formData2 = JSON.parse(todo.eventTemplate);
      return Promise.resolve(formData2);
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
            required
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
            required
          ></input>
        </div>
        <div>
          <label>Event Date Range</label>
          <DateRangePicker
            ranges={[{
              startDate: new Date(todo.startDate),
              endDate: addDays(new Date(), 0),
              key: 'selection',
            }]}
            direction="horizontal"
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            onChange={handleDateChange}
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
            required
          />
        </div>
        <div>
          <label>Event Poster</label>
          <input
            className='border border-black'
            type='file'
            name='image'
            onChange={handleImageChange}
            required
          />
        </div>
        <button type='submit' disabled={!isFormValid} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          {id ? 'Update' : 'Create'} Event
        </button>
      </form>
      <ReactFormBuilder saveUrl='' onPost={handleSave} onLoad={handleLoad} />
    </div>
  );
};

export default TodoForm;
