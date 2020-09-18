import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import './styles/main.scss';

import { Catalog } from './components/Catalog/Catalog';
import { Header } from './components/Header/Header';

const App = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Catalog />
      </BrowserRouter>
    </div>
  );
}

ReactDOM.render(
  <App />,
  document.getElementById('root')
);
