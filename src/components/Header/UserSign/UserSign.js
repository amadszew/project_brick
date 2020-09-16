import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

export const UserSign = () => {
  return (
    <div>
      <FontAwesomeIcon icon={faUser} style={{color: 'black'}}/>
      <p style={{color: 'black'}}>Sign in</p>
    </div>
  );
};
