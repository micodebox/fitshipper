import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { App } from './app/App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { AppProviders } from './providers/AppProviders';

axios.defaults.baseURL = 'https://fsl-candidate-api-vvfym.ondigitalocean.app/v1';

ReactDOM.render(
  <AppProviders>
    <App />
  </AppProviders>
  ,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
