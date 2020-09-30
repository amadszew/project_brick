import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Search } from "../../../utils/Search/Search";

export const Themes = props => {
  const {
    themesStructure, 
    onFilterSets, 
  } = props;

  const [search, setSearch] = useState("");
  const [filteredThemes, setFilteredThemes] = useState(themesStructure);

  const location = useLocation();

  useEffect(() => {
    if (search.length >= 2 || search.length === 0) {
      setFilteredThemes(
        Object.values(themesStructure).filter(theme => (
          theme.name.toLowerCase().includes(search.toLowerCase())
        ))
      );
    }
  }, [search])

  return (
    <div className="themes">
      <div className="themes__header">
        <h1 className="themes__header__title">Themes</h1>
        <Search 
          search={search} 
          onSearch={setSearch} 
          width={220}
          placeholder={"Find specific theme..."} />
      </div>
      <hr className="themes__line" />
      <div className="themes__wrapper">
        {filteredThemes.length === 0 ? (
          <h1 className="themes__statement">
            Sorry but it seems that theme that you are trying to find doesn't exist.<br/> Maybe try to type a different phrase or at least two first characters. <br/>And you always can manually trawl through this list below :)
          </h1>
        ) : (
          Object.values(filteredThemes).map(({id, name}) => (
            <Link 
              className="themes__link"
              to={`${location.pathname}/${name}`} 
              key={id}
              onClick={() => onFilterSets(id)}>
              <span className="themes__link__text">{name}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

