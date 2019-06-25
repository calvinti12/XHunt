import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Home from './pages/HomePage';
import './assets/styles/main.scss';
import './assets/styles/variables.scss';
ReactDOM.render(<Home />, document.getElementById('root'));
serviceWorker.unregister();
