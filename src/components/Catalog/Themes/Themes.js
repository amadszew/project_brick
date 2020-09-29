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
    if (search.length > 1 || search.length === 0) {
      const tempArr = Object.values(themesStructure);
      const result = tempArr.filter(theme => (
        theme.name.toLowerCase().includes(search.toLowerCase())
      ))
      setFilteredThemes(result);
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
        {Object.values(filteredThemes).map(({id, name}) => (
          <Link 
            className="themes__link"
            to={`${location.pathname}/${name}`} 
            key={id}
            name={name} 
            onClick={() => onFilterSets(id)}>
            <span className="themes__link__text">{name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

