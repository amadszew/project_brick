import React, { useState, useEffect } from 'react';

import 'core-js/features/array/is-array';

import { Themes } from './Themes/Themes';
import { Sets } from './Sets/Sets';

export const Catalog = () => {
  const [themes, setThemes] = useState([]);
  const [subthemes, setSubthemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(false);
  const [selectedSubtheme, setSelectedSubtheme] = useState(false);
  const [sets, setSets] = useState([]);

  const APIThemes = 'https://rebrickable.com/api/v3/lego/themes/?key=348ddf6de615ae3d89f79a2f46007745&page_size=1000';
  const APISets = 'https://rebrickable.com/api/v3/lego/sets/?key=348ddf6de615ae3d89f79a2f46007745';

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
    fetch(APISets)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("Błąd sieci!");
        }
      })
      .then(data => {
        setSets(data.results);
      })
      .catch(err => {
        console.log(err.message);
      })
  }, []);

    useEffect(() => {     
      const setsMap = {}
      sets.forEach(set => {
        if (setsMap[set.theme_id]) {
          if(Array.isArray(setsMap[set.theme_id])){
            setsMap[set.theme_id].push(set);
          } else {
            setsMap[set.theme_id] = [];
            setsMap[set.theme_id].push(set);
          }
        } else {
          setsMap[set.theme_id] = [];
          setsMap[set.theme_id].push(set);
        } 
      });
      console.log('setsMap', setsMap);

      // SETING THEME
      let parents = {};
      let parent = null;
      let child = null;
      let grandChild = null;
      themes.forEach(theme => {
        //set parent theme
        if (theme.parent_id === null) {
          parents[theme.id] = {
            ...theme,
            children: {}
          }
          parent = parents[theme.id];
        }

        //set child
        if (theme.parent_id === parent.id) {
          parent.children[theme.id] = {
            ...theme,
            children: {},
          }
        
          child = parent.children[theme.id];
        }

        //set granchild
        if(child && theme.parent_id === child.id) {
          child.children[theme.id] = {
            ...theme,
            children: {},
          }

          grandChild = child.children[theme.id]
        }
      });
      console.log(parents, 'object parent')
    }, [themes, sets]);

  return (
    <main className="catalog">
      {/* <Themes 
        themes={themes} 
        selectedTheme={selectedTheme} 
        subthemes={subthemes} 
        setSelectedTheme={setSelectedTheme} 
        setSelectedSubtheme={setSelectedSubtheme}
      /> */}
      {/* <Sets sets={sets} /> */}
    </main>
  );
}