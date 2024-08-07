import React from 'react';

function OutlinedButton({ title, onClick, disabled = false, width = 'auto', img }) {
  return (
    <div className="outlined" style={{ width }} onClick={!disabled ? onClick : undefined}>
      {img && <img src={img} alt="" />}
      <button disabled={disabled}>{title}</button>
    </div>
  );
}

export default OutlinedButton;
