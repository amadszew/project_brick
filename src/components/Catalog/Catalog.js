import React, { useState, useEffect } from 'react';

import 'core-js/features/array/is-array';

import { Themes } from './Themes/Themes';
import { Sets } from './Sets/Sets';

const APIThemes = 'https://rebrickable.com/api/v3/lego/themes/?key=348ddf6de615ae3d89f79a2f46007745&page_size=1000';
const APISets = 'https://rebrickable.com/api/v3/lego/sets/?key=348ddf6de615ae3d89f79a2f46007745&page_size=1000&page=1';

export const Catalog = () => {
  const [themes, setThemes] = useState([]);
  const [themesStructure, setThemesStructure] = useState([]);
  const [sets, setSets] = useState([]);
  const [setsMap, setSetsMap] = useState([]);
  const [setsWithSelectedThemes, setSetsWithSelectedThemes] = useState([]);

  const fetchSets = (url) => {
    fetch(url)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Błąd sieci!");
        }
      })
      .then(data => {
        setSets(prev => [
          ...prev,
          ...data.results
        ]);
        if (data.next) {
          fetchSets(data.next)
        }
      })
      .catch(err => {
        console.log(err.message);
      })
  };

  useEffect(() => {
    //FETCH THEMES LIST
    fetch(APIThemes)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Błąd sieci!");
        }
      })
      .then(data => {
        setThemes(data.results);
      })
      .catch(err => {
        console.log(err.message);
      })

    //FETCH SETS LIST
    fetchSets(APISets);
  }, []);

  useEffect(() => {
    createStructure()
  }, [sets])

  const createStructure = () => {
    const setsMap = {};
      sets.forEach(set => {
        if (setsMap[set.theme_id]) {
          setsMap[set.theme_id].push(set);
        } else {
          setsMap[set.theme_id] = [];
          setsMap[set.theme_id].push(set);
        } 
      });

      setSetsMap(setsMap)

      // SETTING THEMES
      let parents = {};
      let parent = null;
      let child = null;
      let grandChild = null;

      themes.forEach(theme => {

        //set parent themes
        if (theme.parent_id === null) {
          parents[theme.id] = {
            ...theme,
            childrens: {}
          }
          parent = parents[theme.id];
        }

        //set child themes
        if (theme.parent_id === parent.id) {
          parent.childrens[theme.id] = {
            ...theme,
            childrens: {},
          }
        
          child = parent.childrens[theme.id];
        }

        //set granchild themes
        if(child && theme.parent_id === child.id) {
          child.childrens[theme.id] = {
            ...theme,
            childrens: {},
          }

          grandChild = child.childrens[theme.id]
        }
      });
      setThemesStructure(parents);
  }

  const displaySetsBasedOnTheme = id => {
    let filteredThemesArray = [];
    setSetsWithSelectedThemes([]);

    const childrens = themesStructure[id].childrens;

    const isNotEmptyObject = Object.values(childrens).length !== 0 && childrens.constructor === Object;

    filteredThemesArray.push(id);

    if (isNotEmptyObject) {
      Object.values(childrens).forEach(child => {
        filteredThemesArray.push(child.id)
      });
    }
    
    Object.values(childrens).forEach(child => {
      if (isNotEmptyObject) {
        Object.values(child.childrens).forEach(grandchild => {
          filteredThemesArray.push(grandchild.id)
        })
      }
    })

    // setSelectedThemesId(filteredThemesArray);

    {Object.values(setsMap).forEach(sets => {
      sets.map(set => {
        if(filteredThemesArray.includes(set.theme_id)) {
          setSetsWithSelectedThemes(prev => [...prev, set])
        }
      })
    })}

  }

  return (
    <main className="catalog">
      {Object.values(themesStructure).map(({id, name}) => (
        <button key={id} onClick={() => displaySetsBasedOnTheme(id)}>
          {name}
        </button>
      ))}
      <div style={{display: 'flex', flexWrap: 'wrap'}}>
        {setsWithSelectedThemes && (
          setsWithSelectedThemes.map(set => (
            <div key={set.set_num}>
              <p>{set.name}</p>
              <img src={set.set_img_url} alt={set.name} style={{width: 100, height: 100}} />
            </div>
          ))
        )}
      </div>
    </main>
  );
}