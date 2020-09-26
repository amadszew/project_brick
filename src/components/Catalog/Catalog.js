import React, { useState } from 'react';
import { 
  Link, 
  Route,
  useLocation,
  useRouteMatch
} from 'react-router-dom';

import { Themes } from './Themes/Themes';
import { SetsList } from './SetsList/SetsList';
import { FullSetView } from './FullSetView/FullSetView'

export const Catalog = props => {
  const [setsBasedOnSelectedTheme, setSetsBasedOnSelectedTheme] = useState([]);

  const location = useLocation();
  const match = useRouteMatch();
  const {
    setsMap,
    themesStructure,
    sets
  } = props;

  const filterSetsBasedOnThemes = id => {

    let filteredThemesArray = [];
    setSetsBasedOnSelectedTheme([]);

    const childrens = themesStructure[id].childrens;

    const isNotEmptyObject = Object.values(childrens).length !== 0 && childrens.constructor === Object;

    //* adding parent id to array
    filteredThemesArray.push(id);

    //* adding childs id to array
    if (isNotEmptyObject) {
      Object.values(childrens).forEach(child => {
        filteredThemesArray.push(child.id)
      });
    }
    
    //* adding grandchilds id to array
    Object.values(childrens).forEach(child => {
      if (isNotEmptyObject) {
        Object.values(child.childrens).forEach(grandchild => {
          filteredThemesArray.push(grandchild.id)
        })
      }
    })

    //* filtering sets based on id inside array 
    {Object.values(setsMap).forEach(sets => {
      sets.map(set => {
        if(filteredThemesArray.includes(set.theme_id)) {
          setSetsBasedOnSelectedTheme(prev => [...prev, set])
        }
      })
    })}

  }
  
  return (
    <main className="catalog">
      {location.pathname === '/catalog' && (
        <ul className="catalog__categories">
          <li className="catalog__categories__link">
            <Link to={`${match.url}/themes`}>Sets</Link>
          </li>

          <li className="catalog__categories__link">
            <Link to={`${match.url}/minifigs`}> Minifigs</Link>
          </li>
        </ul>
      )} 

      <Route exact path={`${match.url}/themes`}>
        <Themes
          themesStructure={themesStructure} 
          onFilterSets={filterSetsBasedOnThemes}
        />
      </Route>
        
      <Route path={`${match.url}/themes/:name`}>
        <SetsList sets={setsBasedOnSelectedTheme} />
      </Route>

      <Route path={`/catalog/sets/:id`}>
        <FullSetView sets={sets}/>
      </Route>

    </main>
  );
}