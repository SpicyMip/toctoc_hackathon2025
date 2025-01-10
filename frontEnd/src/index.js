import React from 'react';
import ReactDOM from 'react-dom/client'; // Cambiar importación
import App from './App.js';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root')); // Usar createRoot
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
