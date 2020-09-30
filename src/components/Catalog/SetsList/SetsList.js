import React from 'react';
import { 
  Route, 
  useHistory, 
  useRouteMatch, 
  useLocation 
} from 'react-router-dom';

import { Set } from '../Set/Set';
import { FullSetView } from '../FullSetView/FullSetView'

export const SetsList = ({ sets }) => {
  const history = useHistory();
  const match = useRouteMatch();
  const location = useLocation();

  const handleSetSelected = id => {
    history.push( `${match.url}/sets/${id}` )
  }

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
              onSelect={handleSetSelected}
            />
          ))}
        </div>
      )}

      <Route 
        path={`${match.url}/sets/:id`} 
        render={() => <FullSetView sets={sets}/>} 
      />
    </>
  );
}

