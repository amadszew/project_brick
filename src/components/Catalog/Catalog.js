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
  const [setsBasedOnSelectedTheme, setSetsBasedOnSelectedTheme] = useState([]);

  //* Fetching list of sets from every pages
  const fetchSets = url => {
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
    //* Fetching list of themes
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

    //* Fetching list of sets
    fetchSets(APISets);
  }, []);

  useEffect(() => {
    createStructure()
  }, [sets])

  const createStructure = () => {
    //* dividing sets with same parent id into separate arrays 
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

    //* creating themes structure ( parent -> child -> grandchild )
    let parents = {};
    let parent = null;
    let child = null;
    let grandchild = null;

    themes.forEach(theme => {

      //* set parents themes
      if (theme.parent_id === null) {
        parents[theme.id] = {
          ...theme,
          childrens: {}
        }

        parent = parents[theme.id];
      }

      //* set childs themes
      if (theme.parent_id === parent.id) {
        parent.childrens[theme.id] = {
          ...theme,
          childrens: {},
        }
      
        child = parent.childrens[theme.id];
      }

      //* set grandchilds themes
      if(child && theme.parent_id === child.id) {
        child.childrens[theme.id] = {
          ...theme,
          childrens: {},
        }

        grandchild = child.childrens[theme.id]
      }
    });

    setThemesStructure(parents);
  }

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
      <Themes 
        themesStructure={themesStructure}
        onFilterSets={filterSetsBasedOnThemes}
      />

      <Sets sets={setsBasedOnSelectedTheme} />
    </main>
  );
}