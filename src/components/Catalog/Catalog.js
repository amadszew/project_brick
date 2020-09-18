import React, { useState, useEffect } from 'react';

import { Themes } from './Themes/Themes';
import { Sets } from './Sets/Sets';

export const Catalog = () => {
  const [themes, setThemes] = useState([]);
  const [subthemes, setSubthemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(false);
  const [selectedSubtheme, setSelectedSubtheme] = useState(false);
  const [sets, setSets] = useState([]);

  const APIThemes = 'https://rebrickable.com/api/v3/lego/themes/?key=348ddf6de615ae3d89f79a2f46007745&page_size=1000';
  const APISets = `https://rebrickable.com/api/v3/lego/sets/?key=348ddf6de615ae3d89f79a2f46007745&page_size=100&theme_id=${selectedSubtheme}`;

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
  }, []);

  useEffect(() => {
    
    setSubthemes(
      themes.filter(theme => 
        theme.id === selectedTheme || 
        theme.id === selectedSubtheme || 
        theme.parent_id === selectedTheme || 
        theme.parent_id === selectedSubtheme
      )
    )
    
    //FETCH SETS LIST
    {selectedSubtheme && (
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
    )}
  }, [selectedTheme, selectedSubtheme]);

  return (
    <main className="catalog">
      <Themes 
        themes={themes} 
        selectedTheme={selectedTheme} 
        subthemes={subthemes} 
        setSelectedTheme={setSelectedTheme} 
        setSelectedSubtheme={setSelectedSubtheme}
      />
      <Sets sets={sets} />
    </main>
  );
}