import React, { useState, useEffect } from 'react';

import { Nav } from './Nav/Nav';
import { LogIn } from './LogIn/LogIn';

import logo from '../../assets/images/logo.png';

export const Header = () => {
  const [isUserLogIn, setIsUserLogIn] = useState(false);

  return (
    <header className="header">
      <img src={logo} alt="project brick - logo" className="header__logo"/>
      <Nav />
      {isUserLogIn 
        ? <span>My Account</span> 
        : <LogIn />}
    </header>
  );
};
