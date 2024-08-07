import React, { useState } from 'react';
import PropTypes from 'prop-types';

const PasswordInput = ({ placeholder, onChange, value }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="self-stretch rounded-lg bg-white flex flex-row flex-wrap items-center justify-between py-component-padding-medium px-component-padding-xlarge border-[1.6px] border-solid border-gainsboro-200">
      <div className="w-[19.375rem] flex flex-row items-center justify-start gap-[1rem]">
        <img
          className="w-[1.188rem] relative h-[1.188rem]"
          alt="Icon"
          src="/group1.svg"
        />
        <input
          className="relative w-full tracking-[0.1px] text-sm text-violet-500 self-stretch focus:outline-none focus:ring-0 placeholder:text-sm placeholder:font-medium placeholder:leading-[21px] placeholder:tracking-[0.1px] placeholder:text-[#969AB8] font-poppins"
          placeholder={placeholder}
          type={showPassword ? "text" : "password"}
          value={value}
          onChange={onChange}
        />
      </div>
      <img
        className="w-[1.5rem] relative h-[1.5rem] overflow-hidden shrink-0 cursor-pointer"
        alt="Toggle visibility"
        src={showPassword ? "/eye-open-svgrepo-com.svg" : "/eye--hide.svg"}
        onClick={toggleShowPassword}
      />
    </div>
  );
};

PasswordInput.propTypes = {
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
};

export default PasswordInput;
