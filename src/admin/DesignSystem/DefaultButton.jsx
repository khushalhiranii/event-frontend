// src/components/DefaultButton.jsx
import React from 'react';

function DefaultButton({ title, onClick, disabled = false, width = 'auto', img }) {
  return (
    <div className='default' style={{ width }}>
      {img && <img src={img} alt={title} />}
      <button
        onClick={onClick}
        disabled={disabled}
        className="button"
      >
        {title}
      </button>
    </div>
  );
}

export default DefaultButton;
