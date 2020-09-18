import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-solid-svg-icons';

export const LogIn = () => {
  return (
    <button className="log-in">
      <FontAwesomeIcon icon={faUserCircle} className="log-in__icon"/>
      <span className="log-in__text">Log in / Register</span>
    </button>
  );
};
