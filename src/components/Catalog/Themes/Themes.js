import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Themes = props => {
  const {
    themesStructure, 
    onFilterSets, 
  } = props;

  const location = useLocation();
  
  return (
    <div>
      {Object.values(themesStructure).map(({id, name}) => (
        <Link to={`${location.pathname}/sets-list/${name}`} key={id} onClick={() => onFilterSets(id)}>
          {name}
        </Link>
      ))}
    </div>
  );
}

