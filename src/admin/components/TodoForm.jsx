import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactFormBuilder } from 'react-form-builder2';
import 'react-form-builder2/dist/app.css';
import { useEvents } from '../../context/EventContext';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useLoading } from '../../context/Loadingcontext';

const TodoForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { events, addEvent, updateEvent } = useEvents();
  const { startLoading, stopLoading } = useLoading();
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

  // Function to convert UTC date string to IST date object
  const convertUTCtoIST = (dateString) => {
    const date = new Date(dateString);
    return new Date(date.getTime() + 330 * 60000); // IST offset
  };

  // Function to get the current date in IST
  const getCurrentISTDate = () => {
    const now = new Date();
    const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utcTime + 330 * 60000); // IST offset
  };

  useEffect(() => {
    if (id) {
      const x = JSON.parse(sessionStorage.getItem('events'));
      const existingTodo = x.find((t) => t.id === parseInt(id, 10));
      if (existingTodo) {
        setTodo({
          ...existingTodo,
          startDate: convertUTCtoIST(existingTodo.startDate).toISOString(),
          endDate: convertUTCtoIST(existingTodo.endDate).toISOString(),
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
      startDate: selection.startDate.toISOString(),
      endDate: selection.endDate.toISOString(),
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

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create form data object
    const formData = {
      eventName: todo.eventName,
      isPaid: todo.isPaid,
      startDate: todo.startDate,
      endDate: todo.endDate,
      userJourney: JSON.stringify(todo.userJourney),
      eventTemplate: todo.eventTemplate,
      attendieType: JSON.stringify(todo.attendieType),
      address: todo.address,
    };
  
    try {
      // Determine if we are updating or adding a new event
      startLoading()
      if (id) {
        await updateEvent(parseInt(id, 10), formData);
        stopLoading();
      } else {
        console.log(formData)
        await addEvent(formData);
        stopLoading();
      }
  
      // Navigate to the dashboard after successful submission
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to submit the form', error);
      // You can also add error handling here, e.g., displaying a notification or message
    }
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
    <div className='p-10 font-semibold'>
      {currentStep === 1 && (
        <form className='w-full space-y-4' onSubmit={(e) => e.preventDefault()}>
          <div className='flex justify-end mt-4'>
            <button type='button' disabled={!isFormValid} onClick={handleNextStep} className="mt-4 px-4 py-2 rounded">
              Next
            </button>
          </div>
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
          <div className='w-full'>
            <label>Event Date Range</label>
            <div>
              <DateRangePicker
                ranges={[{
                  startDate: isNaN(new Date(todo.startDate)) ? getCurrentISTDate() : new Date(todo.startDate),
                  endDate: isNaN(new Date(todo.endDate)) ? getCurrentISTDate() : new Date(todo.endDate),
                  key: 'selection',
                }]}
                direction="horizontal"
                showSelectionPreview={true}
                moveRangeOnFirstSelection={false}
                months={1}
                onChange={handleDateChange}
                className='w-full'
                minDate={getCurrentISTDate()}
              />
            </div>
          </div>
        </form>
      )}
      {currentStep === 2 && (
        <div>
          <div className='flex justify-between mt-1'>
            <button type='button' onClick={handlePreviousStep} className="bg-gray-500 text-white px-4 py-2 rounded">
              Previous
            </button>
            <button type="submit" onClick={handleSubmit} className="px-4 py-2 rounded">
              {id ? "Update" : "Create"} Event
            </button>
          </div>
          <div>
            <ReactFormBuilder saveUrl='' onPost={handleSave} onLoad={handleLoad} />
            </div>
        </div>
      )}
    </div>
  );
};

export default TodoForm;
