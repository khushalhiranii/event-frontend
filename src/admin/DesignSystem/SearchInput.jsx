import React from 'react'

function SearchInput({img, placeholder, value, onChange, type, name,  title, onClick, disabled = false, width = 'auto', img1 }) {
  return (
    <div className="self-stretch rounded-lg bg-white flex flex-row items-center justify-start gap-[1rem] border-[1.6px] border-solid border-gainsboro-200 w-full">
    <div className="self-stretch bg-white flex flex-row items-center justify-start gap-[1rem] py-component-padding-medium px-component-padding-xlarge  w-full">
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
    <div
  className={`flex items-center justify-center w-full h-full px-4 py-1.5 bg-blue-500 rounded shadow-md cursor-pointer 
    ${disabled ? 'bg-gray-300 cursor-not-allowed' : ''}`}
  style={{ width }}
  onClick={!disabled ? onClick : null} // Prevent onClick when disabled
>
  {img1 && <img src={img1} alt={title} />}
  <button
    onClick={onClick}
    disabled={disabled}
    className="bg-transparent text-white text-sm p-0 border-none focus:outline-none"
  >
    {title}
  </button>
</div>

    </div>
  )
}

export default SearchInput