import React from 'react';

export const Sets = ({ sets }) => {

  return (
    <ul>
      {sets.map(set => (
        <li style={{backgroundColor: '#222', width: "50%"}} key={set.set_num}>
          <h2>{set.name}</h2>
          <h4>{set.year}</h4>
          <img style={{width: 160, height: 120}} src={set.set_img_url} alt={set.name} />
        </li>
      ))}
    </ul>
  );
};
