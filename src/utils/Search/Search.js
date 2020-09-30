import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export const Search = props => {
  const {
    search, 
    onSearch, 
    width,
    placeholder
  } = props;

  const handleChange = ({target: {value}}) => {
    onSearch(value)
  }

  return (
    <div className="search">
      <input
        style={{width: width}}
        type="search"
        value={search}
        onChange={handleChange} 
        placeholder={placeholder} 
        className="search__input" />
      <button className="search__button">
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
}
