import React, { useState } from 'react';
import { 
  Link, 
  Route,
  useLocation,
  useRouteMatch
} from 'react-router-dom';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';

import { Themes } from './Themes/Themes';
import { SetsList } from './SetsList/SetsList';

import setImg from '../../assets/images/set_img.jpg';
import minifigsImg from '../../assets/images/minifigs_img.jpg';

export const Catalog = props => {
  const [setsBasedOnSelectedTheme, setSetsBasedOnSelectedTheme] = useState([]);
  const [themeName, setThemeName] = useState("");

  const location = useLocation();
  const match = useRouteMatch();
  const {
    setsMap,
    themesStructure
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
    <section className="catalog">
      {location.pathname === '/catalog' && (
        <ul className="catalog__categories">
          <li className="catalog__categories__element">
            <Link to={`${match.url}/themes`} className="catalog__link">
              <span className="catalog__link__name">
                Sets
                <FontAwesomeIcon icon={faAngleRight} size="sm" className="catalog__link__icon"/>
              </span>
              <img src={setImg} className="catalog__link__img" alt="lego set"/>
            </Link>
          </li>

          <li className="catalog__categories__element">
            <Link to={`${match.url}/minifigs`} className="catalog__link">
              <span className="catalog__link__name">
                Minifigs
                <FontAwesomeIcon icon={faAngleRight} size="sm" className="catalog__link__icon"/>
              </span>
              <img src={minifigsImg} className="catalog__link__img" alt="lego minifigs"/>
            </Link>
          </li>
        </ul>
      )} 

      <Route 
        exact path={`${match.url}/themes`}
        render={() => (
          <Themes
          themesStructure={themesStructure} 
          onFilterSets={filterSetsBasedOnThemes} /> 
        )} 
      />

      <Route 
        path={`${match.url}/themes/:name`}
        render={() => <SetsList sets={setsBasedOnSelectedTheme} /> } 
      /> 
        
    </section>
  );
}