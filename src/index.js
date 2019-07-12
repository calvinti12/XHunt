import React from 'react';
import ReactDOM from 'react-dom';
import './assets/styles/main.scss';
import * as serviceWorker from './serviceWorker';
import Routes from './routes/';
import { BrowserRouter } from 'react-router-dom';
ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>, document.getElementById('root'), () => {
    document.querySelector('.indexLoader').classList.add('dNone');
  });
serviceWorker.unregister();
