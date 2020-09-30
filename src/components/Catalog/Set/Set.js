import React from 'react';

export const Set = props => {
  const {
    img, 
    name,
    itemNo,
    nofParts,
    year, 
    id,
    onSelect} = props;

  return (
    <div className="set" onClick={() => onSelect(id)}>
      <div className="set__img">
        <img src={img} alt={name} />
      </div>
      <div className="set__data">
        <h3 className="set__data__title">{name}</h3>
        <span className="set__data__details">#{itemNo},</span>
        <span className="set__data__details">{nofParts} parts,</span>
        <span className="set__data__details">{year}</span>
      </div>
    </div>
  );
};
