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
    navigate('/add');
  };

  return (
    <div className="todo-list">
      <div className='flex flex-row justify-between mb-[48px]'>
        <div className='text-sm font-semibold flex items-center'>Events</div>
        <DefaultButton title={"Create New Event"} onClick={addTodo}></DefaultButton>
      </div>
      <div>
        <button className='flex flex-row justify-around items-center bg-white w-[105px] h-[28px]'>
          <img src='/trash.svg'/>
          <div>Trash</div>
        </button>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th className="p-4 w-6">
                <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
              </th>
              <th className="px-6 py-3 w-[85%]">Name</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
          {events.map((event) => (
            <tr key={event.id} className="bg-white ">
            <td className="w-6 p-4">
              <input type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" />
            </td>
            <td className="px-6 py-4 w-[85%] text-black">{event.eventName}</td>
            <td className="px-6 py-4">
              <button onClick={()=>{navigate(`/edit/${event.id}`)}}className="text-blue-600 bg-white hover:underline">
                <img src='/edit.svg'/>
              </button>
            </td>
          </tr>
          ))}
          </tbody>
        </table>
      </div>
      {/* {events.map((event) => (
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
      ))} */}
    </div>
  );
};

export default TodoList;
