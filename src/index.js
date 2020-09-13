import React from 'react';
import ReactDOM from 'react-dom';

import './styles/main.scss';

import { Catalogue } from './Catalogue/Catalogue.js';

const App = () => {
  return <Catalogue />;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
