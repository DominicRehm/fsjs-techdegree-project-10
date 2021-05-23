import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/reset.css';
import './styles/global.css';
import reportWebVitals from './reportWebVitals';
import { AppProvider } from './Context';

ReactDOM.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
