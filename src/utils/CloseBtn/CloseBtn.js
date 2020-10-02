import React from 'react';

export const CloseBtn = ({ callback }) => {
  return (
    <button className="close-button" onClick={callback}>
      <div className="close-button__sign">
        <span className="close-button__label">Back</span>
      </div>
    </button>
  );
}
