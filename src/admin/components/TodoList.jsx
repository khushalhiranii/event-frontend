import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
// import '../TodoList.css';
import { useEvents } from '../../context/EventContext';
import { useLoading } from '../../context/Loadingcontext';
import DefaultButton from '../DesignSystem/DefaultButton';

const TodoList = () => {
  const { events, fetchEvents, deleteEvent } = useEvents();
  const { startLoading, stopLoading } = useLoading();
  const [checkedItems, setCheckedItems] = useState({});
  const [isAllChecked, setIsAllChecked] = useState(false);

  useEffect(() => {
    startLoading();
    const timer = setTimeout(() => {
        fetchEvents();
    }, 1500);
    stopLoading();
    return () => clearTimeout(timer);
  }, []);

  const navigate = useNavigate();

  const handleSelectAll = () => {
    const newCheckedItems = {};
    events.forEach((event) => {
      newCheckedItems[event.id] = !isAllChecked;
    });
    setCheckedItems(newCheckedItems);
    setIsAllChecked(!isAllChecked);
  };

  const handleCheckboxChange = (eventId) => {
    setCheckedItems((prevCheckedItems) => ({
      ...prevCheckedItems,
      [eventId]: !prevCheckedItems[eventId],
    }));
  };

  const addTodo = () => {
    navigate('/add');
  };

  const selectedEventIds = Object.keys(checkedItems).filter(id => checkedItems[id]);

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
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th className="p-4 w-6">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" 
                  checked={isAllChecked} 
                  onChange={handleSelectAll} 
                />
              </th>
              <th className="px-6 py-3 w-[85%]">Name</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
          {events.map((event) => (
            <tr key={event.id} className="bg-white ">
              <td className="w-6 p-4">
                <input 
                  type="checkbox" 
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded" 
                  checked={checkedItems[event.id] || false}
                  onChange={() => handleCheckboxChange(event.id)} 
                />
              </td>
              <td className="px-6 py-4 w-[85%] text-black">{event.eventName}</td>
              <td className="px-6 py-4">
                <button onClick={() => navigate(`/edit/${event.id}`)} className="text-blue-600 bg-white hover:underline">
                  <img src='/edit.svg'/>
                </button>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
