import React from 'react';
import { Link, useRouteMatch } from 'react-router-dom';

export const Set = props => {
  
  const match = useRouteMatch();
  const {
    img, 
    name,
    itemNo,
    nofParts,
    year, 
    id } = props;


  return (
    <Link className="set" to={`${match.url}/sets/${id}`}>
      <div className="set__img">
        <img src={img} alt={name} />
      </div>
      <div className="set__data">
        <h3 className="set__data__title">{name}</h3>
        <span className="set__data__details">#{itemNo},</span>
        <span className="set__data__details">{nofParts} parts,</span>
        <span className="set__data__details">{year}</span>
      </div>
    </Link>
  );
};
