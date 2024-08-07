import React from 'react'
import { NavLink } from 'react-router-dom'

function DefaultSidebarNavlink({to, img, label}) {
  return (
    <NavLink to={to} 
        className="nav-item" activeclassName="active">
          <div className="flex-1 rounded-boundvariablesdata4 flex flex-row flex-wrap items-center justify-start gap-[8px]">
            <div className="rounded-boundvariablesdata4 flex flex-row items-center justify-center">
              <img
                className="w-boundvariablesdata13 relative h-boundvariablesdata13"
                alt=""
                src={img}
              />
            </div>
            <div className="flex-1 rounded-boundvariablesdata4 flex flex-col items-start justify-center">
              <div className="self-stretch relative leading-[1.25rem]">
                {label}
              </div>
            </div>
          </div>
        </NavLink>
  )
}

export default DefaultSidebarNavlink