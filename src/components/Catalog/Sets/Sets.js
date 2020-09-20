import React from 'react';

export const Sets = ({sets}) => {
  return (
    <div style={{display: 'flex', flexWrap: 'wrap'}}>
      {sets.map(set => (
        <div key={set.set_num} style={{border: '1px solid #000'}}>
          <p>{set.name}</p>
          <img src={set.set_img_url} alt={set.name} style={{width: 100, height: 100}} />
        </div>
      ))}
    </div>
  );
}

