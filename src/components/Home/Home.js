import React from 'react';
import { Link } from 'react-router-dom'

export const Home = () => {
  return (
    <p className="home__statement">
      Welcome to ProjectBrick, a place created for every fans of LEGO. For now it's just only a catalog of LEGO sets and minifigures but it's constantly developing and in some future will be outright portal when you will be able to share your passion with other members of LEGO community. So please feel free to explore rich collection of LEGO sets located in 
      <Link to="/catalog" className="home__link"> Catalog </Link>
       page and be sure to come back in some time for more content :)
    </p>
  );
}
