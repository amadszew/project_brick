import React from 'react';

export const Subthemes = props => {
  const {
    selectedTheme, 
    subthemes, 
    setSelectedSubtheme
  } = props;

  return (
    <>
      {selectedTheme && (
        <div style={{marginTop: '15px'}}>
          {subthemes.map(subtheme => (
            <button style={{backgroundColor: 'blue', color: "#fff"}} onClick={() => setSelectedSubtheme(subtheme.id)} key={subtheme.id}>{subtheme.name} - {subtheme.id}</button>
          ))}
        </div>
      )}
    </>
  );
}
