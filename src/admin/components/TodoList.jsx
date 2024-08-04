import React, { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import '../TodoList.css';
import { useEvents } from '../../context/EventContext';
import { useLoading } from '../../context/Loadingcontext';
import DefaultButton from '../DesignSystem/DefaultButton';

const TodoList = () => {
  const { events, fetchEvents, deleteEvent } = useEvents();
  const { startLoading, stopLoading } = useLoading();
  const location = useLocation();
  
  useEffect(() => {
    const saveTokensToLocalStorage = () => {
      // Get the current URL
      const currentUrl = window.location.href;

      // Parse the URL using the URL constructor
      const parsedUrl = new URL(currentUrl);

      // Get the query parameters
      const params = new URLSearchParams(parsedUrl.search);

      // Extract the accessToken and refreshToken
      const accessToken = params.get('accessToken');
      const refreshToken = params.get('refreshToken');

      // Check if tokens exist and save them to localStorage
      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }

      // Optional: Navigate to a different route after saving tokens
       // Or any other route
    };

    saveTokensToLocalStorage();
  }, []);

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
      <DefaultButton title={"Create Event"} onClick={addTodo}></DefaultButton>
      {events.map((event) => (
        <div key={event.id} className="todo">
          <div>
            <h2>{event.eventName}</h2>
            <p>{event.startDate}</p>
          </div>
          <div>
            <div className='flex flex-row'>
            <button onClick={()=>{navigate(`/dashboard/edit/${event.id}`)}}>Edit</button>
            <button onClick={() => deleteEvent(event.id)}>Delete</button>
            </div>
          
          <button onClick={() => copyToClipboard(`<iframe src="https://event-frontend-omega.vercel.app/events/${event.id}" width="" height=""></iframe>`)}>Copy Form HTML</button>
          <button onClick={()=>{navigate(`/dashboard/assign-agent/${event.id}`)}} >Assign Employee</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
