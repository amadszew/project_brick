import React, { useState, useEffect } from 'react';
import { 
  Route, 
  useRouteMatch, 
  useLocation 
} from 'react-router-dom';

import { Set } from '../Set/Set';
import { SetDetailed } from '../SetDetailed/SetDetailed';
import { Search } from "../../../utils/Search/Search";

export const SetsList = props => {

  const { setsMap, themesStructure } = props;
  
  const [setsBasedOnSelectedTheme, setSetsBasedOnSelectedTheme] = useState([]); 
  const [search, setSearch] = useState("");
  const [filteredSets, setFilteredSets] = useState([]);
  
  const match = useRouteMatch();
  const location = useLocation();
  
  useEffect(() => {
    if (Object.values(themesStructure).length !== 0 && themesStructure.constructor === Object) {
      filterSetsBasedOnThemes(match.params.id)
      setFilteredSets(setsBasedOnSelectedTheme);
    }
  }, [themesStructure])

  useEffect(() => {
    if (search.length >= 2 || search.length === 0) {
      setFilteredSets(
        Object.values(setsBasedOnSelectedTheme).filter(set => (
          set.name.toLowerCase().includes(search.toLowerCase()) ||
          set.set_num.toLowerCase().includes(search.toLowerCase())
        ))
      );
    }
  }, [search])

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
    <>
      {match.url === location.pathname && (
        <div className="sets-list">
          <div className="sets-list__header">
            <h1 className="sets-list__header__title">List of sets</h1>
            <Search 
              search={search} 
              onSearch={setSearch} 
              width={220}
              placeholder={"Find specific set by name or #..."} />
          </div>
          <hr className="sets-list__line" />
          <div className="sets-list__wrapper">
            {filteredSets.length === 0 ? (
              <h1 className="sets-list__statement">
                We couldn't find any sets matching your search
              </h1>
            ) : (
              Object.values(filteredSets).map(set => (
                <Set 
                  key={set.set_num}
                  img={set.set_img_url}
                  name={set.name}
                  itemNo={set.set_num}
                  nofParts={set.num_parts}
                  year={set.year}
                  id={set.set_num}
                />
              ))
            )}
          </div>
        </div>
      )}

      <Route 
        path={`${match.url}/sets/:id`} 
        render={() => <SetDetailed sets={setsBasedOnSelectedTheme} />} 
        />
    </>
  );
}

