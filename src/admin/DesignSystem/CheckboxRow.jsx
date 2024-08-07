// CheckboxRow.jsx
import React from 'react';

const CheckboxRow = ({ options, selectedOptions, onChange }) => {
  return (
    <div className="checkbox-row">
      {options.map((option, index) => (
        <div key={option} className="checkbox-item">
          <label>
            <input
              type="checkbox"
              value={option}
              checked={selectedOptions.includes(option)}
              onChange={onChange}
              className='m-[9px] h-[16px] w-[16px]'
            />
            {option}
          </label>
        </div>
      ))}
    </div>
  );
};

export default CheckboxRow;
