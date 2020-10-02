import React from 'react';
import { 
  Route, 
  useRouteMatch, 
  useLocation 
} from 'react-router-dom';

import { Set } from '../Set/Set';
import { SetDetailed } from '../SetDetailed/SetDetailed'

export const SetsList = ({ sets }) => {
  const match = useRouteMatch();
  const location = useLocation();

  return (
    <>
      {match.url === location.pathname && (
        <div className="sets-list">
          {sets.map(set => (
            <Set 
              key={set.set_num}
              img={set.set_img_url}
              name={set.name}
              itemNo={set.set_num}
              nofParts={set.num_parts}
              year={set.year}
              id={set.set_num}
            />
          ))}
        </div>
      )}

      <Route 
        path={`${match.url}/sets/:id`} 
        render={() => <SetDetailed sets={sets}/>} 
      />
    </>
  );
}

