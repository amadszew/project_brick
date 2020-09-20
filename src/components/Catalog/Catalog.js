import React, { useState, useEffect } from 'react';

import 'core-js/features/array/is-array';

import { Themes } from './Themes/Themes';
import { Sets } from './Sets/Sets';

const APIThemes = 'https://rebrickable.com/api/v3/lego/themes/?key=348ddf6de615ae3d89f79a2f46007745&page_size=1000';
const APISets = 'https://rebrickable.com/api/v3/lego/sets/?key=348ddf6de615ae3d89f79a2f46007745&page_size=1000&page=1';

export const Catalog = () => {
  const [sets, setSets] = useState([]);
  const [themes, setThemes] = useState([]);

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
            children: {}
          }
          parent = parents[theme.id];
        }

        //set child themes
        if (theme.parent_id === parent.id) {
          parent.children[theme.id] = {
            ...theme,
            children: {},
          }
        
          child = parent.children[theme.id];
        }

        //set granchild themes
        if(child && theme.parent_id === child.id) {
          child.children[theme.id] = {
            ...theme,
            children: {},
          }

          grandChild = child.children[theme.id]
        }
      });
  }


  return (
    <main className="catalog">

    </main>
  );
}