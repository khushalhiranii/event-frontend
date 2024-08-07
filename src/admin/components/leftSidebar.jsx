import PropTypes from "prop-types";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../../context/AuthContext";
import { useEvents } from "../../context/EventContext";
import { NavLink } from "react-router-dom";
import { Dropdown, DropdownItem } from "../DesignSystem/Dropdown";
import SidebarNavlink from "../DesignSystem/SidebarNavlink";
import SidebarButton from "../DesignSystem/SidebarButton";
import DefaultSidebarNavlink from "./DefaultSidebarNavlink";
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
        <DefaultSidebarNavlink to={"/"} img={"/dot.svg"} label={"Overview"}/>
        <DefaultSidebarNavlink to={"/dashboard"} img={"/dot.svg"} label={"Events"} />
      </div>
      
        <div className="self-stretch flex flex-col items-start justify-start pt-[0rem] px-[0rem] box-border gap-[0.25rem] z-[2]">
        {events.map((event) => (
          <Dropdown key={event.id} event={event}>
          <DropdownItem to={`/coming/1`} label="Overview" />
          <DropdownItem to={`/registered/${event.id}`} label="Registrations" />
          <DropdownItem to={`/form/${event.id}`} label="Forms" />
          <DropdownItem to={`/coming/2`} label="Designs" />
          <DropdownItem to={`/coming/3`} label="Lunch/Dinner" />
          <DropdownItem to={`/coming/4`} label="Kit" />
          <DropdownItem to={`/coming/5`} label="Scanner" />
          <DropdownItem to={`/coming/6`} label="Event Settings" />
        </Dropdown>
    ))}
    <SidebarNavlink to={`/employees`} img={"/usersthree.svg"} label={"Agents"}/>
    <SidebarButton onClick={logout} img={"/identificationbadge.svg"} label={"Logut"}/>
      </div>
    </div>
  );
};

Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;
