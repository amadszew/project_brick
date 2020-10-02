import React from 'react';

import { CloseBtn } from '../../../utils/CloseBtn/CloseBtn';

export const FullScreen = ({ img, name, onFullScreen }) => {
  return (
    <div className="full-screen">
      <img className="full-screen__img" src={img} alt={name}/>
      <CloseBtn callback={onFullScreen} />
    </div>
  );
}
