import React, { useState, useEffect } from 'react';

import { Nav } from './Nav/Nav';
import { UserSign } from './UserSign/UserSign';

import logo from '../../assets/images/logo.png';

export const Header = () => {
  return (
    <header className="header">
      <img src={logo} alt="project brick - logo" className="header__logo"/>
      <Nav />
      <UserSign />
    </header>
  );
};
