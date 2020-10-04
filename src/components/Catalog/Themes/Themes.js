import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

import { Search } from "../../../utils/Search/Search";

export const Themes = props => {

  const { themesStructure } = props;

  const [search, setSearch] = useState("");
  const [filteredThemes, setFilteredThemes] = useState(false);

  const location = useLocation();

  useEffect(() => {
    if (Object.values(themesStructure).length !== 0 && themesStructure.constructor === Object) {
      setFilteredThemes(themesStructure);
    }
  }, [themesStructure])

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
            We couldn't find any themes matching your search
          </h1>
        ) : (
          Object.values(filteredThemes).map(({id, name}) => (
            <Link 
              className="themes__link"
              to={`${location.pathname}/${name}/${id}`} 
              key={id}>
              <span className="themes__link__text">{name}</span>
            </Link>
          ))
        )}
      </div>
    </div>
  )
}

