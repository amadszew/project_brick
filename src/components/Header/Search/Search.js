import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Search = () => {
  const [search, setSearch] = useState("");

  const handleChange = ({target: {value}}) => {
    setSearch(value)
  }

  return (
    <div className="search">
      <input 
        type="search"
        value={search}
        onChange={handleChange} 
        placeholder="Search..." 
        className="search__input" />
      <button className="search__button">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}
