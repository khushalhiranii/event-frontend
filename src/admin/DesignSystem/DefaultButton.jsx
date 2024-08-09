import React from 'react';
import PropTypes from 'prop-types';
// import './DefaultButton.css'; // Make sure to import the CSS file

function DefaultButton({ title, onClick, disabled = false, width = 'auto', img }) {
  return (
    <div
      className={`default ${disabled ? 'default-disabled' : ''}`}
      style={{ width }}
      onClick={!disabled ? onClick : null} // Prevent onClick when disabled
    >
      {img && <img src={img} alt={title} />}
      <button
        // onClick={onClick}
        disabled={disabled}
        className="button"
      >
        {title}
      </button>
    </div>
  );
}

DefaultButton.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
  width: PropTypes.string,
  img: PropTypes.string,
};

export default DefaultButton;
