import React from 'react';

export const Themes = props => {
  const {themesStructure, onFilterSets} = props;

  return (
    <div>
      {Object.values(themesStructure).map(({id, name}) => (
        <button key={id} onClick={() => onFilterSets(id)}>
          {name}
        </button>
      ))}
    </div>
  );
}

