import React from 'react';

export const SetsList = ({sets}) => {
  return (
    <div className="sets-list">
      {sets.map(set => (
        <div key={set.set_num} className="sets-list__set">
          <p>{set.name}</p>
          <img src={set.set_img_url} alt={set.name} className="sets-list__img" />
        </div>
      ))}
    </div>
  );
}

