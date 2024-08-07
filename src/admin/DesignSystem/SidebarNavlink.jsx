import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

const SidebarNavlink = ({ to, label, img }) => (
    <NavLink
      className="nav-item gap-[4px]"
      to={to}
    >
      <div className="flex items-center justify-center gap-[4px] rounded-boundvariablesdata4">
    <img
      className="w-[16px] h-[16px] relative"
      alt=""
      src={"/arrowlineright.svg"}
    />
  </div>
  
      <div className="flex-1 rounded-boundvariablesdata4 flex flex-row items-center justify-start gap-[0.5rem]">
        <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
          <img
            className="w-[20px] relative h-[20px]"
            alt=""
            src={img}
          />
        </div>
        <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
          <div className="relative leading-[1.25rem]">
            {label}
          </div>
        </div>
      </div>
    </NavLink>
  );
  
  export default SidebarNavlink;