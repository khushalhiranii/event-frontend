import React from 'react'

function DefaultInput({img, placeholder, value, onChange, type, name}) {
  return (
    <div className="self-stretch rounded-lg bg-white flex flex-row items-center justify-start py-component-padding-medium px-component-padding-xlarge gap-[1rem] border-[1.6px] border-solid border-gainsboro-200 w-full">
        <img
        className="w-[1.344rem] relative h-[1.075rem]"
        alt=""
        src={img}
        />
        <input
        className="relative p-0 w-full tracking-[0.1px] border-none text-sm text-gray-500 focus:outline-none focus:ring-0 placeholder:text-sm placeholder:font-medium placeholder:tracking-[0.1px] placeholder:text-[#969AB8] font-poppins"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        type={type}
        name={name}
        required
        />
    </div>
  )
}

export default DefaultInput