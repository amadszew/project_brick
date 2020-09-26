import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Themes = props => {
  const location = useLocation();
  const {
    themesStructure, 
    onFilterSets, 
  } = props;

  
  return (
    <div>
      {Object.values(themesStructure).map(({id, name}) => (
        <Link 
          to={`${location.pathname}/${name}`} 
          key={id}
          name={name} 
          onClick={() => onFilterSets(id)}>
          {name}
        </Link>
      ))}
    </div>
  );
}

