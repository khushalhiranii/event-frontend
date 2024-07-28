import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactFormBuilder } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import { useEvents } from '../../context/EventContext';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const TodoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, addEvent, updateEvent } = useEvents();
  const [currentStep, setCurrentStep] = useState(1); // State to track current step
  const [todo, setTodo] = useState({
    eventName: '',
    isPaid: false,
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

  const handleDateChange = (ranges) => {
    const { selection } = ranges;
    setTodo({
      ...todo,
      startDate: selection.startDate.toString(),
      endDate: selection.endDate.toString(),
    });
  };

  useEffect(() => {
    const isValidDate = (dateString) => {
      const date = new Date(dateString);
      return !isNaN(date);
    };

    const isFormFilled = todo.eventName && todo.startDate && todo.endDate && todo.address;
    const isDateRangeValid = new Date(todo.startDate) <= new Date(todo.endDate);

    setIsFormValid(isFormFilled && isValidDate(todo.startDate) && isDateRangeValid);
  }, [todo]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(todo)
    const formData = new FormData();
    formData.append('eventName', todo.eventName);
    formData.append('isPaid', todo.isPaid);
    formData.append('startDate', todo.startDate);
    formData.append('endDate', todo.endDate);
    formData.append('userJourney', JSON.stringify(todo.userJourney));
    formData.append('eventTemplate', todo.eventTemplate);
    formData.append('attendieType', JSON.stringify(todo.attendieType));
    formData.append('address', todo.address);

    formData.forEach((value, key) => {
      console.log(key, value);
    });

    console.log(todo)
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

  const handleNextStep = () => {
    setCurrentStep(2);
  };

  const handlePreviousStep = () => {
    setCurrentStep(1);
  };

  return (
    <div className='p-10'>
      {currentStep === 1 && (
        <form className='w-full space-y-4' onSubmit={(e) => e.preventDefault()}>
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
          <div className='w-full'>
            <label>Event Date Range</label>
            <div>
              <DateRangePicker
                ranges={[{
                  startDate: isNaN(new Date(todo.startDate)) ? new Date() : new Date(todo.startDate),
                  endDate: isNaN(new Date(todo.endDate)) ? new Date() : new Date(todo.endDate),
                  key: 'selection',
                }]}
                direction="horizontal"
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={1}
                onChange={handleDateChange}
                className='w-full'
              />
            </div>
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
          <button type='button' disabled={!isFormValid} onClick={handleNextStep} className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
            Next
          </button>
        </form>
      )}
      {currentStep === 2 && (
        <div>
          <ReactFormBuilder saveUrl='' onPost={handleSave} onLoad={handleLoad} />
          <div className='flex justify-between mt-4'>
            <button type='button' onClick={handlePreviousStep} className="bg-gray-500 text-white px-4 py-2 rounded">
              Previous
            </button>
            <button type='submit' onClick={handleSubmit} className="bg-blue-500 text-white px-4 py-2 rounded">
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoForm;
