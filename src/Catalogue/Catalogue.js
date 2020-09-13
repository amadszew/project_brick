import React, { useState, useEffect } from 'react';

export const Catalogue = () => {
  const [sets, setSets] = useState([]);
  const [themes, setThemes] = useState([]);
  const [selectedTheme, setSelectedTheme] = useState(false);
  const [setsTheme, setSetsTheme] = useState(false);
  const [childrenThemes, setChildrenThemes] = useState([]);

  const APIThemes = 'https://rebrickable.com/api/v3/lego/themes/?key=348ddf6de615ae3d89f79a2f46007745&page=2';
  const API = `https://rebrickable.com/api/v3/lego/sets/?key=348ddf6de615ae3d89f79a2f46007745&theme_id=${setsTheme}`;

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
    setChildrenThemes(
      themes.filter(theme => theme.id === selectedTheme || theme.parent_id === selectedTheme)
    )

    //FETCH SETS LIST
    {setsTheme && (
      fetch(API)
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
  }, [selectedTheme, setsTheme]);

  return (
    <div>
      <div>
        {themes.filter(theme => theme.parent_id === null)
          .map(theme => (
            <button onClick={() => setSelectedTheme(theme.id)} key={theme.id}>{theme.name} - {theme.id}</button>
          ))
        }
      </div>
      {selectedTheme && (
        <div>
          {childrenThemes.map(theme => (
            <button onClick={() => setSetsTheme(theme.id)} key={theme.id}>{theme.name} - {theme.id}</button>
          ))}
        </div>
      )}
      <ul>
        {sets.map(item => (
          <li style={{backgroundColor: '#222', width: "50%"}} key={item.set_num}>
            <h2>{item.name}</h2>
            <h4>{item.year}</h4>
            <img style={{width: 300, height: 150}} src={item.set_img_url} />
          </li>
        ))}
      </ul>
    </div>
  );
}