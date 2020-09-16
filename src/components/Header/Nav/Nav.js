import React from 'react';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__list__element">
          <NavLink to="#">Link</NavLink>
        </li>
        <li>
          <NavLink to="#">Link</NavLink>
        </li>
        <li>
          <NavLink to="#">Link</NavLink>
        </li>
      </ul>
    </nav>
  );
};
