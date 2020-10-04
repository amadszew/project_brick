import React from 'react';
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
import { Minifigs } from './Minifigs/Minifigs';
import { ReturnBtn } from '../../utils/ReturnBtn/ReturnBtn';

import setImg from '../../assets/images/set_img.jpg';
import minifigsImg from '../../assets/images/minifigs_img.jpg';

export const Catalog = props => {
  
  const {
    setsMap,
    themesStructure
  } = props;

  const location = useLocation();
  const match = useRouteMatch();

  return (
    <section className="catalog">
      {location.pathname !== '/catalog' && (
        <ReturnBtn />
      )}
      {location.pathname === '/catalog' && (
        <ul className="catalog__categories">
          <li className="catalog__categories__element">
            <Link to={`${match.url}/themes`} className="catalog__link">
              <div className="catalog__link__name">
                Sets
                <FontAwesomeIcon icon={faAngleRight} size="sm" className="catalog__link__icon"/>
              </div>
              <div className="catalog__link__img">
                <img src={setImg} className="catalog__link__img--img" alt="lego set"/>
              </div>
            </Link>
          </li>

          <li className="catalog__categories__element">
            <Link to={`${match.url}/minifigs`} className="catalog__link">
              <div className="catalog__link__name">
                Minifigs
                <FontAwesomeIcon icon={faAngleRight} size="sm" className="catalog__link__icon"/>
              </div>
              <div className="catalog__link__img">
                <img src={minifigsImg} className="catalog__link__img--img" alt="lego minifigs"/>
              </div>
            </Link>
          </li>
        </ul>
      )} 

      <Route 
        exact path={`${match.url}/themes`}
        render={() => (
          <Themes
            themesStructure={themesStructure} /> 
        )} 
      />

      <Route 
        path={`${match.url}/themes/:name/:id`}
        render={() => (
          <SetsList 
            themesStructure={themesStructure} 
            setsMap={setsMap} /> 
        )}
      />

      <Route path={`${match.url}/minifigs`}
        render={() => <Minifigs />}
      /> 
        
    </section>
  );
}