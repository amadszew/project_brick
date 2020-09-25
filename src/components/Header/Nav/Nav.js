import React from 'react';
import { NavLink } from 'react-router-dom';

export const Nav = () => {
  return (
    <nav className="nav">
      <ul className="nav__list">
        <li className="nav__list__element">
          <NavLink className="nav__list__element-link" to="/">
            Home
          </NavLink>
        </li>
        <li className="nav__list__element">
          <NavLink className="nav__list__element-link" to="/catalog">
            Catalog
          </NavLink>
        </li>
        <li className="nav__list__element">
          <NavLink className="nav__list__element-link" to="#">
            Link
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};
