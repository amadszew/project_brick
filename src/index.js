import React from 'react';
import ReactDOM from 'react-dom';

import './styles/main.scss';

import { Catalog } from './Catalog/Catalog';

const App = () => {
  return <Catalog />;
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
