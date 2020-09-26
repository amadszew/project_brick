import React from 'react';
import { useHistory } from 'react-router-dom';

import { Set } from '../Set/Set';

export const SetsList = ({ sets }) => {
  const history = useHistory();

  const handleSetSelected = id => {
    history.push( `/catalog/sets/${id}` )
  }

  return (
    <>
      <div className="sets-list">
        {sets.map(set => (
          <Set 
            key={set.set_num}
            name={set.name}
            img={set.set_img_url}
            id={set.set_num}
            onSelect={handleSetSelected}
          />
        ))}
      </div>
    </>
  );
}

