import React from 'react';

import { Subthemes } from '../Subthemes/Subthemes';

export const Themes = props => {
  const {
    themes, 
    selectedTheme, 
    subthemes, 
    setSelectedTheme, 
    setSelectedSubtheme
  } = props;
  
  return (
    <>
      <div>
        {themes.filter(theme => theme.parent_id === null)
          .map(theme => (
            <button onClick={() => setSelectedTheme(theme.id)} key={theme.id}>{theme.name} - {theme.id}</button>
          ))
        }
      </div>
      <Subthemes selectedTheme={selectedTheme} subthemes={subthemes} setSelectedSubtheme={setSelectedSubtheme} />
    </>
  );
}
