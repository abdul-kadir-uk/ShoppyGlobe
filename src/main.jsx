import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'
import { Provider } from 'react-redux';
import { store } from './redux/store.js';

ReactDOM.createRoot(document.getElementById('root')).render(
  // wrap the app component inside provider components so that entire app hass access to redux store 
  <Provider store={store}>
    <App />
  </Provider>
);
