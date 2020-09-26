import React from 'react';

export const Set = props => {
  const {name, img, id, onSelect} = props;

  return (
    <div className="set" onClick={() => onSelect(id)}>
      <p>{name}</p>
      <img src={img} alt={name} className="set__img" />
    </div>
  );
};
