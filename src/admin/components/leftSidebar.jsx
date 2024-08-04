import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useEvents } from "../../context/EventContext";
import { NavLink } from "react-router-dom";
// import '../styles/Sidebar.css'


const Sidebar = ({ className = "" }) => {
  const { events, fetchEvents, deleteEvent } = useEvents();
  const { logout } = useContext(AuthContext)
  

  const [openDropdowns, setOpenDropdowns] = useState({});

  const toggleDropdown = (eventId) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [eventId]: !prev[eventId],
    }));
  };

  useEffect(() => {
    const timer = setTimeout(() => {
        fetchEvents();
    }, 1500);
    // Cleanup the timer if the component is unmounted before the timer ends
    return () => clearTimeout(timer);
}, []);
  
  return (  
<div
      className={`no-print fixed h-full overflow-y-auto bg-white left-[0rem] box-border w-[15.25rem] flex flex-col items-start justify-start p-[1rem] gap-[0.5rem] text-left text-sm text-black-100 font-normal border-r-[1px] border-solid border-black-10 ${className} `}
    >
      <div className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] pb-boundvariablesdata11 gap-[0.25rem] z-[0]">
        <div className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem]">
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-radius-8 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata17 relative rounded-boundvariablesdata18 h-boundvariablesdata17 overflow-hidden shrink-0 object-cover"
                alt=""
                src="/byewind@2x.png"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Client Name
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch flex flex-col items-start justify-start py-[0.125rem] px-[0rem] opacity-[0]">
          <div className="self-stretch relative box-border h-[0.063rem] border-t-[1px] border-solid border-black-100" />
        </div>
        <div className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem]">
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata13 relative h-boundvariablesdata13"
                alt=""
                src="/dot.svg"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Overview
              </div>
            </div>
          </div>
        </div>
        <NavLink to={"/dashboard"} 
        className="nav-item" activeClassName="active">
        {/* className="nav-item" activeClassName="active" */}
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata13 relative h-boundvariablesdata13"
                alt=""
                src="/dot.svg"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Events
              </div>
            </div>
          </div>
        </NavLink>
      </div>
      
        <div className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] box-border gap-[0.25rem] z-[2]">
        {events.map((event) => (
          <div className="w-full">
          <button
             key={event.id}
             className="nav-item"
            // className="bg-white w-full text-black self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem] hover:bg-amber-100 outline-none gap-[0.25rem]"
            aria-controls={`dropdown-${event.id}`}
            data-collapse-toggle={`dropdown-${event.id}`}
            onClick={() => toggleDropdown(event.id)}
          >
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata13 relative h-boundvariablesdata13"
                alt=""
                src="/arrowlineright.svg"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
              <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
                <img
                  className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                  alt=""
                  src="/identificationbadge.svg"
                />
              </div>
              <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
                <div className="relative leading-[1.25rem]">
                  {event.eventName}
                </div>
              </div>
            </div>
          </button>
          <ul id={`dropdown-${event.id}`} className={`${openDropdowns[event.id] ? 'block' : 'hidden'} w-full px-0 py-2 space-y-2 list-none`}>
            <li>
              <NavLink to={`/dashboard/registered/${event.id}`} className="nav-item items-center content-center" activeClassName="active">
                
                  {/* <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-center justify-center">
                    <div className="self-stretch relative leading-[1.25rem]"> */}
                      Registrations
                    {/* </div>
                  </div> */}
                
              </NavLink>
            </li>
         <li>
        <NavLink to={`/dashboard/form/${event.id}`} className="nav-item" activeClassName="active">
          
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Forms
              </div>
            </div>
          
        </NavLink>
        </li>
        
        </ul>
      </div>
    ))}
      </div>
      
      <div> 
        <div className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem] gap-[0.25rem]">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
            <img
              className="w-boundvariablesdata13 relative h-boundvariablesdata13"
              alt=""
              src="/arrowlineright.svg"
            />
          </div>
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
                src="/identificationcard.svg"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Account
              </div>
            </div>
          </div>
        </div>
        <NavLink to={`/dashboard/employees`} className="self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem] gap-[0.25rem]">
          <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
            <img
              className="w-boundvariablesdata13 relative h-boundvariablesdata13"
              alt=""
              src="/arrowlineright.svg"
            />
          </div>
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                alt=""
                src="/usersthree.svg"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                Agents
              </div>
            </div>
          </div>
          
        </NavLink>
        <div className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] box-border gap-[0.25rem] z-[2]"></div>
        <button
            className="bg-white text-black w-full self-stretch rounded-boundvariablesdata16 flex flex-row flex-wrap items-center justify-start p-[0.5rem] outline-none gap-[0.25rem]"
            
            onClick={() => logout()}
          >
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata13 relative h-boundvariablesdata13"
                alt=""
                src="/arrowlineright.svg"
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
              <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
                <img
                  className="w-boundvariablesdata15 relative h-boundvariablesdata15"
                  alt=""
                  src="/identificationbadge.svg"
                />
              </div>
              <div className="flex-1  rounded-boundvariablesdata4 flex flex-col items-start justify-center">
                <div className="relative leading-[1.25rem]">
                  Logout
                </div>
              </div>
            </div>
          </button>
      </div>
      {/* <div className="absolute top-full left-[2.688rem] flex flex-row items-center justify-center p-[0.625rem] text-center text-[0.625rem] text-darkgray">
        <div className="relative leading-[1.25rem]">
          <p className="m-0">Powered by</p>
          <p className="m-0 text-[0.875rem]">Anginat Events</p>
        </div>
      </div> */}
    </div>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;
