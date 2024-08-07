// src/components/Dropdown.jsx
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const Dropdown = ({ event, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="w-full">
      <DropdownButton
        isOpen={isOpen}
        onClick={toggleDropdown}
        label={event.eventName}
      />
      <ul
        id={`dropdown-${event.id}`}
        className={`${isOpen ? 'block' : 'hidden'} w-full mb-0 px-0 py-2 space-y-2 list-none`}
      >
        {children}
      </ul>
    </div>
  );
};

const DropdownButton = ({ isOpen, onClick, label }) => (
  <button
    className="nav-item gap-[4px]"
    onClick={onClick}
  >
    <div className="flex items-center justify-center gap-[4px] rounded-boundvariablesdata4">
  <img
    className="w-[16px] h-[16px] relative"
    alt=""
    src={isOpen ? "/arrowlinedown.svg" : "/arrowlineright.svg"}
  />
</div>

    <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[0.5rem]">
      <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
        <img
          className="w-[20px] relative h-[20px]"
          alt=""
          src="/identificationbadge.svg"
        />
      </div>
      <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
        <div className="relative leading-[1.25rem]">
          {label}
        </div>
      </div>
    </div>
  </button>
);

const DropdownItem = ({ to, label, icon }) => (
  <li>
    <NavLink
      to={to}
      className="nav-item flex flex-row p-[8px] gap-[4px] items-center content-center"
      activeclassName="active"
    >
      {icon && (
        <div className="rounded-boundvariablesdata4 flex flex-col items-center justify-center w-[16px] h-[16px]">
          <img className="w-[20px] h-[20px]" src={icon} alt="" />
        </div>
      )}
      <div className="self-stretch relative flex flex-row gap-[8px]">
        <div className="w-[20px] h-[20px]"></div>
        {label}
      </div>
    </NavLink>
  </li>
);

export { Dropdown, DropdownButton, DropdownItem };
